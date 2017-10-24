/**
 * @flow
 * @relayHash 6b896c8bf6b94c02dbcb00ce3b781fca
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type file_token_MutationVariables = {| |};

export type file_token_MutationResponse = {|
  +file_token: ?{|
    +token: string;
    +id: ?any;
  |};
|};
*/


/*
mutation file_token_Mutation {
  file_token {
    token
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "file_token_Mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "FileToken",
        "name": "file_token",
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
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "file_token_Mutation",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "file_token_Mutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "FileToken",
        "name": "file_token",
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
  "text": "mutation file_token_Mutation {\n  file_token {\n    token\n    id\n  }\n}\n"
};

module.exports = batch;
