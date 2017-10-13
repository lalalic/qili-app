/**
 * @flow
 * @relayHash 551bcdd9e204d470e1e6c7a759824974
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
    +content: string;
    +type: ?"photo" | "text";
    +createdAt: any;
    +author: {|
      +id: string;
      +name: ?string;
      +photo: ?string;
    |};
    +isOwner: ?boolean;
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
    content
    type
    createdAt
    author {
      id
      name
      photo
    }
    isOwner
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
            "name": "content",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "type",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "createdAt",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "author",
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
                "name": "name",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "photo",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "isOwner",
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
            "name": "content",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "type",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "createdAt",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "author",
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
                "name": "name",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "photo",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "isOwner",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation main_comment_create_Mutation(\n  $parent: ObjectID!\n  $content: String!\n  $type: CommentType\n) {\n  app_create_comment(parent: $parent, content: $content, type: $type) {\n    id\n    content\n    type\n    createdAt\n    author {\n      id\n      name\n      photo\n    }\n    isOwner\n  }\n}\n"
};

module.exports = batch;
