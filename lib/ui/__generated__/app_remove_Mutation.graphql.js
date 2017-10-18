/**
 * 
 * @relayHash e6d19913e3e8b2f8d5c2b46b85d059c8
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type app_remove_MutationVariables = {|
  id: any;
|};

export type app_remove_MutationResponse = {|
  +app_remove: ?boolean;
|};
*/

/*
mutation app_remove_Mutation(
  $id: ObjectID!
) {
  app_remove(_id: $id)
}
*/

var batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [{
      "kind": "LocalArgument",
      "name": "id",
      "type": "ObjectID!",
      "defaultValue": null
    }],
    "kind": "Fragment",
    "metadata": null,
    "name": "app_remove_Mutation",
    "selections": [{
      "kind": "ScalarField",
      "alias": null,
      "args": [{
        "kind": "Variable",
        "name": "_id",
        "variableName": "id",
        "type": "ObjectID!"
      }],
      "name": "app_remove",
      "storageKey": null
    }],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "app_remove_Mutation",
  "query": {
    "argumentDefinitions": [{
      "kind": "LocalArgument",
      "name": "id",
      "type": "ObjectID!",
      "defaultValue": null
    }],
    "kind": "Root",
    "name": "app_remove_Mutation",
    "operation": "mutation",
    "selections": [{
      "kind": "ScalarField",
      "alias": null,
      "args": [{
        "kind": "Variable",
        "name": "_id",
        "variableName": "id",
        "type": "ObjectID!"
      }],
      "name": "app_remove",
      "storageKey": null
    }]
  },
  "text": "mutation app_remove_Mutation(\n  $id: ObjectID!\n) {\n  app_remove(_id: $id)\n}\n"
};

module.exports = batch;