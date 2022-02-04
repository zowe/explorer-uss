/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2020
 */

import { atlasGet, atlasDelete, atlasPost } from '../utilities/urlUtils';
import { checkForValidationFailure } from './validation';
import { constructAndPushMessage } from './snackbarNotifications';

export const REQUEST_USS_TREE_CHILDREN = 'REQUEST_USS_TREE_CHILDREN';
export const RECEIVE_USS_TREE_CHILDREN = 'RECEIVE_USS_TREE_CHILDREN';
export const INVALIDATE_USS_TREE_CHILDREN = 'INVALIDATE_USS_TREE_CHILDREN';
export const SET_USS_TREE_PATH = 'SET_USS_TREE_PATH';
export const TOGGLE_USS_TREE = 'TOGGLE_USS_TREE';
export const RESET_USS_TREE_CHILDREN = 'RESET_USS_TREE_CHILDREN';

export const REQUEST_NEW_RESOURCE = 'REQUEST_NEW_RESOURCE';
export const RECEIVE_NEW_DIRECTORY = 'RECEIVE_NEW_DIRECTORY';
export const RECEIVE_NEW_FILE = 'RECEIVE_NEW_FILE';
export const INVALIDATE_NEW_RESOURCE = 'INVALIDATE_NEW_RESOURCE';
export const REQUEST_DOWNLOAD_RESOURCE = 'REQUEST_DOWNLOAD_RESOURCE';
export const RECEIVE_DOWNLOAD_RESOURCE = 'RECEIVE_DOWNLOAD_RESOURCE';
export const INVALIDATE_DOWNLOAD_RESOURCE = 'INVALIDATE_DOWNLOAD_RESOURCE';
export const REQUEST_DELETE_RESOURCE = 'REQUEST_DELETE_RESOURCE';
export const RECEIVE_DELETE_RESOURCE = 'RECEIVE_DELETE_RESOURCE';
export const INVALIDATE_DELETE_RESOURCE = 'INVALIDATE_DELETE_RESOURCE';

const USS_FETCH_CHILDREN_FAIL_MESSAGE = 'Fetch children failed for';
const USS_CREATE_SUCCESS_MESSAGE = 'Create successful for';
const USS_CREATE_FAIL_MESSAGE = 'Create failed for';
const USS_DOWNLOAD_FAIL_MESSAGE = 'Download failed for';
const USS_DELETE_SUCCESS_MESSAGE = 'Delete successful for';
const USS_DELETE_FAIL_MESSAGE = 'Delete failed for';

function requestUSSChildren(path) {
    return {
        type: REQUEST_USS_TREE_CHILDREN,
        USSPath: path,
    };
}

function receiveUSSChildren(path, childData) {
    return {
        type: RECEIVE_USS_TREE_CHILDREN,
        USSPath: path,
        childData,
    };
}

function invalidateUSSChildren(path) {
    return {
        type: INVALIDATE_USS_TREE_CHILDREN,
        USSPath: path,
    };
}

export function resetUSSChildren() {
    return {
        type: RESET_USS_TREE_CHILDREN,
    };
}

export function setUSSPath(path) {
    return {
        type: SET_USS_TREE_PATH,
        USSPath: path,
    };
}

function requestNewResource(path) {
    return {
        type: REQUEST_NEW_RESOURCE,
        USSPath: path,
    };
}

function receiveNewDirectory(path) {
    return {
        type: RECEIVE_NEW_DIRECTORY,
        USSPath: path,
    };
}

function receiveNewFile(path) {
    return {
        type: RECEIVE_NEW_FILE,
        USSPath: path,
    };
}

function receiveNewResource(path, type) {
    if (type === 'DIRECTORY') {
        return receiveNewDirectory(path);
    }
    return receiveNewFile(path);
}

function invalidateReceiveResource(path) {
    return {
        type: INVALIDATE_NEW_RESOURCE,
        path,
    };
}

function requestDownload(path) {
    return {
        type: REQUEST_DOWNLOAD_RESOURCE,
        path,
    };
}

function receiveDownload(path) {
    return {
        type: RECEIVE_DOWNLOAD_RESOURCE,
        path,
    };
}

function invalidateDownload(path) {
    return {
        type: INVALIDATE_DOWNLOAD_RESOURCE,
        path,
    };
}

function requestDelete(path) {
    return {
        type: REQUEST_DELETE_RESOURCE,
        path,
    };
}

function receiveDelete(path) {
    return {
        type: RECEIVE_DELETE_RESOURCE,
        path,
    };
}

function invalidateDelete(path) {
    return {
        type: INVALIDATE_DELETE_RESOURCE,
        path,
    };
}

export function fetchUSSTreeChildren(path) {
    return dispatch => {
        dispatch(requestUSSChildren(path));
        let endpoint = `restfiles/fs?path=${path}`;
        if (path.substr(path.length - 1) === '/' && path !== '/') {
            endpoint = endpoint.substr(0, endpoint.length - 1);
        }
        return atlasGet(endpoint, { credentials: 'include' })
            .then(response => {
                return dispatch(checkForValidationFailure(response));
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return response.json().then(e => { throw Error(e.message); });
            }).then(json => {
                return dispatch(receiveUSSChildren(path, json.items));
            })
            .catch(e => {
                dispatch(constructAndPushMessage(`${USS_FETCH_CHILDREN_FAIL_MESSAGE} ${path} : ${e.message}`));
                return dispatch(invalidateUSSChildren(path));
            });
    };
}

export function createUSSResource(path, type) {
    return dispatch => {
        dispatch(requestNewResource(path));
        const endpoint = `restfiles/fs/${path && path.indexOf('/') === 0 ? path.substring(1) : path}`;
        const body = `{"type": "${type}", "permissions": "RWXRWXR--"}`;
        return atlasPost(endpoint, body)
            .then(response => {
                return dispatch(checkForValidationFailure(response));
            })
            .then(response => {
                if (response.ok) {
                    dispatch(constructAndPushMessage(`${USS_CREATE_SUCCESS_MESSAGE} ${path}`));
                    return dispatch(receiveNewResource(path, type));
                }
                return response.json().then(e => { throw Error(e.message); });
            }).catch(e => {
                dispatch(constructAndPushMessage(`${USS_CREATE_FAIL_MESSAGE} ${path} : ${e.message}`));
                return dispatch(invalidateReceiveResource(path));
            });
    };
}

export function createAndDownloadElement(blob, fileName) {
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = fileName;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}

export function downloadUSSResource(path) {
    return dispatch => {
        dispatch(requestDownload(path));
        const endpoint = `restfiles/fs/${path && path.indexOf('/') === 0 ? path.substring(1) : path}`;
        const fileName = endpoint.substring(endpoint.lastIndexOf('/') + 1);
        return atlasGet(endpoint, { credentials: 'include' })
            .then(response => {
                return dispatch(checkForValidationFailure(response));
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                return response.text().then(e => { throw Error(JSON.parse(e).message); });
            })
            .then(text => {
                const blob = new Blob([text], { type: 'text/plain' });
                createAndDownloadElement(blob, fileName);
                dispatch(receiveDownload(path));
            })
            .catch(e => {
                dispatch(constructAndPushMessage(`${USS_DOWNLOAD_FAIL_MESSAGE} ${path} : ${e.message}`));
                return dispatch(invalidateDownload(path));
            });
    };
}

export function deleteUSSResource(path) {
    return dispatch => {
        dispatch(requestDelete(path));
        const endpoint = `restfiles/fs/${path && path.indexOf('/') === 0 ? path.substring(1) : path}`;
        return atlasDelete(endpoint, {
            credentials: 'include',
            method: 'DELETE',
        })
            .then(response => {
                return dispatch(checkForValidationFailure(response));
            })
            .then(response => {
                if (response.ok) {
                    dispatch(receiveDelete(path));
                    dispatch(constructAndPushMessage(`${USS_DELETE_SUCCESS_MESSAGE} ${path}`));
                    return dispatch(invalidateDelete(path));
                }
                return response.json().then(e => { throw Error(e.details); });
            }).catch(e => {
                dispatch(constructAndPushMessage(`${USS_DELETE_FAIL_MESSAGE} ${path} : ${e.message}`));
                return dispatch(invalidateDelete(path));
            });
    };
}
