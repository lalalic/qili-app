/**
 * @flow
 * @relayHash 17db04349a57bebacc47fafb45d7562a
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type file_token_MutationVariables = {|
  key?: ?string;
|};

export type file_token_MutationResponse = {|
  +file_token: ?{|
    +token: string;
    +id: ?string;
  |};
|};
*/


/*
mutation file_token_Mutation(
  $key: String
) {
  file_token(key: $key) {
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
        "name": "key",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "file_token_Mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "key",
            "variableName": "key",
            "type": "String"
          }
        ],
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
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "key",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "file_token_Mutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "key",
            "variableName": "key",
            "type": "String"
          }
        ],
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
  "text": "mutation file_token_Mutation(\n  $key: String\n) {\n  file_token(key: $key) {\n    token\n    id\n  }\n}\n"
};

module.exports = batch;
