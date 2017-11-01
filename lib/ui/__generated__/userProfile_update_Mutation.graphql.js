/**
 * 
 * @relayHash 80e18cf92e5d470f385f62c996878e9b
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type userProfile_update_MutationVariables = {|
  photo?: ?string;
  username?: ?string;
  birthday?: ?any;
  gender?: ?"girl" | "boy";
  location?: ?string;
  signature?: ?string;
|};
export type userProfile_update_MutationResponse = {|
  +user_update: ?any;
|};
*/

/*
mutation userProfile_update_Mutation(
  $photo: String
  $username: String
  $birthday: Date
  $gender: Gender
  $location: String
  $signature: String
) {
  user_update(photo: $photo, username: $username, birthday: $birthday, gender: $gender, location: $location, signature: $signature)
}
*/

var batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [{
      "kind": "LocalArgument",
      "name": "photo",
      "type": "String",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "username",
      "type": "String",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "birthday",
      "type": "Date",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "gender",
      "type": "Gender",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "location",
      "type": "String",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "signature",
      "type": "String",
      "defaultValue": null
    }],
    "kind": "Fragment",
    "metadata": null,
    "name": "userProfile_update_Mutation",
    "selections": [{
      "kind": "ScalarField",
      "alias": null,
      "args": [{
        "kind": "Variable",
        "name": "birthday",
        "variableName": "birthday",
        "type": "Date"
      }, {
        "kind": "Variable",
        "name": "gender",
        "variableName": "gender",
        "type": "Gender"
      }, {
        "kind": "Variable",
        "name": "location",
        "variableName": "location",
        "type": "String"
      }, {
        "kind": "Variable",
        "name": "photo",
        "variableName": "photo",
        "type": "String"
      }, {
        "kind": "Variable",
        "name": "signature",
        "variableName": "signature",
        "type": "String"
      }, {
        "kind": "Variable",
        "name": "username",
        "variableName": "username",
        "type": "String"
      }],
      "name": "user_update",
      "storageKey": null
    }],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "userProfile_update_Mutation",
  "query": {
    "argumentDefinitions": [{
      "kind": "LocalArgument",
      "name": "photo",
      "type": "String",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "username",
      "type": "String",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "birthday",
      "type": "Date",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "gender",
      "type": "Gender",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "location",
      "type": "String",
      "defaultValue": null
    }, {
      "kind": "LocalArgument",
      "name": "signature",
      "type": "String",
      "defaultValue": null
    }],
    "kind": "Root",
    "name": "userProfile_update_Mutation",
    "operation": "mutation",
    "selections": [{
      "kind": "ScalarField",
      "alias": null,
      "args": [{
        "kind": "Variable",
        "name": "birthday",
        "variableName": "birthday",
        "type": "Date"
      }, {
        "kind": "Variable",
        "name": "gender",
        "variableName": "gender",
        "type": "Gender"
      }, {
        "kind": "Variable",
        "name": "location",
        "variableName": "location",
        "type": "String"
      }, {
        "kind": "Variable",
        "name": "photo",
        "variableName": "photo",
        "type": "String"
      }, {
        "kind": "Variable",
        "name": "signature",
        "variableName": "signature",
        "type": "String"
      }, {
        "kind": "Variable",
        "name": "username",
        "variableName": "username",
        "type": "String"
      }],
      "name": "user_update",
      "storageKey": null
    }]
  },
  "text": "mutation userProfile_update_Mutation(\n  $photo: String\n  $username: String\n  $birthday: Date\n  $gender: Gender\n  $location: String\n  $signature: String\n) {\n  user_update(photo: $photo, username: $username, birthday: $birthday, gender: $gender, location: $location, signature: $signature)\n}\n"
};

module.exports = batch;