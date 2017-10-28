/**
 * @flow
 * @relayHash 73b10f2ab2c6ca9166b4ef40589926a1
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type authentication_requestToken_MutationVariables = {|
  contact: string;
|};
export type authentication_requestToken_MutationResponse = {|
  +requestToken: ?boolean;
|};
*/


/*
mutation authentication_requestToken_Mutation(
  $contact: String!
) {
  requestToken(contact: $contact)
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "contact",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "authentication_requestToken_Mutation",
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "contact",
            "variableName": "contact",
            "type": "String!"
          }
        ],
        "name": "requestToken",
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "authentication_requestToken_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "contact",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "authentication_requestToken_Mutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "contact",
            "variableName": "contact",
            "type": "String!"
          }
        ],
        "name": "requestToken",
        "storageKey": null
      }
    ]
  },
  "text": "mutation authentication_requestToken_Mutation(\n  $contact: String!\n) {\n  requestToken(contact: $contact)\n}\n"
};

module.exports = batch;
