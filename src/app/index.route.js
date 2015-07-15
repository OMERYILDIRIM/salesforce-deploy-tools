function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
   .state('main', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    });
    /*
    .state('main.contacts', {
      url: "contacts",
      templateUrl: 'app/components/views/contacts/contacts.html',
      controller: 'ContactsController',
      controllerAs: 'contacts'
    })
    //TODO: add ability to jump to specific date
    // route for running in a local enviroment
    .state('main.contacts.calendar', {
      url: "calandar",
      templateUrl: 'app/components/views/calendar/calendar.html',
      controller: 'CalendarController',
      controllerAs: 'calendar'
    });
    */
  $urlRouterProvider.otherwise('/');
  //$urlRouterProvider.when('/', '/contacts');

}

export default routerConfig;
