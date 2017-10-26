/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type cloud_app = {|
  +cloudCode: ?string;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "cloud_app",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "cloudCode",
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "schema_app",
      "args": null
    }
  ],
  "type": "App"
};

module.exports = fragment;
