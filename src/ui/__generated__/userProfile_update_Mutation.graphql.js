/**
 * @flow
 * @relayHash e29c492075519035417188124f618179
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
  +user_update: any;
|};
*/


/*
mutation userProfile_update_Mutation(
  $data: user_updateInput!
) {
  user_update(data: $data)
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
        "kind": "ScalarField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "data",
            "variableName": "data",
            "type": "user_updateInput!"
          }
        ],
        "name": "user_update",
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
        "kind": "ScalarField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "data",
            "variableName": "data",
            "type": "user_updateInput!"
          }
        ],
        "name": "user_update",
        "storageKey": null
      }
    ]
  },
  "text": "mutation userProfile_update_Mutation(\n  $data: user_updateInput!\n) {\n  user_update(data: $data)\n}\n"
};

module.exports = batch;
