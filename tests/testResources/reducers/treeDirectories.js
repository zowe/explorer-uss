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

export const baseTreeDirectories = Map({
    children: Map({}),
    isFetching: false,
});

export const requestedTreeDirectories = Map({
    children: Map({}),
    isFetching: true,
});

export const treeDirectoriesPath = '/u/jcain/test';
export const treeDirectoriesPath2 = '/u/jcain/test/test2';

export const treeDirectoriesChildData = [
    {
        name: 'helloworld.txt',
        size: 20,
        type: 'file',
    },
    {
        name: 'test2',
        size: 8192,
        type: 'directory',
    },
    {
        name: 'helloworld1',
        size: 1,
        type: 'file',
    },
];

export const treeDirectoriesChildData2 = [
    {
        name: 'helloworld2',
        size: 20,
        type: 'file',
    },
    {
        name: 'anotherFolder',
        size: 8192,
        type: 'directory',
    },
];

export const receivedTreeDirectories = Map({
    children: Map({
        '/u/jcain/test/helloworld.txt': Map({
            type: 'file',
            isToggled: false,
        }),
        '/u/jcain/test/test2': Map({
            type: 'directory',
            isToggled: false,
        }),
        '/u/jcain/test/helloworld1': Map({
            type: 'file',
            isToggled: false,
        }),
    }),
    isFetching: false,
});


/*
        "/u/jcain/test": Map({
            type: "directory",
            isToggled: true
        }),
        "/u/jcain/test2": Map({
            type: "directory",
            isToggled: false
        }),
*/
export const receivedTreeDirectoriesWithExistingChildren = Map({
    children: Map({
        '/u/jcain/test/helloworld.txt': Map({
            type: 'file',
            isToggled: false,
        }),
        '/u/jcain/test/test2': Map({
            type: 'directory',
            isToggled: false,
        }),
        '/u/jcain/test/helloworld1': Map({
            type: 'file',
            isToggled: false,
        }),
        '/u/jcain/test/test2/helloworld2': Map({
            type: 'file',
            isToggled: false,
        }),
        '/u/jcain/test/test2/anotherFolder': Map({
            type: 'directory',
            isToggled: false,
        }),
    }),
    isFetching: false,
});

export const toggledReceivedTreeDirectories = Map({
    children: Map({
        '/u/jcain/test/helloworld.txt': Map({
            type: 'file',
            isToggled: false,
        }),
        '/u/jcain/test/test2': Map({
            type: 'directory',
            isToggled: true,
        }),
        '/u/jcain/test/helloworld1': Map({
            type: 'file',
            isToggled: false,
        }),
    }),
    isFetching: false,
});

