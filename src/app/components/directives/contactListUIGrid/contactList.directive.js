class ContactListDirective {
  constructor (/*ContactListService*/) {
    'ngInject';

    let directive = {
      restrict: 'E',
      templateUrl: 'app/components/directives/contactList/contactList.html',
      scope: {
          creationDate: '='
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

  this.gridOptions = {
    expandableRowTemplate: 'app/components/directives/contactList/contactListExpandableRow.html',
    expandableRowHeight: 400, //TODO: make this dynamic based on items
    expandableRowScope: { //will be available in subGrid scope
      data: {},
      updateContact: this.updateContact
    },
    data: [],
    columnDefs: [
      { name: 'Name', displayName: 'Name' },
      { name: 'Description', displayName: 'Description' },
      { name: 'Phone', displayName: 'Phone' },
      { name: 'Fax', displayName: 'Fax' },
      { name: 'Website', displayName: 'Website' }
    ]
  };


  //this.getContacts();

    this.gridOptions.onRegisterApi = function(gridApi){
      this.gridApi = gridApi;
    };
  }

  expandAllRows() {
    this.gridApi.expandable.expandAllRows();
  }
  collapseAllRows() {
    this.gridApi.expandable.collapseAllRows();
  }
  updateContact(data) {
    this.$http(data);
  }
  getContacts() {
    this.$http.get('/data/500_complex.json')
      .success(function(data) {
        this.gridOptions.data = data;
      });
  }
}

export default ContactListDirective;
