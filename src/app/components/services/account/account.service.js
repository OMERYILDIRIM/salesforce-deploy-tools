/* globals SObjectModel */
'use strict';

import {isNullUndef, isUndef} from '../../../utils/utils';
import {checkLimit} from '../../../utils/vro-helpers';

//TODO: change vro js name to account for better interopt
class ContactService {
  constructor ($http) {
    'ngInject';

    this.fields = [];
    this.accounts = [];
    this.$http = $http;

    //private listener data
    this._listeners = {};
    this._listenerId = 1;
  }

  getFields() {
  }

  getContributors(limit) {
    if (!limit) {
      limit = 30;
    }

    return this.$http.get(this.apiHost + '/contributors?per_page=' + limit)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        this.$log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
      });
  }
/******************************************==******************************************
 *                                   AJAX HANDLERS
 **************************************************************************************/


  retrieve(searchText, limit) {
    var self = this;
    return SObjectModel.makePromiseable('acc')
    .retrieve({
      where:{
        Name: { like: searchText +'%'}
      },
      limit: checkLimit(limit)
    })
    .then(data => {
      //extract data from wrapper
      var realData = data.map(item => item._props);
      console.log(realData);
      //trigger listeners
      self.triggerListeners('accounts');
      //allows thennable to be chained with new data
      return realData;
    })
    .catch(err => console.error(err.message));
  }

  update(data) {
    var self = this;
    this.addContact(data);
    SObjectModel.makePromiseable('acc')
  }


  removeContact(id) {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      var delAcc = new SObjectModel.acc({ Id: id });
      delAcc.del(this.getContacts());
    }
  }

  addContact(opts) {
    console.log(opts);
    var updateAcc = new SObjectModel.acc(opts);
    /*
    var updateAcc = new SObjectModel.acc({
      Name: opts.Name,
      Description: opts.Description,
      Fax: opts.Fax,
      Phone: opts.Phone,
      Website: opts.Website
    });
    */

    //opts.Id has value then update the Contact record
    if(opts.Id){
      updateAcc.set('Id', opts.Id);
      updateAcc.update(this.getContacts());
    //If opts.Id is null then Create new Contact
    } else {
      updateAcc.create(this.getContacts());
    }
  }

/******************************************==******************************************
 *                                   LISTENER EVENTS
 **************************************************************************************/

  /**
   * @method registerListener
   * adds event to listener queue
   * @param {String} listenerType - type of listener to attach
   * @param {Function} cb - function to execute. receives opts param
   * @return {Number} - id of callback. Used to unregister listener
   */
  registerListener(listenerType, cb) {
    var self = this;

    if (!self._listeners[listenerType]) {
      throw "Account service does not have a listener of type: " + listenerType;
    }
    self._listenerId += 1; //update before attach
    self._listeners[listenerType].push({
      cb, id: self._listenerId
    });
    return self._listenerId;
  }

  /**
   * @method unregisterListener
   * removes event from listener queue
   * @param {Number} id - id of listener to remove
   * @return {Boolean} - true if success
   */
  unregisterListener(id) {
    var self = this;
    var key, temp, isRemoved = false; //isRemoved tracks if removal happened

    //iterate listener types
    //note: we don't short-circuit in case an id somehow was copied. Defensive FTW!
    //      we don't expect to have a ton of listeners, so the overhead is probably small anyway
    for (key in self._listeners) {
      if (self._listeners.hasOwnProperty(key)) {
        //only keep item in listener list that do NOT have the id in question
        temp = self._listeners[key].filter(item => item.id !== id);
        //toggle isRemoved if something was removed
        if (temp.length !== self._listeners[key].length) {
          isRemoved = true;
        }
        //assign new list of listeners
        self._listeners[key] = temp;
      }
    }
    return isRemoved;
  }

  /**
   * @method triggerListeners
   * trigger listeners of given type
   * @param {String} listenerType - type of listener to attach
   * @param {Object} opts - optional list of options to pass
   * @return {Boolean} - true if success
   */
  triggerListeners(listenerType, opts) {
    if (!this._listeners[listenerType]) {
      throw "Account service does not have a listener of type: " + listenerType;
    }
    this._listeners[listenerType].forEach(item => item.cb(opts));
    return true;
  }
}

export default ContactService;
