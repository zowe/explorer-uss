/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018
 */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import rewire from 'rewire';
import { Map } from 'immutable';
import * as treeDirectories from '../../WebContent/js/actions/treeDirectories';
import * as treeDirectoriesData from '../testResources/actions/treeDirectories';
import * as snackbarActions from '../../WebContent/js/actions/snackbarNotifications';
import { LOCAL_HOST_ENDPOINT as BASE_URL } from '../testResources/hostConstants';

describe('Action: treeDirectories', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    describe('toggleDirectory', () => {
        it('Should create an action to toggle the directory open(true) for a given path', () => {
            const path = '/u/jcain/';
            const toggle = true;
            const expectedAction = {
                type: treeDirectories.TOGGLE_DIRECTORY,
                path,
                toggled: toggle,
            };
            expect(treeDirectories.toggleDirectory(path, toggle)).toEqual(expectedAction);
        });

        it('Should create an action to toggle the directory closed(false) for a give path', () => {
            const path = '/u/jcain/';
            const toggle = false;
            const expectedAction = {
                type: treeDirectories.TOGGLE_DIRECTORY,
                path,
                toggled: toggle,
            };
            expect(treeDirectories.toggleDirectory(path, toggle)).toEqual(expectedAction);
        });
    });

    // TODO:: Consider if more testing is required, perhaps we should be validating child exists?
    describe('addTreeDirectory', () => {
        it('Should create an action to receive children from parameters', () => {
            const path = '/u/jcain/';
            const childName = 'testDirectory';
            const child = [{ name: childName, type: 'directory' }];
            const expectedAction = [{
                type: treeDirectories.RECEIVE_DIRECTORY_CHILDREN,
                path,
                children: child,
            }];
            const store = mockStore();

            store.dispatch(treeDirectories.addTreeDirectory(path, childName));
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

    describe('fetchDirectoryChildren', () => {
        it('Should create an action to request and receive children with valid data and toggle the directory', () => {
            const path = '/u/jcain/';
            const expectedActions = [{
                type: treeDirectories.REQUEST_DIRECTORY_CHILDREN,
                directory: path,
            },
            {
                type: treeDirectories.RECEIVE_DIRECTORY_CHILDREN,
                path,
                children: treeDirectoriesData.fetchDirectoryChildrenData,
            },
            {
                type: treeDirectories.TOGGLE_DIRECTORY,
                path,
                toggled: true,
            }];

            nock(BASE_URL)
                .get(`/uss/files/${encodeURIComponent(path)}`)
                .reply(200, treeDirectoriesData.fetchDirectoryChildrenDataResponse);

            const store = mockStore();

            return store.dispatch(treeDirectories.fetchDirectoryChildren(path))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create an action to request and receive children with valid data and toggle the directory using the root(/) as path', () => {
            const path = '/';
            const expectedActions = [{
                type: treeDirectories.REQUEST_DIRECTORY_CHILDREN,
                directory: path,
            },
            {
                type: treeDirectories.RECEIVE_DIRECTORY_CHILDREN,
                path,
                children: treeDirectoriesData.fetchDirectoryChildrenRootData,
            },
            {
                type: treeDirectories.TOGGLE_DIRECTORY,
                path,
                toggled: true,
            }];

            nock(BASE_URL)
                .get(`/uss/files/${encodeURIComponent(path)}`)
                .reply(200, treeDirectoriesData.fetchDirectoryChildrenRootDataResponse);

            const store = mockStore();

            return store.dispatch(treeDirectories.fetchDirectoryChildren(path))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create an action to request but not receive and therefore an invalidate action too', () => {
            const rewiredTreeDirectories = rewire('../../WebContent/js/actions/treeDirectories');
            const rewiredFailureMessage = rewiredTreeDirectories.__get__('USS_FETCH_CHILDREN_FAIL_MESSAGE');
            const path = '/u/jcain/';
            const expectedActions = [{
                type: treeDirectories.REQUEST_DIRECTORY_CHILDREN,
                directory: path,
            },
            {
                type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                message: Map({
                    message: `${rewiredFailureMessage} ${path}`,
                }),
            },
            {
                type: treeDirectories.INVALIDATE_DIRECTORY_CHILDREN,
            }];

            nock(BASE_URL)
                .get(`/uss/files/dir?path=${path}`)
                .reply(500, '');

            const store = mockStore();

            return store.dispatch(treeDirectories.fetchDirectoryChildren(path))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });
});
