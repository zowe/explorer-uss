/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2020
 */

import { createUSSResource, fetchUSSTreeChildren, INVALIDATE_NEW_RESOURCE } from './treeUSS';
import { getPathToResource } from '../utilities/USSUtilities';
import { atlasGet, atlasPut } from '../utilities/urlUtils';
import { checkForValidationFailure } from './validation';
import { constructAndPushMessage } from './snackbarNotifications';

export const REQUEST_CONTENT = 'REQUEST_CONTENT';
export const RECEIVE_CONTENT = 'RECEIVE_CONTENT';
export const INVALIDATE_CONTENT = 'INVALIDATE_CONTENT';

export const UPDATE_EDITOR_CONTENT = 'UPDATE_EDITOR_CONTENT';
export const UPDATE_EDITOR_CHECKSUM = 'UPDATE_EDITOR_CHECKSUM';
export const INVALIDATE_CHECKSUM = 'INVALIDATE_CHECKSUM';
export const INVALIDATE_SAVE = 'INVALIDATE_SAVE';
export const INVALIDATE_SAVE_AS = 'INVALIDATE_SAVE_AS';
export const REQUEST_SAVE = 'REQUEST_SAVE';
export const REQUEST_SAVE_AS = 'REQUEST_SAVE_AS';
export const REQUEST_SAVE_AS_MEMBER = 'REQUEST_SAVE_AS_MEMBER';
export const RECEIVE_SAVE = 'RECEIVE_SAVE';
export const REQUEST_CHECKSUM = 'REQUEST_CHECKSUM';
export const RECEIVE_CHECKSUM = 'RECEIVE_CHECKSUM';
export const REQUEST_CHTAG = 'REQUEST_CHTAG';
export const RECEIVE_CHTAG = 'RECEIVE_CHTAG';
export const UPDATE_CHTAG = 'UPDATE_CHTAG';

const GET_CONTENT_FAIL_MESSAGE = 'Get content failed';
const SAVE_FAILURE_MESSAGE = 'Save failed for';
const SAVE_SUCCESS_MESSAGE = 'Save success for';

function requestContent(resource) {
    return {
        type: REQUEST_CONTENT,
        resource,
    };
}

function receiveContent(resource, content, checksum) {
    return {
        type: RECEIVE_CONTENT,
        resource,
        content,
        checksum,
    };
}

export function invalidateContent() {
    return {
        type: INVALIDATE_CONTENT,
    };
}

export function fetchUSSFile(USSPath) {
    return dispatch => {
        dispatch(requestContent(USSPath));
        const endpoint = `restfiles/fs/${USSPath && USSPath.indexOf('/') === 0 ? USSPath.substring(1) : USSPath}`;
        let checksum = '';
        return atlasGet(endpoint, { credentials: 'include' })
            .then(response => {
                return dispatch(checkForValidationFailure(response));
            })
            .then(response => {
                if (response.ok) {
                    checksum = response.headers.get('ETag');
                    return response.text();
                }
                return response.text().then(e => { throw Error(JSON.parse(e).message); });
            })
            .then(text => {
                dispatch(receiveContent(USSPath, text, checksum));
            })
            .catch(e => {
                dispatch(constructAndPushMessage(`${GET_CONTENT_FAIL_MESSAGE} ${USSPath} : ${e.message}`));
                return dispatch(invalidateContent());
            });
    };
}

function requestSave(resource) {
    return {
        type: REQUEST_SAVE,
        resource,
    };
}

function requestSaveAs(oldName, newName) {
    return {
        type: REQUEST_SAVE_AS,
        oldName,
        newName,
    };
}

function receiveSave(resource) {
    return {
        type: RECEIVE_SAVE,
        resource,
    };
}

function requestChecksum(resource) {
    return {
        type: REQUEST_CHECKSUM,
        resource,
    };
}

function receiveChecksum(resource) {
    return {
        type: RECEIVE_CHECKSUM,
        resource,
    };
}

export function updateEditorContent(content) {
    return {
        type: UPDATE_EDITOR_CONTENT,
        content,
    };
}

export function updateEditorChecksum(checksum) {
    return {
        type: UPDATE_EDITOR_CHECKSUM,
        checksum,
    };
}

function invalidateSave() {
    return {
        type: INVALIDATE_SAVE,
    };
}

function invalidateSaveAs() {
    return {
        type: INVALIDATE_SAVE_AS,
    };
}

function invalidateChecksumChange() {
    return {
        type: INVALIDATE_CHECKSUM,
    };
}

export function getNewUSSResourceChecksum(resourceName) {
    return dispatch => {
        dispatch(requestChecksum(resourceName));
        const contentURL = `restfiles/fs/${(resourceName && resourceName.length > 0 && resourceName.indexOf('/') === 0) ? resourceName.substring(1) : resourceName}`;
        let checksum = '';
        return atlasGet(contentURL, { credentials: 'include' })
            .then(response => {
                return dispatch(checkForValidationFailure(response));
            })
            .then(response => {
                dispatch(receiveChecksum(resourceName));
                checksum = response.headers.get('ETag');
            }).then(() => {
                dispatch(updateEditorChecksum(checksum));
            })
            .catch(() => {
                dispatch(invalidateChecksumChange());
            });
    };
}

function constructSaveUSSURL(resourceName) {
    return `restfiles/fs/${resourceName && resourceName.indexOf('/') === 0 ? resourceName.substring(1) : resourceName}`;
}

export function saveUSSResource(resourceName, content, checksum) {
    return dispatch => {
        dispatch(requestSave(resourceName));
        const contentURL = constructSaveUSSURL(resourceName);
        return atlasPut(contentURL, content, checksum)
            .then(response => {
                return dispatch(checkForValidationFailure(response));
            })
            .then(response => {
                if (response.ok) {
                    dispatch(constructAndPushMessage(`${SAVE_SUCCESS_MESSAGE} ${resourceName}`));
                    return dispatch(receiveSave(resourceName));
                }
                return response.json().then(e => { throw Error(e.message); });
            }).then(() => {
                dispatch(getNewUSSResourceChecksum(resourceName));
            })
            .catch(e => {
                dispatch(constructAndPushMessage(`${SAVE_FAILURE_MESSAGE} ${resourceName} : ${e.message}`));
                dispatch(invalidateSave());
            });
    };
}

export function saveAsUSSResource(oldResource, newResource, content) {
    return dispatch => {
        dispatch(requestSaveAs(oldResource, newResource));
        return dispatch(createUSSResource(newResource, 'FILE')).then(createResponse => {
            if (createResponse.type === INVALIDATE_NEW_RESOURCE) {
                return dispatch(invalidateSaveAs());
            }
            const contentURL = constructSaveUSSURL(newResource);
            return atlasPut(contentURL, content)
                .then(response => {
                    return dispatch(checkForValidationFailure(response));
                })
                .then(response => {
                    if (response.ok) {
                        dispatch(constructAndPushMessage(`${SAVE_SUCCESS_MESSAGE} ${newResource}`));
                        return dispatch(receiveSave(newResource));
                    }
                    return response.json().then(e => { throw Error(e.message); });
                }).then(() => {
                    dispatch(fetchUSSTreeChildren(getPathToResource(newResource)));
                    return dispatch(fetchUSSFile(newResource));
                })
                .catch(e => {
                    dispatch(constructAndPushMessage(`${SAVE_FAILURE_MESSAGE} ${newResource} : ${e.message}`));
                    dispatch(invalidateSaveAs());
                });
        });
    };
}
