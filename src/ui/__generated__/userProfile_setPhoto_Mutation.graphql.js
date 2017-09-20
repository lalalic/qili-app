/**
 * @flow
 * @relayHash 88c4c875dc2acd4aed34360059f6d5c0
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type userProfile_setPhoto_MutationVariables = {|
  url: string;
  id: string;
  field?: ?string;
|};

export type userProfile_setPhoto_MutationResponse = {|
  +file_link: ?boolean;
|};
*/


/*
mutation userProfile_setPhoto_Mutation(
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
    "name": "userProfile_setPhoto_Mutation",
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
  "name": "userProfile_setPhoto_Mutation",
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
    "name": "userProfile_setPhoto_Mutation",
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
  "text": "mutation userProfile_setPhoto_Mutation(\n  $url: String!\n  $id: ID!\n  $field: String = \"photo\"\n) {\n  file_link(url: $url, id: $id, field: $field)\n}\n"
};

module.exports = batch;
