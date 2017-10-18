/**
 * 
 * @relayHash 7080700d0f9b2d334ec05f1d04feb25c
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type app_update_MutationVariables = {|
  id: any;
  name?: ?string;
  uname?: ?string;
|};

export type app_update_MutationResponse = {|
  +app_update: ?any;
|};
*/

/*
mutation app_update_Mutation(
  $id: ObjectID!
  $name: String
  $uname: String
) {
  app_update(_id: $id, name: $name, uname: $uname)
}
*/

var batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [{
      "kind": "LocalArgument",
      "name": "id",
      "type": "ObjectID!",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "name",
      "type": "String",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "uname",
      "type": "String",
      "defaultValue": null
    }],
    "kind": "Fragment",
    "metadata": null,
    "name": "app_update_Mutation",
    "selections": [{
      "kind": "ScalarField",
      "alias": null,
      "args": [{
        "kind": "Variable",
        "name": "_id",
        "variableName": "id",
        "type": "ObjectID!"
      }, {
        "kind": "Variable",
        "name": "name",
        "variableName": "name",
        "type": "String"
      }, {
        "kind": "Variable",
        "name": "uname",
        "variableName": "uname",
        "type": "String"
      }],
      "name": "app_update",
      "storageKey": null
    }],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "app_update_Mutation",
  "query": {
    "argumentDefinitions": [{
      "kind": "LocalArgument",
      "name": "id",
      "type": "ObjectID!",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "name",
      "type": "String",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "uname",
      "type": "String",
      "defaultValue": null
    }],
    "kind": "Root",
    "name": "app_update_Mutation",
    "operation": "mutation",
    "selections": [{
      "kind": "ScalarField",
      "alias": null,
      "args": [{
        "kind": "Variable",
        "name": "_id",
        "variableName": "id",
        "type": "ObjectID!"
      }, {
        "kind": "Variable",
        "name": "name",
        "variableName": "name",
        "type": "String"
      }, {
        "kind": "Variable",
        "name": "uname",
        "variableName": "uname",
        "type": "String"
      }],
      "name": "app_update",
      "storageKey": null
    }]
  },
  "text": "mutation app_update_Mutation(\n  $id: ObjectID!\n  $name: String\n  $uname: String\n) {\n  app_update(_id: $id, name: $name, uname: $uname)\n}\n"
};

module.exports = batch;