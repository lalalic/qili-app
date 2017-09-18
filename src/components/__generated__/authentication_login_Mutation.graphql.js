/**
 * @flow
 * @relayHash a86becf917fba86fdd4a8f4b5b21d0f5
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type authentication_login_MutationVariables = {|
  data?: ?{
    contact: string;
    token: string;
    name?: ?string;
  };
|};

export type authentication_login_MutationResponse = {|
  +login: ?{|
    +token: ?string;
  |};
|};
*/


/*
mutation authentication_login_Mutation(
  $data: loginInput
) {
  login(data: $data) {
    token
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "data",
        "type": "loginInput",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "authentication_login_Mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "data",
            "variableName": "data",
            "type": "loginInput"
          }
        ],
        "concreteType": "User",
        "name": "login",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "token",
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
  "name": "authentication_login_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "data",
        "type": "loginInput",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "authentication_login_Mutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "data",
            "variableName": "data",
            "type": "loginInput"
          }
        ],
        "concreteType": "User",
        "name": "login",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "token",
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
  "text": "mutation authentication_login_Mutation(\n  $data: loginInput\n) {\n  login(data: $data) {\n    token\n    id\n  }\n}\n"
};

module.exports = batch;
