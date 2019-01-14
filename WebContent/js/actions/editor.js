/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2019
 */

import { CONTENT_TYPE_APPLICATION_JSON } from '../constants/apiRequestConstants';
import { createUSSResource, fetchUSSTreeChildren } from '../actions/treeUSS';
import { getPathToResource } from '../utilities/USSUtilities';
import { atlasFetch, encodeURLComponent } from '../utilities/urlUtils';
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

const GET_CONTENT_FAIL_MESSAGE = 'Get content failed for';
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
        const endpoint = `uss/files/${encodeURIComponent(USSPath)}/content`;
        return atlasFetch(endpoint, { credentials: 'include' })
            .then(response => { return response.json(); })
            .then(json => {
                dispatch(receiveContent(USSPath, json.content, json.checksum));
            })
            .catch(() => {
                dispatch(constructAndPushMessage(`${GET_CONTENT_FAIL_MESSAGE} ${USSPath}`));
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
        const contentURL = `uss/files/${encodeURLComponent(resourceName)}/content`;
        return atlasFetch(contentURL, { credentials: 'include' }).then(response => {
            if (response.ok) {
                dispatch(receiveChecksum(resourceName));
                return response.json();
            }
            throw Error(response);
        }).then(json => {
            dispatch(updateEditorChecksum(json.checksum));
        }).catch(() => {
            dispatch(invalidateChecksumChange());
        });
    };
}

function constructSaveUSSURL(resourceName) {
    return `uss/files/${encodeURLComponent(resourceName)}/content`;
}

function constructSaveUSSHeaders() {
    return new Headers(
        CONTENT_TYPE_APPLICATION_JSON,
    );
}

function insertNewLineChars(content) {
    return JSON.stringify(content);
}

function constructUSSSaveBody(content, checksum) {
    let body = `{"content": ${insertNewLineChars(content)}`;
    if (checksum) {
        body += `, "checksum": "${checksum}"`;
    }
    body += '}';
    return body;
}

function constructSaveUSSContent(content, checksum) {
    return {
        credentials: 'include',
        headers: constructSaveUSSHeaders(),
        method: 'PUT',
        body: constructUSSSaveBody(content, checksum),
    };
}

export function saveUSSResource(resourceName, content, checksum) {
    return dispatch => {
        dispatch(requestSave(resourceName));
        const contentURL = constructSaveUSSURL(resourceName);
        const fetchContent = constructSaveUSSContent(content, checksum);

        return atlasFetch(contentURL, fetchContent).then(response => {
            if (response.ok) {
                dispatch(constructAndPushMessage(`${SAVE_SUCCESS_MESSAGE} ${resourceName}`));
                return dispatch(receiveSave(resourceName));
            }
            throw Error(response);
        }).then(() => {
            dispatch(getNewUSSResourceChecksum(resourceName));
        }).catch(response => {
            dispatch(constructAndPushMessage(`${SAVE_FAILURE_MESSAGE} ${resourceName}`));
            dispatch(invalidateSave(response));
        });
    };
}

export function saveAsUSSResource(oldResource, newResource, content) {
    return dispatch => {
        dispatch(requestSaveAs(oldResource, newResource));
        return dispatch(createUSSResource(newResource, 'file')).then(() => {
            const contentURL = constructSaveUSSURL(newResource);
            const fetchContent = constructSaveUSSContent(content);
            return atlasFetch(contentURL, fetchContent).then(response => {
                if (response.ok) {
                    dispatch(constructAndPushMessage(`${SAVE_SUCCESS_MESSAGE} ${newResource}`));
                    return dispatch(receiveSave(newResource));
                }
                throw response;
            }).then(() => {
                dispatch(fetchUSSTreeChildren(getPathToResource(newResource)));
                return dispatch(fetchUSSFile(newResource));
            })
                .catch(response => {
                    return response.text().then(textResponse => {
                        dispatch(constructAndPushMessage(`${SAVE_FAILURE_MESSAGE} ${newResource}`));
                        dispatch(invalidateSaveAs(textResponse));
                    });
                });
        });
    };
}
