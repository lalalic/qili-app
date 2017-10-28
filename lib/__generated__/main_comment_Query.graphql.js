/**
 * 
 * @relayHash 062de5216b50e04b096f28583170e0ce
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type main_comment_QueryResponse = {| |};
*/

/*
query main_comment_Query(
  $parent: ObjectID!
  $count: Int = 10
  $cursor: JSON
) {
  ...main_appComments
}

fragment main_appComments on Query {
  comments: app_comments(parent: $parent, last: $count, before: $cursor) {
    edges {
      node {
        __typename
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
      cursor
    }
    pageInfo {
      hasPreviousPage
      startCursor
    }
  }
}
*/

var batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [{
      "kind": "LocalArgument",
      "name": "parent",
      "type": "ObjectID!",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int",
      "defaultValue": 10
    }, {
      "kind": "LocalArgument",
      "name": "cursor",
      "type": "JSON",
      "defaultValue": null
    }],
    "kind": "Fragment",
    "metadata": null,
    "name": "main_comment_Query",
    "selections": [{
      "kind": "FragmentSpread",
      "name": "main_appComments",
      "args": null
    }],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "main_comment_Query",
  "query": {
    "argumentDefinitions": [{
      "kind": "LocalArgument",
      "name": "parent",
      "type": "ObjectID!",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int",
      "defaultValue": 10
    }, {
      "kind": "LocalArgument",
      "name": "cursor",
      "type": "JSON",
      "defaultValue": null
    }],
    "kind": "Root",
    "name": "main_comment_Query",
    "operation": "query",
    "selections": [{
      "kind": "LinkedField",
      "alias": "comments",
      "args": [{
        "kind": "Variable",
        "name": "before",
        "variableName": "cursor",
        "type": "JSON"
      }, {
        "kind": "Variable",
        "name": "last",
        "variableName": "count",
        "type": "Int"
      }, {
        "kind": "Variable",
        "name": "parent",
        "variableName": "parent",
        "type": "ObjectID"
      }],
      "concreteType": "AppCommentConnection",
      "name": "app_comments",
      "plural": false,
      "selections": [{
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "AppCommentEdge",
        "name": "edges",
        "plural": true,
        "selections": [{
          "kind": "LinkedField",
          "alias": null,
          "args": null,
          "concreteType": "AppComment",
          "name": "node",
          "plural": false,
          "selections": [{
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "__typename",
            "storageKey": null
          }, {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          }, {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "content",
            "storageKey": null
          }, {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "type",
            "storageKey": null
          }, {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "createdAt",
            "storageKey": null
          }, {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "author",
            "plural": false,
            "selections": [{
              "kind": "ScalarField",
              "alias": null,
              "args": null,
              "name": "id",
              "storageKey": null
            }, {
              "kind": "ScalarField",
              "alias": null,
              "args": null,
              "name": "name",
              "storageKey": null
            }, {
              "kind": "ScalarField",
              "alias": null,
              "args": null,
              "name": "photo",
              "storageKey": null
            }],
            "storageKey": null
          }, {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "isOwner",
            "storageKey": null
          }],
          "storageKey": null
        }, {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "cursor",
          "storageKey": null
        }],
        "storageKey": null
      }, {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "PageInfo",
        "name": "pageInfo",
        "plural": false,
        "selections": [{
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "hasPreviousPage",
          "storageKey": null
        }, {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "startCursor",
          "storageKey": null
        }],
        "storageKey": null
      }],
      "storageKey": null
    }, {
      "kind": "LinkedHandle",
      "alias": "comments",
      "args": [{
        "kind": "Variable",
        "name": "before",
        "variableName": "cursor",
        "type": "JSON"
      }, {
        "kind": "Variable",
        "name": "last",
        "variableName": "count",
        "type": "Int"
      }, {
        "kind": "Variable",
        "name": "parent",
        "variableName": "parent",
        "type": "ObjectID"
      }],
      "handle": "connection",
      "name": "app_comments",
      "key": "main_app_comments",
      "filters": ["parent"]
    }]
  },
  "text": "query main_comment_Query(\n  $parent: ObjectID!\n  $count: Int = 10\n  $cursor: JSON\n) {\n  ...main_appComments\n}\n\nfragment main_appComments on Query {\n  comments: app_comments(parent: $parent, last: $count, before: $cursor) {\n    edges {\n      node {\n        __typename\n        id\n        content\n        type\n        createdAt\n        author {\n          id\n          name\n          photo\n        }\n        isOwner\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n"
};

module.exports = batch;