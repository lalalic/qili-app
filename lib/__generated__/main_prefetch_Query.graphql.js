/**
 * 
 * @relayHash 6c8f060ebe9f55448c530fbb6949f4e6
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type main_prefetch_QueryResponse = {|
  +me: {|
    +name: ?string;
    +token: ?string;
    +apps: $ReadOnlyArray<?{|
      +id: string;
      +name: string;
      +uname: ?string;
      +cloudCode: ?string;
      +apiKey: string;
    |}>;
  |};
|};
*/

/*
query main_prefetch_Query {
  me {
    name
    token
    apps {
      id
      name
      uname
      cloudCode
      apiKey
    }
    id
  }
}
*/

var batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "main_prefetch_Query",
    "selections": [{
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "User",
      "name": "me",
      "plural": false,
      "selections": [{
        "kind": "ScalarField",
        "alias": null,
        "args": null,
        "name": "name",
        "storageKey": null
      }, {
        "kind": "ScalarField",
        "alias": null,
        "args": null,
        "name": "token",
        "storageKey": null
      }, {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "App",
        "name": "apps",
        "plural": true,
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
          "name": "cloudCode",
          "storageKey": null
        }, {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "apiKey",
          "storageKey": null
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
  "name": "main_prefetch_Query",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "main_prefetch_Query",
    "operation": "query",
    "selections": [{
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "User",
      "name": "me",
      "plural": false,
      "selections": [{
        "kind": "ScalarField",
        "alias": null,
        "args": null,
        "name": "name",
        "storageKey": null
      }, {
        "kind": "ScalarField",
        "alias": null,
        "args": null,
        "name": "token",
        "storageKey": null
      }, {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "App",
        "name": "apps",
        "plural": true,
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
          "name": "cloudCode",
          "storageKey": null
        }, {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "apiKey",
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
  "text": "query main_prefetch_Query {\n  me {\n    name\n    token\n    apps {\n      id\n      name\n      uname\n      cloudCode\n      apiKey\n    }\n    id\n  }\n}\n"
};

module.exports = batch;