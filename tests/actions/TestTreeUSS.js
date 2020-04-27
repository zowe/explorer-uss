/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2020
 */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import rewire from 'rewire';
import { Map } from 'immutable';
import * as tree from '../../WebContent/js/actions/treeUSS';
import * as treeData from '../testResources/actions/treeUSS';
import * as snackbarActions from '../../WebContent/js/actions/snackbarNotifications';
import { LOCAL_HOST_ENDPOINT as BASE_URL } from '../testResources/hostConstants';

describe('Action: treeUSS', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const rewiredTree = rewire('../../WebContent/js/actions/treeUSS');

    describe('setPath', () => {
        it('Should create an action to set the path to an expected starting USS path', () => {
            const path = '/u/jcain';
            const expectedAction = {
                type: tree.SET_USS_TREE_PATH,
                USSPath: path,
            };
            expect(tree.setUSSPath(path)).toEqual(expectedAction);
        });

        it('Should create an action to set the path to an expected USS path', () => {
            const path = '/u/jcain/test/folder/deep/directory';
            const expectedAction = {
                type: tree.SET_USS_TREE_PATH,
                USSPath: path,
            };
            expect(tree.setUSSPath(path)).toEqual(expectedAction);
        });

        it('Should create an action to set the path to an unexpected value', () => {
            // we dont validate path ever so this should still work
            const path = "£#@;'\\`~喂123§";
            const expectedAction = {
                type: tree.SET_USS_TREE_PATH,
                USSPath: path,
            };
            expect(tree.setUSSPath(path)).toEqual(expectedAction);
        });
    });

    describe('resetUSSChildren', () => {
        it('Should create an action to reset the children', () => {
            const expectedAction = {
                type: tree.RESET_USS_TREE_CHILDREN,
            };

            expect(tree.resetUSSChildren()).toEqual(expectedAction);
        });
    });

    describe('fetchUSSTreeChildren', () => {
        it('Should create a request and receive action which returns some dummy data', () => {
            const path = '/u/jcain';
            const expectedActions = [
                {
                    type: tree.REQUEST_USS_TREE_CHILDREN,
                    USSPath: path,
                },
                treeData.receivedUSSChildrenAction,
            ];

            nock(BASE_URL)
                .get(`/unixfiles?path=${path}`)
                .reply(200, treeData.USSFetchResponse);

            const store = mockStore();

            return store.dispatch(tree.fetchUSSTreeChildren(path))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create a request and receive action which returns some large dummy data', () => {
            const path = '/u/jcain';
            const expectedActions = [
                {
                    type: tree.REQUEST_USS_TREE_CHILDREN,
                    USSPath: path,
                },
                treeData.receivedLargeUSSChildrenAction,
            ];

            nock(BASE_URL)
                .get(`/unixfiles?path=${path}`)
                .reply(200, treeData.largeDataResponse);

            const store = mockStore();

            return store.dispatch(tree.fetchUSSTreeChildren(path))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create a request and receive action which returns no data', () => {
            const path = '/u/jcain';
            const expectedActions = [
                {
                    type: tree.REQUEST_USS_TREE_CHILDREN,
                    USSPath: path,
                },
                treeData.receivedNoUSSChildrenAction,
            ];

            nock(BASE_URL)
                .get(`/unixfiles?path=${path}`)
                .reply(200, treeData.noDataResponse);

            const store = mockStore();

            return store.dispatch(tree.fetchUSSTreeChildren(path))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create a request but not receive and therefore an invalidate action too', () => {
            const path = '/u/jcain';
            const rewiredFailureMessage = rewiredTree.__get__('USS_FETCH_CHILDREN_FAIL_MESSAGE');
            const expectedActions = [
                {
                    type: tree.REQUEST_USS_TREE_CHILDREN,
                    USSPath: path,
                },
                {
                    type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                    message: new Map({
                        message: `${rewiredFailureMessage} ${path} : ${treeData.fetchUSSChildrenErrorResponse.message}`,
                    }),
                },
                {
                    type: tree.INVALIDATE_USS_TREE_CHILDREN,
                    USSPath: path,
                },
            ];

            nock(BASE_URL)
                .get(`/unixfiles?path=${path}`)
                .reply(500, treeData.fetchUSSChildrenErrorResponse);

            const store = mockStore();

            return store.dispatch(tree.fetchUSSTreeChildren(path))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });
});
