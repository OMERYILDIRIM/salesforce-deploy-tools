/* globals SObjectModel */
class ContactListDirective {
  constructor (/*ContactListService*/) {
    'ngInject';

    let directive = {
      restrict: 'E',
      templateUrl: 'app/components/directives/contactList/contactList.html',
      scope: {
        //toAdd
        contact: '@'
      },
      controller: ContactListController,
      controllerAs: 'vm',
      bindToController: true //allows scope to be available as 'this' in controller
    };

    return directive;
  }
}

class ContactListController {
  constructor (ContactService) {
    'ngInject';
    this.ContactService = ContactService;
  }

  /**
   * @method updateContact
   * directs service to update individual ContactService
   * ContactService will be responsible for updating
   * the row data when the call returns
   * @return {undefined}
   */
  updateContact() {
    //TODO: consider stripping ui.grid data
    this.ContactService.update(this.contact);
  }

  /**
   * @method removeContact
   * directs service to remove individual ContactService
   * ContactService will be responsible for updating
   * the row data when the call returns
   * @return {undefined}
   */
  removeContact() {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      this.ContactService.del(this.contact);
    }
  }
}

export default ContactListDirective;
