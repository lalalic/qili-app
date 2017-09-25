/**
 * @flow
 * @relayHash d4156bcadca3e173cb29efd1fcf71ee1
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
  +app_update: ?any;
|};
*/


/*
mutation cloud_update_Mutation(
  $id: ObjectID!
  $cloudCode: String!
) {
  app_update(_id: $id, cloudCode: $cloudCode)
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
        "kind": "ScalarField",
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
        "name": "app_update",
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
        "kind": "ScalarField",
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
        "name": "app_update",
        "storageKey": null
      }
    ]
  },
  "text": "mutation cloud_update_Mutation(\n  $id: ObjectID!\n  $cloudCode: String!\n) {\n  app_update(_id: $id, cloudCode: $cloudCode)\n}\n"
};

module.exports = batch;
