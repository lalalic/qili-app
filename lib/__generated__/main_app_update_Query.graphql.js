/**
 * 
 * @relayHash a64817fa8a21ff7e7a354096ced99c8c
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type main_app_update_QueryResponse = {|
  +me: {|
    +app: ?{| |};
  |};
|};
*/

/*
query main_app_update_Query(
  $id: ObjectID!
) {
  me {
    app(_id: $id) {
      ...app
      id
    }
    id
  }
}

fragment app on App {
  id
  name
  uname
  apiKey
  isDev
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
    "name": "main_app_update_Query",
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
          "name": "app",
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
  "name": "main_app_update_Query",
  "query": {
    "argumentDefinitions": [{
      "kind": "LocalArgument",
      "name": "id",
      "type": "ObjectID!",
      "defaultValue": null
    }],
    "kind": "Root",
    "name": "main_app_update_Query",
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
          "name": "uname",
          "storageKey": null
        }, {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "apiKey",
          "storageKey": null
        }, {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "isDev",
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
  "text": "query main_app_update_Query(\n  $id: ObjectID!\n) {\n  me {\n    app(_id: $id) {\n      ...app\n      id\n    }\n    id\n  }\n}\n\nfragment app on App {\n  id\n  name\n  uname\n  apiKey\n  isDev\n}\n"
};

module.exports = batch;