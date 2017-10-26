/**
 * @flow
 * @relayHash 1de33a3e2c68cc2f7867c3874fed3ec3
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type main_cloud_QueryResponse = {|
  +me: {|
    +app: ?{| |};
  |};
|};
*/


/*
query main_cloud_Query(
  $id: ObjectID!
) {
  me {
    app(_id: $id) {
      ...cloud_app
      id
    }
    id
  }
}

fragment cloud_app on App {
  cloudCode
  ...schema_app
}

fragment schema_app on App {
  schema
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
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "main_cloud_Query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "User",
        "name": "me",
        "plural": false,
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
              }
            ],
            "concreteType": "App",
            "name": "app",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "cloud_app",
                "args": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "main_cloud_Query",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ObjectID!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "main_cloud_Query",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "User",
        "name": "me",
        "plural": false,
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
              }
            ],
            "concreteType": "App",
            "name": "app",
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
  "text": "query main_cloud_Query(\n  $id: ObjectID!\n) {\n  me {\n    app(_id: $id) {\n      ...cloud_app\n      id\n    }\n    id\n  }\n}\n\nfragment cloud_app on App {\n  cloudCode\n  ...schema_app\n}\n\nfragment schema_app on App {\n  schema\n}\n"
};

module.exports = batch;
