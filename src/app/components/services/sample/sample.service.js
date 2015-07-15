'use strict';

//insert your service name here
class SampleService {
  constructor (GenericVroService) {
    'ngInject';
    //put your namespace and item type here
    this.model = new window['some namespace'].sampleName();
    this.GenericVroService = GenericVroService;
  }

  retrieve(options) {
    return this.GenericVroService(this.model).retrieve(options);
  }

  create(record) {
    return this.GenericVroService(this.model).create(record);
  }

  upsert(record) {
    return this.GenericVroService(this.model).upsert(record);
  }

  update(record) {
    return this.GenericVroService(this.model).update(record);
  }

  del(recordId) {
    return this.GenericVroService(this.model).del(recordId);
  }

  retrieveById(recordId) {
    var options = {
      where: {
        Id: { eq: recordId }
      },
      limit: 1
    };
    return this.GenericVroService(this.model).retrieve(options);
  }

  retrieveByParentId(parentFieldName, recordId, numberOfRecords) {
    var options = {
      where: {},
      limit: numberOfRecords
    };
    options.where[parentFieldName] = { eq: recordId };
    return this.GenericVroService(this.model).retrieve(options);
  }

  retrieveRecentItems(numberOfRecentItems) {
    var options = {
      orderby: [{ LastModifiedDate: 'DESC' }],
      limit: numberOfRecentItems
    };
    return this.GenericVroService(this.model).retrieve(options);
  }
}

export default SampleService;
