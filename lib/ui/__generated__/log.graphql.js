

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type log = $ReadOnlyArray<{|
  +id: string;
  +startedAt: ?any;
  +type: ?string;
  +operation: ?string;
  +status: ?number;
  +time: ?number;
  +variables: ?any;
  +report: ?any;
|}>;
*/

var fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "log",
  "selections": [{
    "kind": "ScalarField",
    "alias": null,
    "args": null,
    "name": "id",
    "storageKey": null
  }, {
    "kind": "ScalarField",
    "alias": null,
    "args": null,
    "name": "startedAt",
    "storageKey": null
  }, {
    "kind": "ScalarField",
    "alias": null,
    "args": null,
    "name": "type",
    "storageKey": null
  }, {
    "kind": "ScalarField",
    "alias": null,
    "args": null,
    "name": "operation",
    "storageKey": null
  }, {
    "kind": "ScalarField",
    "alias": null,
    "args": null,
    "name": "status",
    "storageKey": null
  }, {
    "kind": "ScalarField",
    "alias": null,
    "args": null,
    "name": "time",
    "storageKey": null
  }, {
    "kind": "ScalarField",
    "alias": null,
    "args": null,
    "name": "variables",
    "storageKey": null
  }, {
    "kind": "ScalarField",
    "alias": null,
    "args": null,
    "name": "report",
    "storageKey": null
  }],
  "type": "Log"
};

module.exports = fragment;