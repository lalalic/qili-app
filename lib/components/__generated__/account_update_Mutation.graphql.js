/**
 * 
 * @relayHash c7bb5392bd7eb8facf1bcbbba58b2293
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type account_update_MutationVariables = {|
  photo?: ?string;
|};
export type account_update_MutationResponse = {|
  +user_update: ?any;
|};
*/

/*
mutation account_update_Mutation(
  $photo: String
) {
  user_update(photo: $photo)
}
*/

var batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [{
      "kind": "LocalArgument",
      "name": "photo",
      "type": "String",
      "defaultValue": null
    }],
    "kind": "Fragment",
    "metadata": null,
    "name": "account_update_Mutation",
    "selections": [{
      "kind": "ScalarField",
      "alias": null,
      "args": [{
        "kind": "Variable",
        "name": "photo",
        "variableName": "photo",
        "type": "String"
      }],
      "name": "user_update",
      "storageKey": null
    }],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "account_update_Mutation",
  "query": {
    "argumentDefinitions": [{
      "kind": "LocalArgument",
      "name": "photo",
      "type": "String",
      "defaultValue": null
    }],
    "kind": "Root",
    "name": "account_update_Mutation",
    "operation": "mutation",
    "selections": [{
      "kind": "ScalarField",
      "alias": null,
      "args": [{
        "kind": "Variable",
        "name": "photo",
        "variableName": "photo",
        "type": "String"
      }],
      "name": "user_update",
      "storageKey": null
    }]
  },
  "text": "mutation account_update_Mutation(\n  $photo: String\n) {\n  user_update(photo: $photo)\n}\n"
};

module.exports = batch;