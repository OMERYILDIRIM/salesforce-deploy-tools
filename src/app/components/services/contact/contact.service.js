class ContactService {
  constructor ($http) {
    'ngInject';

    this.fields = [];
    this.contacts = [];

    this.$http = $http;
    this.apiHost = 'https://api.github.com/repos/Swiip/generator-gulp-angular';
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
}

export default ContactService;
