/**
 * @flow
 * @relayHash 3218dc2722b5af2254375e2673a74e76
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type main_userProfile_me_QueryResponse = {|
  +me: {| |};
|};
*/


/*
query main_userProfile_me_Query {
  me {
    ...userProfile
    id
  }
}

fragment userProfile on User {
  id
  username
  birthday
  gender
  location
  photo
  signature
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "main_userProfile_me_Query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "User",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "userProfile",
            "args": null
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
  "name": "main_userProfile_me_Query",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "main_userProfile_me_Query",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "User",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "type": "User",
            "selections": [
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
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query main_userProfile_me_Query {\n  me {\n    ...userProfile\n    id\n  }\n}\n\nfragment userProfile on User {\n  id\n  username\n  birthday\n  gender\n  location\n  photo\n  signature\n}\n"
};

module.exports = batch;
