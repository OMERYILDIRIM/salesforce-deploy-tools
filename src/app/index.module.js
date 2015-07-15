/* global malarkey:false, toastr:false, moment:false */
'use strict';

import config from './index.config';
import routerConfig from './index.route';
import runBlock from './index.run';

//SERVICES
//import AdvancedContactService from './components/services/advancedContact/advancedContact.service';
//import ContactService from './components/services/contact/contact.service';
//import GithubContributorService from './components/services/githubContributor/githubContributor.service';
//import WebDevTecService from './components/services/webDevTec/webDevTec.service';

//COMPONENTS
//import NavbarDirective from './components/navbar/navbar.directive';
//import MalarkeyDirective from './components/malarkey/malarkey.directive';
import ContactListDirective from './components/directives/contactList/contactList.directive';


//VIEWS
import MainController from './main/main.controller';

angular.module('resimplifi', [
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ui.grid',
  'ui.grid.expandable'
 ])
.constant('malarkey', malarkey)
.constant('toastr', toastr)
.constant('moment', moment)

.config(config)
.config(routerConfig)
.run(runBlock)

//.service('ContactService', ContactService)
//.service('AdvancedContactService', AdvancedContactService)
//.service('githubContributor', GithubContributorService)
//.service('webDevTec', WebDevTecService)
//.service('Service', Service)

.controller('MainController', MainController)

//.directive('acmeNavbar', () => new NavbarDirective())
//.directive('acmeMalarkey', () => new MalarkeyDirective(malarkey))
.directive('contactList', () => new ContactListDirective());
//.directive('', () => new Directive());

/*
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
*/
