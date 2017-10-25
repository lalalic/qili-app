/**
 * @flow
 * @relayHash 54bcc8f504b93b9d866538533b899d5a
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type file_create_MutationVariables = {|
  _id: any;
  host: string;
  bucket?: ?string;
  size?: ?number;
  crc?: ?number;
  mimeType?: ?string;
  imageInfo?: ?any;
|};

export type file_create_MutationResponse = {|
  +file_create: ?{|
    +url: ?string;
  |};
|};
*/


/*
mutation file_create_Mutation(
  $_id: ObjectID!
  $host: ID!
  $bucket: String
  $size: Int
  $crc: Int
  $mimeType: String
  $imageInfo: JSON
) {
  file_create(_id: $_id, host: $host, bucket: $bucket, size: $size, crc: $crc, mimeType: $mimeType, imageInfo: $imageInfo) {
    url
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "_id",
        "type": "ObjectID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "host",
        "type": "ID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "bucket",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "size",
        "type": "Int",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "crc",
        "type": "Int",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "mimeType",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "imageInfo",
        "type": "JSON",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "file_create_Mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "_id",
            "variableName": "_id",
            "type": "ObjectID!"
          },
          {
            "kind": "Variable",
            "name": "bucket",
            "variableName": "bucket",
            "type": "String"
          },
          {
            "kind": "Variable",
            "name": "crc",
            "variableName": "crc",
            "type": "Int"
          },
          {
            "kind": "Variable",
            "name": "host",
            "variableName": "host",
            "type": "ID!"
          },
          {
            "kind": "Variable",
            "name": "imageInfo",
            "variableName": "imageInfo",
            "type": "JSON"
          },
          {
            "kind": "Variable",
            "name": "mimeType",
            "variableName": "mimeType",
            "type": "String"
          },
          {
            "kind": "Variable",
            "name": "size",
            "variableName": "size",
            "type": "Int"
          }
        ],
        "concreteType": "File",
        "name": "file_create",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "url",
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
  "name": "file_create_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "_id",
        "type": "ObjectID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "host",
        "type": "ID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "bucket",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "size",
        "type": "Int",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "crc",
        "type": "Int",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "mimeType",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "imageInfo",
        "type": "JSON",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "file_create_Mutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "_id",
            "variableName": "_id",
            "type": "ObjectID!"
          },
          {
            "kind": "Variable",
            "name": "bucket",
            "variableName": "bucket",
            "type": "String"
          },
          {
            "kind": "Variable",
            "name": "crc",
            "variableName": "crc",
            "type": "Int"
          },
          {
            "kind": "Variable",
            "name": "host",
            "variableName": "host",
            "type": "ID!"
          },
          {
            "kind": "Variable",
            "name": "imageInfo",
            "variableName": "imageInfo",
            "type": "JSON"
          },
          {
            "kind": "Variable",
            "name": "mimeType",
            "variableName": "mimeType",
            "type": "String"
          },
          {
            "kind": "Variable",
            "name": "size",
            "variableName": "size",
            "type": "Int"
          }
        ],
        "concreteType": "File",
        "name": "file_create",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "url",
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
  "text": "mutation file_create_Mutation(\n  $_id: ObjectID!\n  $host: ID!\n  $bucket: String\n  $size: Int\n  $crc: Int\n  $mimeType: String\n  $imageInfo: JSON\n) {\n  file_create(_id: $_id, host: $host, bucket: $bucket, size: $size, crc: $crc, mimeType: $mimeType, imageInfo: $imageInfo) {\n    url\n    id\n  }\n}\n"
};

module.exports = batch;
