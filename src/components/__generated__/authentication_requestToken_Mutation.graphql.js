/**
 * @flow
 * @relayHash a2413c92c43808e37b0c593550546b24
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type authentication_requestToken_MutationVariables = {|
  data: {
    contact: string;
  };
|};

export type authentication_requestToken_MutationResponse = {|
  +requestToken: ?boolean;
|};
*/


/*
mutation authentication_requestToken_Mutation(
  $data: requestTokenInput!
) {
  requestToken(data: $data)
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "data",
        "type": "requestTokenInput!",
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
            "name": "data",
            "variableName": "data",
            "type": "requestTokenInput!"
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
        "name": "data",
        "type": "requestTokenInput!",
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
            "name": "data",
            "variableName": "data",
            "type": "requestTokenInput!"
          }
        ],
        "name": "requestToken",
        "storageKey": null
      }
    ]
  },
  "text": "mutation authentication_requestToken_Mutation(\n  $data: requestTokenInput!\n) {\n  requestToken(data: $data)\n}\n"
};

module.exports = batch;
