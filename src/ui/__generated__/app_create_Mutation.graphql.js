/**
 * @flow
 * @relayHash fcb8497966242fc6de224777f7baf163
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type app_create_MutationVariables = {|
  name: string;
  uname?: ?string;
|};
export type app_create_MutationResponse = {|
  +app_create: ?{|
    +id: string;
  |};
|};
*/


/*
mutation app_create_Mutation(
  $name: String!
  $uname: String
) {
  app_create(name: $name, uname: $uname) {
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "name",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "uname",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "app_create_Mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "name",
            "type": "String!"
          },
          {
            "kind": "Variable",
            "name": "uname",
            "variableName": "uname",
            "type": "String"
          }
        ],
        "concreteType": "App",
        "name": "app_create",
        "plural": false,
        "selections": [
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
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "app_create_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "name",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "uname",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "app_create_Mutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "name",
            "type": "String!"
          },
          {
            "kind": "Variable",
            "name": "uname",
            "variableName": "uname",
            "type": "String"
          }
        ],
        "concreteType": "App",
        "name": "app_create",
        "plural": false,
        "selections": [
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
  "text": "mutation app_create_Mutation(\n  $name: String!\n  $uname: String\n) {\n  app_create(name: $name, uname: $uname) {\n    id\n  }\n}\n"
};

module.exports = batch;
