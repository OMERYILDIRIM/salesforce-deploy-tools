'use strict';
angular.module('ngRemote', [])

/**
* @description generic service which dynamically accesses all four functions for the sObjectModel which is given to it
* @param sObjectModel RemoteObjectModel
*/
.factory('GenericService', ['$q', function($q) {
  return function(sObjectModel) {
    var service = {
      retrieve : retrieve,
      create : create,
      upsert : upsert,
      update : update,
      del : del
    };

    return service;

    function retrieve(options) {
      var deferred = $q.defer();
      sObjectModel.retrieve(options,
                            function(error,
                                     records,
                                     event) {
        if(error) {
          deferred.reject(error);
        } else {
          deferred.resolve(parseObjectToArray(event.result.records));
        }
      });
      return deferred.promise;
    }

    function create(record) {
      var deferred = $q.defer();
      sObjectModel.create(record,
                          function(error,
                                   records,
                                   event) {
        if(error) {
          deferred.reject(error);
        } else {
          deferred.resolve(parseObjectToArray(event.result.records));
        }
      });
      return deferred.promise;
    }

    function upsert(record) {
      var deferred = $q.defer();
      sObjectModel._props = record;
      sObjectModel.upsert(function(error,
                                   records,
                                   event) {
        if(error) {
          deferred.reject(error);
        } else {
          deferred.resolve(parseObjectToArray(event.result.records));
        }
      });
      return deferred.promise;
    }

    function update(record) {
      var deferred = $q.defer();
      sObjectModel._props = record;
      sObjectModel.update(function(error,
                                   records,
                                   event) {
        if(error) {
          deferred.reject(error);
        } else {
          deferred.resolve(parseObjectToArray(event.result.records));
        }
      });
      return deferred.promise;
    }

    function del(recordId) {
      var deferred = $q.defer();
      sObjectModel.del(recordId, function(error,
                                          records,
                                          event) {
        if(error) {
          deferred.reject(error);
        } else {
          deferred.resolve(parseObjectToArray(event.result.records));
        }
      });
      return deferred.promise;
    }

    function parseObjectToArray(objectOfObjects) {
      var records = Object.keys(objectOfObjects).map(function (key) {
        return objectOfObjects[key];
      });

      return records;
    }
  }
}])

/**
* @description loop over all remoteObjects to create an AngularJS service for each of them
*/
.factory('Service',
         ['GenericService',
         function(GenericService) {
  var model = new window[ns].objectName();
  var service = {
    retrieve : function(options) {
      return GenericService(model).retrieve(options);
    },
    retrieveById : retrieveById,
    retrieveByParentId : retrieveByParentId,
    retrieveRecentItems : retrieveRecentItems,
    create: function(record) {
      return GenericService(model).create(record);
    },
    upsert: function(record) {
      return GenericService(model).upsert(record);
    },
    update: function(record) {
      return GenericService(model).update(record);
    },
    del: function(recordId) {
      return GenericService(model).del(recordId);
    }
  }
  return service;

  function retrieveById(recordId) {
    var options = {
      where: {
        Id: { eq: recordId }
      },
      limit: 1
    };
    return GenericService(model).retrieve(options);
  }

  function retrieveByParentId(parentFieldName, recordId, numberOfRecords) {
    var options = {
      where: {},
      limit: numberOfRecords
    };
    options.where[parentFieldName] = { eq: recordId };
    return GenericService(model).retrieve(options);
  }

  function retrieveRecentItems(numberOfRecentItems) {
    var options = {
      orderby: [{ LastModifiedDate: 'DESC' }],
      limit: numberOfRecentItems
    };
    return GenericService(model).retrieve(options);
  }
}])

/**
* @description makes Visualforce variables available inside Angular
*/
.constant('Visualforce', {
  User : {
    Id : '{!$User.Id}',
    FirstName : '{!$User.FirstName}',
    LastName : '{!$User.LastName}',
    Alias : '{!$User.Alias}',
    Title : '{!$User.Title}'
  },
  CurrentPage : {
    Name : '{!$CurrentPage.Name}',
    Url : '{!$CurrentPage.Url}'
  },
  Profile : {
    Id : '{!$Profile.Id}',
    Name : '{!$Profile.Name}'
  }
});
