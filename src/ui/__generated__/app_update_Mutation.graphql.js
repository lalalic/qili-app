/**
 * @flow
 * @relayHash b8f1762ecdb66678d3d33d25f006f796
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type app_update_MutationVariables = {|
  id: any;
  name?: ?string;
  uname?: ?string;
  isDev?: ?boolean;
|};
export type app_update_MutationResponse = {|
  +app_update: ?{|
    +updatedAt: ?any;
  |};
|};
*/


/*
mutation app_update_Mutation(
  $id: ObjectID!
  $name: String
  $uname: String
  $isDev: Boolean
) {
  app_update(_id: $id, name: $name, uname: $uname, isDev: $isDev) {
    updatedAt
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ObjectID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "name",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "uname",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "isDev",
        "type": "Boolean",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "app_update_Mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "_id",
            "variableName": "id",
            "type": "ObjectID!"
          },
          {
            "kind": "Variable",
            "name": "isDev",
            "variableName": "isDev",
            "type": "Boolean"
          },
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "name",
            "type": "String"
          },
          {
            "kind": "Variable",
            "name": "uname",
            "variableName": "uname",
            "type": "String"
          }
        ],
        "concreteType": "App",
        "name": "app_update",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "updatedAt",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "app_update_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ObjectID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "name",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "uname",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "isDev",
        "type": "Boolean",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "app_update_Mutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "_id",
            "variableName": "id",
            "type": "ObjectID!"
          },
          {
            "kind": "Variable",
            "name": "isDev",
            "variableName": "isDev",
            "type": "Boolean"
          },
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "name",
            "type": "String"
          },
          {
            "kind": "Variable",
            "name": "uname",
            "variableName": "uname",
            "type": "String"
          }
        ],
        "concreteType": "App",
        "name": "app_update",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "updatedAt",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation app_update_Mutation(\n  $id: ObjectID!\n  $name: String\n  $uname: String\n  $isDev: Boolean\n) {\n  app_update(_id: $id, name: $name, uname: $uname, isDev: $isDev) {\n    updatedAt\n    id\n  }\n}\n"
};

module.exports = batch;
