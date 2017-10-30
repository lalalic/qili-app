/**
 * 
 * @relayHash 8b6f63781bca186ca41d1b004101ff53
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type main_log_QueryResponse = {|
  +me: {|
    +app: ?{| |};
  |};
|};
*/

/*
query main_log_Query(
  $id: ObjectID!
  $status: String
  $count: Int
  $cursor: JSON
) {
  me {
    app(_id: $id) {
      ...main_logApp
      id
    }
    id
  }
}

fragment main_logApp on App {
  logs(status: $status, first: $count, after: $cursor) {
    edges {
      node {
        __typename
        ...log
        id
      }
      cursor
    }
    pageInfo {
      hasPreviousPage
      startCursor
      endCursor
      hasNextPage
    }
  }
}

fragment log on Log {
  id
  startedAt
  type
  operation
  status
  time
  variables
  report
}
*/

var batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [{
      "kind": "LocalArgument",
      "name": "id",
      "type": "ObjectID!",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "status",
      "type": "String",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "cursor",
      "type": "JSON",
      "defaultValue": null
    }],
    "kind": "Fragment",
    "metadata": null,
    "name": "main_log_Query",
    "selections": [{
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "User",
      "name": "me",
      "plural": false,
      "selections": [{
        "kind": "LinkedField",
        "alias": null,
        "args": [{
          "kind": "Variable",
          "name": "_id",
          "variableName": "id",
          "type": "ObjectID!"
        }],
        "concreteType": "App",
        "name": "app",
        "plural": false,
        "selections": [{
          "kind": "FragmentSpread",
          "name": "main_logApp",
          "args": null
        }],
        "storageKey": null
      }],
      "storageKey": null
    }],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "main_log_Query",
  "query": {
    "argumentDefinitions": [{
      "kind": "LocalArgument",
      "name": "id",
      "type": "ObjectID!",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "status",
      "type": "String",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "cursor",
      "type": "JSON",
      "defaultValue": null
    }],
    "kind": "Root",
    "name": "main_log_Query",
    "operation": "query",
    "selections": [{
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "User",
      "name": "me",
      "plural": false,
      "selections": [{
        "kind": "LinkedField",
        "alias": null,
        "args": [{
          "kind": "Variable",
          "name": "_id",
          "variableName": "id",
          "type": "ObjectID!"
        }],
        "concreteType": "App",
        "name": "app",
        "plural": false,
        "selections": [{
          "kind": "LinkedField",
          "alias": null,
          "args": [{
            "kind": "Variable",
            "name": "after",
            "variableName": "cursor",
            "type": "JSON"
          }, {
            "kind": "Variable",
            "name": "first",
            "variableName": "count",
            "type": "Int"
          }, {
            "kind": "Variable",
            "name": "status",
            "variableName": "status",
            "type": "String"
          }],
          "concreteType": "LogConnection",
          "name": "logs",
          "plural": false,
          "selections": [{
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "LogEdge",
            "name": "edges",
            "plural": true,
            "selections": [{
              "kind": "LinkedField",
              "alias": null,
              "args": null,
              "concreteType": "Log",
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
                "name": "startedAt",
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
                "name": "operation",
                "storageKey": null
              }, {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "status",
                "storageKey": null
              }, {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "time",
                "storageKey": null
              }, {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "variables",
                "storageKey": null
              }, {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "report",
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
            }, {
              "kind": "ScalarField",
              "alias": null,
              "args": null,
              "name": "endCursor",
              "storageKey": null
            }, {
              "kind": "ScalarField",
              "alias": null,
              "args": null,
              "name": "hasNextPage",
              "storageKey": null
            }],
            "storageKey": null
          }],
          "storageKey": null
        }, {
          "kind": "LinkedHandle",
          "alias": null,
          "args": [{
            "kind": "Variable",
            "name": "after",
            "variableName": "cursor",
            "type": "JSON"
          }, {
            "kind": "Variable",
            "name": "first",
            "variableName": "count",
            "type": "Int"
          }, {
            "kind": "Variable",
            "name": "status",
            "variableName": "status",
            "type": "String"
          }],
          "handle": "connection",
          "name": "logs",
          "key": "main_logs",
          "filters": ["status"]
        }, {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "id",
          "storageKey": null
        }],
        "storageKey": null
      }, {
        "kind": "ScalarField",
        "alias": null,
        "args": null,
        "name": "id",
        "storageKey": null
      }],
      "storageKey": null
    }]
  },
  "text": "query main_log_Query(\n  $id: ObjectID!\n  $status: String\n  $count: Int\n  $cursor: JSON\n) {\n  me {\n    app(_id: $id) {\n      ...main_logApp\n      id\n    }\n    id\n  }\n}\n\nfragment main_logApp on App {\n  logs(status: $status, first: $count, after: $cursor) {\n    edges {\n      node {\n        __typename\n        ...log\n        id\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment log on Log {\n  id\n  startedAt\n  type\n  operation\n  status\n  time\n  variables\n  report\n}\n"
};

module.exports = batch;