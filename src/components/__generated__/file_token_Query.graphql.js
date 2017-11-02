/**
 * @flow
 * @relayHash 11735081de8757c85ea0a2c7e9b20a9b
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type file_token_QueryResponse = {|
  +token: ?{|
    +token: string;
    +id: ?string;
  |};
|};
*/


/*
query file_token_Query(
  $key: String
) {
  token: file_upload_token(key: $key) {
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
    "name": "file_token_Query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "token",
        "args": [
          {
            "kind": "Variable",
            "name": "key",
            "variableName": "key",
            "type": "String"
          }
        ],
        "concreteType": "FileToken",
        "name": "file_upload_token",
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
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "file_token_Query",
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
    "name": "file_token_Query",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "token",
        "args": [
          {
            "kind": "Variable",
            "name": "key",
            "variableName": "key",
            "type": "String"
          }
        ],
        "concreteType": "FileToken",
        "name": "file_upload_token",
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
  "text": "query file_token_Query(\n  $key: String\n) {\n  token: file_upload_token(key: $key) {\n    token\n    id\n  }\n}\n"
};

module.exports = batch;
