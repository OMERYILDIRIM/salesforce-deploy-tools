'use strict';

class GenericVroService {
  //sObjectModel is a remoteObjectModel
  constructor (sObjectModel) {
    'ngInject';
    this.sObjectModel = sObjectModel;
  }

  parseObjectToArray(objectOfObjects) {
    return Object.keys(objectOfObjects)
                 .map(key => objectOfObjects[key]);
  }

  retrieve(options) {
    var self = this;
    return new Promise((resolve, reject) => {
      self.sObjectModel.retrieve(
        options,
        (err, __, event) => err ? reject(err) : resolve(self.parseObjectToArray(event.result.records)));
    });
  }

  create(record) {
    var self = this;
    return new Promise((resolve, reject) => {
      self.sObjectModel.create(
        record,
        (err, __, event) => err ? reject(err) : resolve(self.parseObjectToArray(event.result.records))
      );
    });
  }

  upsert(record) {
    var self = this;
    self.sObjectModel._props = record;

    return new Promise((resolve, reject) => {
      self.sObjectModel.upsert(
        (err, __, event) => err ? reject(err) : resolve(self.parseObjectToArray(event.result.records))
      );
    });
  }

  update(record) {
    var self = this;
    self.sObjectModel._props = record;

    return new Promise((resolve, reject) => {
      self.sObjectModel.update(
        (err, __, event) => err ? reject(err) : resolve(self.parseObjectToArray(event.result.records))
      );
    });
  }

  del(recordId) {
    var self = this;
    return new Promise((resolve, reject) => {
      self.sObjectModel.update(
        recordId,
        (err, __, event) => err ? reject(err) : resolve(self.parseObjectToArray(event.result.records))
      );
    });
  }
}

export default GenericVroService;
