/**
 * @flow
 * @relayHash fd7ba081da179dc45ed189baf89e0c16
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type main_comment_create_MutationVariables = {|
  parent: any;
  content: string;
  type?: ?"photo" | "text";
|};

export type main_comment_create_MutationResponse = {|
  +app_create_comment: ?{|
    +id: string;
    +createdAt: any;
  |};
|};
*/


/*
mutation main_comment_create_Mutation(
  $parent: ObjectID!
  $content: String!
  $type: CommentType
) {
  app_create_comment(parent: $parent, content: $content, type: $type) {
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
        "name": "parent",
        "type": "ObjectID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "content",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "type",
        "type": "CommentType",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "main_comment_create_Mutation",
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
            "name": "parent",
            "variableName": "parent",
            "type": "ObjectID"
          },
          {
            "kind": "Variable",
            "name": "type",
            "variableName": "type",
            "type": "CommentType"
          }
        ],
        "concreteType": "AppComment",
        "name": "app_create_comment",
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
  "name": "main_comment_create_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "parent",
        "type": "ObjectID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "content",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "type",
        "type": "CommentType",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "main_comment_create_Mutation",
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
            "name": "parent",
            "variableName": "parent",
            "type": "ObjectID"
          },
          {
            "kind": "Variable",
            "name": "type",
            "variableName": "type",
            "type": "CommentType"
          }
        ],
        "concreteType": "AppComment",
        "name": "app_create_comment",
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
  "text": "mutation main_comment_create_Mutation(\n  $parent: ObjectID!\n  $content: String!\n  $type: CommentType\n) {\n  app_create_comment(parent: $parent, content: $content, type: $type) {\n    id\n    createdAt\n  }\n}\n"
};

module.exports = batch;
