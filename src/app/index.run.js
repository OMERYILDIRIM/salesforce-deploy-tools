'use strict';
import {makeVROPromisable} from './utils/vro-promise';

function runBlock ($log) {
  'ngInject';
  $log.debug('runBlock end');
  //allow promises with VRO objects
  //can pass different name if namespace changed
  makeVROPromisable();
}

export default runBlock;
