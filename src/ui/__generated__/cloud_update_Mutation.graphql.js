/**
 * @flow
 * @relayHash ac9f099b1c4cb69b8939ce91d991c480
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type cloud_update_MutationVariables = {|
  id: any;
  cloudCode: string;
|};

export type cloud_update_MutationResponse = {|
  +app_update: ?{|
    +cloudCode: ?string;
    +schema: ?string;
  |};
|};
*/


/*
mutation cloud_update_Mutation(
  $id: ObjectID!
  $cloudCode: String!
) {
  app_update(_id: $id, cloudCode: $cloudCode) {
    cloudCode
    schema
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
        "name": "cloudCode",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "cloud_update_Mutation",
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
            "name": "cloudCode",
            "variableName": "cloudCode",
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
            "name": "cloudCode",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "schema",
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
  "name": "cloud_update_Mutation",
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
        "name": "cloudCode",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "cloud_update_Mutation",
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
            "name": "cloudCode",
            "variableName": "cloudCode",
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
            "name": "cloudCode",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "schema",
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
  "text": "mutation cloud_update_Mutation(\n  $id: ObjectID!\n  $cloudCode: String!\n) {\n  app_update(_id: $id, cloudCode: $cloudCode) {\n    cloudCode\n    schema\n    id\n  }\n}\n"
};

module.exports = batch;
