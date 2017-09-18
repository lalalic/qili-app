/**
 * @flow
 * @relayHash 7df03b959e22e051d0252436b8446b26
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type userProfile_update_MutationVariables = {|
  data: {
    username?: ?string;
    birthday?: ?any;
    gender?: ?"girl" | "boy";
    location?: ?string;
    signature?: ?string;
  };
|};

export type userProfile_update_MutationResponse = {|
  +user_update: ?{|
    +_id: any;
    +username: ?string;
    +birthday: ?any;
    +gender: ?"girl" | "boy";
    +location: ?string;
    +photo: ?string;
    +signature: ?string;
  |};
|};
*/


/*
mutation userProfile_update_Mutation(
  $data: user_updateInput!
) {
  user_update(data: $data) {
    _id
    username
    birthday
    gender
    location
    photo
    signature
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
        "type": "user_updateInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "userProfile_update_Mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "data",
            "variableName": "data",
            "type": "user_updateInput!"
          }
        ],
        "concreteType": "User",
        "name": "user_update",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "_id",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "username",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "birthday",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "gender",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "location",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "photo",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "signature",
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
  "name": "userProfile_update_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "data",
        "type": "user_updateInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "userProfile_update_Mutation",
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
            "type": "user_updateInput!"
          }
        ],
        "concreteType": "User",
        "name": "user_update",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "_id",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "username",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "birthday",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "gender",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "location",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "photo",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "signature",
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
  "text": "mutation userProfile_update_Mutation(\n  $data: user_updateInput!\n) {\n  user_update(data: $data) {\n    _id\n    username\n    birthday\n    gender\n    location\n    photo\n    signature\n    id\n  }\n}\n"
};

module.exports = batch;
