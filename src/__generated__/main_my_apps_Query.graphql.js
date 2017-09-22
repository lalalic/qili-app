/**
 * @flow
 * @relayHash d82f095906c450e5247e95038684ad6c
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type main_my_apps_QueryResponse = {|
  +me: {| |};
|};
*/


/*
query main_my_apps_Query {
  me {
    ...my
    id
  }
}

fragment my on User {
  ...account
  apps {
    id
    name
  }
}

fragment account on User {
  id
  username
  photo
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "main_my_apps_Query",
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
            "name": "my",
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
  "name": "main_my_apps_Query",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "main_my_apps_Query",
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
                "name": "photo",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "App",
                "name": "apps",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query main_my_apps_Query {\n  me {\n    ...my\n    id\n  }\n}\n\nfragment my on User {\n  ...account\n  apps {\n    id\n    name\n  }\n}\n\nfragment account on User {\n  id\n  username\n  photo\n}\n"
};

module.exports = batch;
