/**
 * 
 * @relayHash eddbf72cd3e25c78f260b9e1010d2570
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type authentication_login_MutationVariables = {|
  contact: string;
  token: string;
  name?: ?string;
|};

export type authentication_login_MutationResponse = {|
  +login: ?{|
    +id: string;
    +token: ?string;
  |};
|};
*/

/*
mutation authentication_login_Mutation(
  $contact: String!
  $token: String!
  $name: String
) {
  login(contact: $contact, token: $token, name: $name) {
    id
    token
  }
}
*/

var batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [{
      "kind": "LocalArgument",
      "name": "contact",
      "type": "String!",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "token",
      "type": "String!",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "name",
      "type": "String",
      "defaultValue": null
    }],
    "kind": "Fragment",
    "metadata": null,
    "name": "authentication_login_Mutation",
    "selections": [{
      "kind": "LinkedField",
      "alias": null,
      "args": [{
        "kind": "Variable",
        "name": "contact",
        "variableName": "contact",
        "type": "String!"
      }, {
        "kind": "Variable",
        "name": "name",
        "variableName": "name",
        "type": "String"
      }, {
        "kind": "Variable",
        "name": "token",
        "variableName": "token",
        "type": "String!"
      }],
      "concreteType": "User",
      "name": "login",
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
        "name": "token",
        "storageKey": null
      }],
      "storageKey": null
    }],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "authentication_login_Mutation",
  "query": {
    "argumentDefinitions": [{
      "kind": "LocalArgument",
      "name": "contact",
      "type": "String!",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "token",
      "type": "String!",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "name",
      "type": "String",
      "defaultValue": null
    }],
    "kind": "Root",
    "name": "authentication_login_Mutation",
    "operation": "mutation",
    "selections": [{
      "kind": "LinkedField",
      "alias": null,
      "args": [{
        "kind": "Variable",
        "name": "contact",
        "variableName": "contact",
        "type": "String!"
      }, {
        "kind": "Variable",
        "name": "name",
        "variableName": "name",
        "type": "String"
      }, {
        "kind": "Variable",
        "name": "token",
        "variableName": "token",
        "type": "String!"
      }],
      "concreteType": "User",
      "name": "login",
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
        "name": "token",
        "storageKey": null
      }],
      "storageKey": null
    }]
  },
  "text": "mutation authentication_login_Mutation(\n  $contact: String!\n  $token: String!\n  $name: String\n) {\n  login(contact: $contact, token: $token, name: $name) {\n    id\n    token\n  }\n}\n"
};

module.exports = batch;