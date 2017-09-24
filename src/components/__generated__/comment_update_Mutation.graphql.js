/**
 * @flow
 * @relayHash a1ff23bbd085150bea941385ab805556
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type comment_update_MutationVariables = {|
  id: string;
  content: string;
|};

export type comment_update_MutationResponse = {|
  +comment: ?{|
    +id: string;
    +createdAt: any;
  |};
|};
*/


/*
mutation comment_update_Mutation(
  $id: ID!
  $content: String!
) {
  comment(host: $id, content: $content) {
    id
    createdAt
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "content",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "comment_update_Mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "content",
            "variableName": "content",
            "type": "String!"
          },
          {
            "kind": "Variable",
            "name": "host",
            "variableName": "id",
            "type": "ID!"
          }
        ],
        "concreteType": "Comment",
        "name": "comment",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "createdAt",
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
  "name": "comment_update_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "content",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "comment_update_Mutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "content",
            "variableName": "content",
            "type": "String!"
          },
          {
            "kind": "Variable",
            "name": "host",
            "variableName": "id",
            "type": "ID!"
          }
        ],
        "concreteType": "Comment",
        "name": "comment",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "createdAt",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation comment_update_Mutation(\n  $id: ID!\n  $content: String!\n) {\n  comment(host: $id, content: $content) {\n    id\n    createdAt\n  }\n}\n"
};

module.exports = batch;
