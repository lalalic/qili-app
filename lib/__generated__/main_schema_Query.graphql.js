/**
 * 
 * @relayHash 89f7b934003b5c836103a67a04ba0793
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type main_schema_QueryResponse = {|
  +me: {|
    +app: ?{| |};
  |};
|};
*/

/*
query main_schema_Query(
  $id: ObjectID!
) {
  me {
    app(_id: $id) {
      ...schema_app
      id
    }
    id
  }
}

fragment schema_app on App {
  schema
}
*/

var batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [{
      "kind": "LocalArgument",
      "name": "id",
      "type": "ObjectID!",
      "defaultValue": null
    }],
    "kind": "Fragment",
    "metadata": null,
    "name": "main_schema_Query",
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
          "name": "schema_app",
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
  "name": "main_schema_Query",
  "query": {
    "argumentDefinitions": [{
      "kind": "LocalArgument",
      "name": "id",
      "type": "ObjectID!",
      "defaultValue": null
    }],
    "kind": "Root",
    "name": "main_schema_Query",
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
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "schema",
          "storageKey": null
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
  "text": "query main_schema_Query(\n  $id: ObjectID!\n) {\n  me {\n    app(_id: $id) {\n      ...schema_app\n      id\n    }\n    id\n  }\n}\n\nfragment schema_app on App {\n  schema\n}\n"
};

module.exports = batch;