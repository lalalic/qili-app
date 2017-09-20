/**
 * @flow
 * @relayHash f0b7e3b152eddcf3cf49115d673e7aaf
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type account_setPhoto_MutationVariables = {|
  url: string;
  id: string;
  field?: ?string;
|};

export type account_setPhoto_MutationResponse = {|
  +file_link: ?boolean;
|};
*/


/*
mutation account_setPhoto_Mutation(
  $url: String!
  $id: ID!
  $field: String = "photo"
) {
  file_link(url: $url, id: $id, field: $field)
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "url",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "field",
        "type": "String",
        "defaultValue": "photo"
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "account_setPhoto_Mutation",
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "field",
            "variableName": "field",
            "type": "String!"
          },
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id",
            "type": "ID!"
          },
          {
            "kind": "Variable",
            "name": "url",
            "variableName": "url",
            "type": "String!"
          }
        ],
        "name": "file_link",
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "account_setPhoto_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "url",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "field",
        "type": "String",
        "defaultValue": "photo"
      }
    ],
    "kind": "Root",
    "name": "account_setPhoto_Mutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "field",
            "variableName": "field",
            "type": "String!"
          },
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id",
            "type": "ID!"
          },
          {
            "kind": "Variable",
            "name": "url",
            "variableName": "url",
            "type": "String!"
          }
        ],
        "name": "file_link",
        "storageKey": null
      }
    ]
  },
  "text": "mutation account_setPhoto_Mutation(\n  $url: String!\n  $id: ID!\n  $field: String = \"photo\"\n) {\n  file_link(url: $url, id: $id, field: $field)\n}\n"
};

module.exports = batch;
