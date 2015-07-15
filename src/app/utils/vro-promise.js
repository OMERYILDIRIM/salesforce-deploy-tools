'use strict';

export default function makeVROPromisable(ns) {
  ns = ns ? window[ns] : window['SObjectModel'];

  ns.makePromiseable = function (obj, vars) {
    var promObj = {};

    promObj.remoteObj = new ns[obj](vars);

    promObj.set = function (f, v) {
      this.remoteObj.set(f, v);
    };

		promObj.get = function (f) {
			return this.remoteObj.get(f);
		};

		promObj.retrieve = function (opts) {
      var self = this;
      return new Promise(function (resolve, reject) {
        self.remoteObj.retrieve(opts, (err, results, event) => err ? reject(err) : resolve({results, event}));
      });
		};

		promObj.create = function (fvs) {
      var self = this;
			fvs = fvs ? fvs : this.remoteObj._props;

      return new Promise(function (resolve, reject) {
  			self.remoteObj.create(fvs, (err, results, event) => err ? reject(err) : resolve({results, event}));
      });
		};

		promObj.update = function (ids, fvs) {
      var self = this;
      // If our ids object isn't an array, the user probably didn't want to include ids
      // so let's assume that the first argument should be our field-value pairs instead
			if (!(ids instanceof Array)) {
				fvs = ids;
				ids = null;
			}
			ids = ids ? ids : [this.remoteObject._props.Id];
			fvs = fvs ? fvs : this.remoteObject._props;

			console.log(this.remoteObject._props);
			console.log(ids);

      return new Promise(function (resolve, reject) {
  			self.remoteObj.update(ids, fvs, (err, results, event) => err ? reject(err) : resolve({results, event}));
      });
		};//END update


		promObj.upsert = function (ids, fvs) {
      var self = this;
      // If our ids object isn't an array, the user probably didn't want to include ids
      // so let's assume that the first argument should be our field-value pairs instead
			if (!(ids instanceof Array)) {
				fvs = ids;
				ids = null;
			}
			ids = ids ? ids : [this.remoteObject._props.Id];
			fvs = fvs ? fvs : this.remoteObject._props;

			console.log(this.remoteObject._props);
			console.log(ids);

      return new Promise(function (resolve, reject) {
  			self.remoteObj.upsert(ids, fvs, (err, results, event) => err ? reject(err) : resolve({results, event}));
      });
		};//END upsert

		promObj.del = function (ids) {
      var self = this;
			ids = ids ? ids : [this.remoteObject._props.Id];

      return new Promise(function (resolve, reject) {
  			self.remoteObj.del(ids, (err, results, event) => err ? reject(err) : resolve({results, event}));
      });
		};

		return promObj;
  };
}
