/* globals SObjectModel */
class ContactListDirective {
  constructor (/*ContactListService*/) {
    'ngInject';

    let directive = {
      restrict: 'E',
      templateUrl: 'app/components/directives/contactList/contactList.html',
      scope: {
      },
      controller: ContactListController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }
}

class ContactListController {
  constructor (/*$http*/) {
    'ngInject';

    this.searchText = '';
    this.gridOptions = {
      expandableRowTemplate: 'app/components/directives/contactList/contactListExpandableRow.html',
      expandableRowHeight: 200, //TODO: make this dynamic based on items
      expandableRowScope: { //will be available in subGrid scope
        updateContact: this.updateContact,
        getContacts: this.getContacts,
        removeContact: this.removeContact,
        addContact: this.addContact,
      },

      onRegisterApi: function (gridApi) {
        this.gridApi = gridApi;
      },

      columnDefs: [
        { name: 'Name', displayName: 'Name' },
        { name: 'Description', displayName: 'Description' },
        { name: 'Phone', displayName: 'Phone' },
        { name: 'Website', displayName: 'Website' }
      ]

    };//END gridOptions

    //get initial contact list
    this.getContacts();
  }

  //actually handled by add contact at the moment
  updateContact(data) {
    this.addContact(data);
  }

  getContacts() {
    var self = this;

    var wh = new SObjectModel.acc();
    wh.retrieve({
      where:{
        Name: { like: self.searchText +'%'} },
        limit: 100
      },
      function(err, respData){
        if (err) {
          console.error(err.message);
        } else {
          var realData = respData.map(item => item._props);
          console.log(realData);
          self.gridOptions.data = realData || [];
          document.body.dispatchEvent('scroll');
        }
      }
    );
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

/*
  invokeAction() {
    Visualforce.remoting.Manager.invokeAction(
      'AccountService.fetchAccountfieldsets',
      function(result, event){
        if (event.status) {
          // Get DOM IDs for HTML and Visualforce elements like this
         console.log(result);
        } else if (event.type === 'exception') {

        } else {
        }
      },
      {escape: true}
    );
  }
*/
}

export default ContactListDirective;
