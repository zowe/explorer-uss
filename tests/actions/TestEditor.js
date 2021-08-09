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
import nock from 'nock';
import thunk from 'redux-thunk';
import expect from 'expect';
import rewire from 'rewire';
import { Map } from 'immutable';
import sinon from 'sinon';
import { LOCAL_HOST_ENDPOINT as BASE_URL } from '../testResources/hostConstants';
import * as editorActions from '../../WebContent/js/actions/editor';
import * as editorResources from '../testResources/actions/editor';
import * as treeUSSActions from '../../WebContent/js/actions/treeUSS';
import * as snackbarActions from '../../WebContent/js/actions/snackbarNotifications';

describe('Action: editor', () => {
    let sandbox;

    afterEach(() => {
        nock.cleanAll();
        sandbox.restore();
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    function mockVoidFunction(object, method) {
        sandbox.stub(object, method).callsFake(() => {
            return (() => { });
        });
    }

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    const rewiredEditor = rewire('../../WebContent/js/actions/editor');
    const rewiredTree = rewire('../../WebContent/js/actions/treeUSS');
    const rewiredSaveSuccessMessage = rewiredEditor.__get__('SAVE_SUCCESS_MESSAGE');
    const rewiredSaveFailMessage = rewiredEditor.__get__('SAVE_FAILURE_MESSAGE');
    const rewiredCreateSuccessMessage = rewiredTree.__get__('USS_CREATE_SUCCESS_MESSAGE');
    const rewiredCreateFailMessage = rewiredTree.__get__('USS_CREATE_FAIL_MESSAGE');

    describe('fetchUSSFile', () => {
        it('Should handle requesting and receiving a USS File', () => {
            const USSPath = '/u/jcain/hello/test.txt';

            const expectedActions = [{
                type: editorActions.REQUEST_CONTENT,
                resource: USSPath,
            },
            {
                type: editorActions.RECEIVE_CONTENT,
                resource: USSPath,
                content: editorResources.text,
                checksum: editorResources.checksum,
            }];

            nock(BASE_URL)
                .get(`/restfiles/fs/${USSPath.indexOf('/') === 0 ? USSPath.substring(1) : USSPath}`)
                .reply(200, editorResources.text, { ETag: `${editorResources.checksum}` });

            const store = mockStore();
            return store.dispatch(editorActions.fetchUSSFile(USSPath))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should handle requesting and invalidation', () => {
            const rewiredFetchFail = rewiredEditor.__get__('GET_CONTENT_FAIL_MESSAGE');
            const USSPath = '/u/jcain/hello/test.txt';
            const expectedActions = [{
                type: editorActions.REQUEST_CONTENT,
                resource: USSPath,
            },
            {
                type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                message: Map({
                    message: `${rewiredFetchFail} ${USSPath} : ${editorResources.getContentNotFoundResponse.message}`,
                }),
            },
            {
                type: editorActions.INVALIDATE_CONTENT,
            }];

            nock(BASE_URL)
                .get(`/restfiles/fs/${USSPath.indexOf('/') === 0 ? USSPath.substring(1) : USSPath}`)
                .reply(404, editorResources.getContentNotFoundResponse);

            const store = mockStore();
            return store.dispatch(editorActions.fetchUSSFile(USSPath))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });

    describe('updateEditorContent', () => {
        it('Should create an action to update the editor content', () => {
            const expectedAction = {
                type: editorActions.UPDATE_EDITOR_CONTENT,
                content: editorResources.content,
            };
            expect(editorActions.updateEditorContent(editorResources.content)).toEqual(expectedAction);
        });
    });

    describe('updateEditorChecksum', () => {
        it('Should create an action to update the editor checksum', () => {
            const expectedAction = {
                type: editorActions.UPDATE_EDITOR_CHECKSUM,
                checksum: editorResources.checksum,
            };
            expect(editorActions.updateEditorChecksum(editorResources.checksum)).toEqual(expectedAction);
        });
    });

    describe('requestSave', () => {
        it('Should create an action to request a save', () => {
            const rewiredRequestSave = rewiredEditor.__get__('requestSave');

            const expectedAction = {
                type: editorActions.REQUEST_SAVE,
                resource: editorResources.dataset,
            };
            expect(rewiredRequestSave(editorResources.dataset)).toEqual(expectedAction);
        });
    });

    describe('invalidateSave', () => {
        it('Should create an action to invalidate a save request', () => {
            const rewiredInvalidateSave = rewiredEditor.__get__('invalidateSave');

            const expectedAction = {
                type: editorActions.INVALIDATE_SAVE,
            };
            expect(rewiredInvalidateSave(editorResources.invalidateSaveResponse)).toEqual(expectedAction);
        });
    });

    describe('requestChecksum', () => {
        it('Should create an action to request a Checksum', () => {
            const rewiredRequestChecksum = rewiredEditor.__get__('requestChecksum');

            const expectedAction = {
                type: editorActions.REQUEST_CHECKSUM,
                resource: editorResources.dataset,
            };
            expect(rewiredRequestChecksum(editorResources.dataset)).toEqual(expectedAction);
        });
    });

    describe('getNewUSSResourceChecksum', () => {
        it('Should create actions to request, receive and update editor checksum', () => {
            const expectedActions = [
                {
                    type: editorActions.REQUEST_CHECKSUM,
                    resource: editorResources.USSFile,
                },
                {
                    type: editorActions.RECEIVE_CHECKSUM,
                    resource: editorResources.USSFile,
                },
                {
                    type: editorActions.UPDATE_EDITOR_CHECKSUM,
                    checksum: editorResources.checksum,
                },
            ];

            nock(BASE_URL)
                .get(`/restfiles/fs/${editorResources.USSFile.indexOf('/') === 0 ? editorResources.USSFile.substring(1) : editorResources.USSFile}`)
                .reply(200, editorResources.content, { ETag: `${editorResources.checksum}` });

            const store = mockStore();
            return store.dispatch(
                editorActions.getNewUSSResourceChecksum(editorResources.USSFile))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('Should create actions to request, and invalidate editor checksum', () => {
            const expectedActions = [
                {
                    type: editorActions.REQUEST_CHECKSUM,
                    resource: editorResources.ussFile,
                },
                {
                    type: editorActions.INVALIDATE_CHECKSUM,
                },
            ];

            nock(BASE_URL)
                .get('/restfiles/fs/')
                .reply(500);

            const store = mockStore();
            return store.dispatch(editorActions.getNewUSSResourceChecksum(editorResources.ussFile))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });

    describe('saveUSSResource', () => {
        it('should create actions to request, receive and request a checksum', () => {
            const expectedActions = [
                {
                    type: editorActions.REQUEST_SAVE,
                    resource: editorResources.USSFile,
                },
                {
                    type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                    message: Map({
                        message: `${rewiredSaveSuccessMessage} ${editorResources.USSFile}`,
                    }),
                },
                {
                    type: editorActions.RECEIVE_SAVE,
                    resource: editorResources.USSFile,
                },
                {
                    type: editorActions.REQUEST_CHECKSUM,
                    resource: editorResources.USSFile,
                },
            ];

            nock(BASE_URL)
                .put(`/restfiles/fs/${editorResources.USSFile.indexOf('/') === 0 ? editorResources.USSFile.substring(1) : editorResources.USSFile}`)
                .reply(204);

            const store = mockStore();

            return store.dispatch(editorActions.saveUSSResource(editorResources.USSFile, editorResources.text, editorResources.checksum))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        it('should create actions to request and invalidate save', () => {
            const expectedActions = [
                {
                    type: editorActions.REQUEST_SAVE,
                    resource: editorResources.USSFile,
                },
                {
                    type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                    message: Map({
                        message: `${rewiredSaveFailMessage} ${editorResources.USSFile} : ${editorResources.saveContentFailedResponse.message}`,
                    }),
                },
                {
                    type: editorActions.INVALIDATE_SAVE,
                },
            ];

            nock(BASE_URL)
                .put(`/restfiles/fs/${editorResources.USSFile.indexOf('/') === 0 ? editorResources.USSFile.substring(1) : editorResources.USSFile}`)
                .reply(500, editorResources.saveContentFailedResponse);

            const store = mockStore();

            return store.dispatch(editorActions.saveUSSResource(editorResources.USSFile, editorResources.text, editorResources.checksum))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });

    describe('saveAsUSSResource', () => {
        it('Should create actions to requestSaveAs, requestSave, receiveSave before getting new checksum, fetchUSSTreeChildren, requestEdit and fetchUSSFile', () => {
            // TODO:: We should mock the createUSSResource function so we don't need to check for the 3 actions related to it,
            // Attempts to mock using a dumb promise that auto resolves fails
            const expectedActions = [
                {
                    type: editorActions.REQUEST_SAVE_AS,
                    oldName: editorResources.USSFile,
                    newName: editorResources.newUSSFile,
                },
                {
                    type: treeUSSActions.REQUEST_NEW_RESOURCE,
                    USSPath: editorResources.newUSSFile,
                },
                {
                    type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                    message: Map({
                        message: `${rewiredCreateSuccessMessage} ${editorResources.newUSSFile}`,
                    }),
                },
                {
                    type: treeUSSActions.RECEIVE_NEW_FILE,
                    USSPath: editorResources.newUSSFile,
                },
                {
                    type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                    message: Map({
                        message: `${rewiredSaveSuccessMessage} ${editorResources.newUSSFile}`,
                    }),
                },
                {
                    type: editorActions.RECEIVE_SAVE,
                    resource: editorResources.newUSSFile,
                },
                {
                    type: editorActions.REQUEST_CONTENT,
                    resource: editorResources.newUSSFile,
                },
                {
                    type: editorActions.RECEIVE_CONTENT,
                    resource: editorResources.newUSSFile,
                    content: editorResources.newContent,
                    checksum: editorResources.newChecksum,
                },
            ];

            nock(BASE_URL)
                .post('/restfiles/fs')
                .reply(201);
            nock(BASE_URL)
                .post(`/restfiles/fs/${editorResources.newUSSFile.indexOf('/') === 0 ? editorResources.newUSSFile.substring(1) : editorResources.USSFile}`)
                .reply(201);
            nock(BASE_URL)
                .put(`/restfiles/fs/${editorResources.newUSSFile.indexOf('/') === 0 ? editorResources.newUSSFile.substring(1) : editorResources.USSFile}`)
                .reply(200);
            nock(BASE_URL)
                .get(`/restfiles/fs/${editorResources.newUSSFile.indexOf('/') === 0 ? editorResources.newUSSFile.substring(1) : editorResources.USSFile}`)
                .reply(200, editorResources.newContent, { ETag: `${editorResources.newChecksum}` });

            const store = mockStore();

            mockVoidFunction(treeUSSActions, 'fetchUSSTreeChildren');

            return store.dispatch(editorActions.saveAsUSSResource(editorResources.USSFile, editorResources.newUSSFile, editorResources.newContent))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                    expect(treeUSSActions.fetchUSSTreeChildren.calledOnce).toEqual(true, 'fetchUSSTreeChildren called once');
                });
        });
        it('Should create actions to requestSaveAs and invalidateSaveAs due to not able to create new file', () => {
            const expectedActions = [
                {
                    type: editorActions.REQUEST_SAVE_AS,
                    oldName: editorResources.USSFile,
                    newName: editorResources.newUSSFile,
                },
                {
                    type: treeUSSActions.REQUEST_NEW_RESOURCE,
                    USSPath: editorResources.newUSSFile,
                },
                {
                    type: snackbarActions.PUSH_NOTIFICATION_MESSAGE,
                    message: Map({
                        message: `${rewiredCreateFailMessage} ${editorResources.newUSSFile} : ${editorResources.saveContentFailedResponse.message}`,
                    }),
                },
                {
                    type: treeUSSActions.INVALIDATE_NEW_RESOURCE,
                    path: editorResources.newUSSFile,
                },
                {
                    type: editorActions.INVALIDATE_SAVE_AS,
                },
            ];

            nock(BASE_URL)
                .post(`/restfiles/fs/${editorResources.newUSSFile.indexOf('/') === 0 ? editorResources.newUSSFile.substring(1) : editorResources.newUSSFile}`)
                .reply(500, editorResources.saveContentFailedResponse);

            const store = mockStore();

            return store.dispatch(editorActions.saveAsUSSResource(editorResources.USSFile, editorResources.newUSSFile, editorResources.newContent.content))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });
});
