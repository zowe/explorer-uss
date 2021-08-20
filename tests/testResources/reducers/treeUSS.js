/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2019
 */

import { Map } from 'immutable';

const ROOT_TREE_ID = 'treeUSS';

export const baseTree = Map({
    id: ROOT_TREE_ID,
    USSChildren: Map({}),
    isFetching: false,
    USSPath: '',
});

export const USSPathSetTree = Map({
    id: ROOT_TREE_ID,
    USSChildren: Map({}),
    isFetching: false,
    USSPath: '/u/atlas',
});

export const requestedChildrenTree = Map({
    id: ROOT_TREE_ID,
    USSChildren: Map({}),
    isFetching: true,
    USSPath: '/u/atlas',
});

export const toggledTree = Map({
    id: ROOT_TREE_ID,
    USSChildren: Map({}),
    isFetching: false,
    USSPath: '',
});

export const restUSSChildren = Map({
    id: ROOT_TREE_ID,
    USSChildren: Map({}),
    isFetching: false,
    USSPath: '/u/atlas',
});

export const USSChildData = [
    {
        name: 'hello',
        mode: 'drw-------"',
    },
    {
        name: 'test.txt',
        mode: '-rw-------"',
    },
];

export const receivedUSSChildrenTree = Map({
    id: ROOT_TREE_ID,
    USSChildren: Map({
        hello: 'DIRECTORY',
        'test.txt': 'FILE',
    }),
    isFetching: false,
    USSPath: '/u/atlas',
});
