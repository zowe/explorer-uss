/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2020
 */

import { atlasGet } from '../utilities/urlUtils';
import { checkForValidationFailure } from './validation';
import { constructAndPushMessage } from './snackbarNotifications';

export const REQUEST_DIRECTORY_CHILDREN = 'REQUEST_DIRECTORY_CHILDREN';
export const RECEIVE_DIRECTORY_CHILDREN = 'RECEIVE_DIRECTORY_CHILDREN';
export const INVALIDATE_DIRECTORY_CHILDREN = 'INVALIDATE_DIRECTORY_CHILDREN';
export const TOGGLE_DIRECTORY = 'TOGGLE_DIRECTORY';
export const RESET_DIRECTORY_CHILDREN = 'RESET_DIRECTORY_CHILDREN';

const USS_FETCH_CHILDREN_FAIL_MESSAGE = 'Fetch children failed for';

function requestDirectoryChildren(directory) {
    return {
        type: REQUEST_DIRECTORY_CHILDREN,
        directory,
    };
}

function receiveDirectoryChildren(path, children) {
    return {
        type: RECEIVE_DIRECTORY_CHILDREN,
        path,
        children,
    };
}

function invalidateChildren() {
    return {
        type: INVALIDATE_DIRECTORY_CHILDREN,
    };
}

export function toggleDirectory(path, toggled) {
    return {
        type: TOGGLE_DIRECTORY,
        path,
        toggled,
    };
}

export function resetDirectoryChildren(path) {
    return {
        type: RESET_DIRECTORY_CHILDREN,
        path,
    };
}

/**
 * When Tree component renders the first level of directories it fetches the data in the Tree actions and
 * stores via the Tree reducer, we need also need to be able to add them in here to track them
 */
export function addTreeDirectory(path, child) {
    const dir = [{ name: child, type: 'directory' }];
    return dispatch => {
        dispatch(receiveDirectoryChildren(path, dir));
    };
}

export function fetchDirectoryChildren(path) {
    const endpoint = `unixfiles?path=${path}`;
    return dispatch => {
        dispatch(requestDirectoryChildren(path));
        return atlasGet(endpoint, { credentials: 'include' })
            .then(response => {
                return dispatch(checkForValidationFailure(response));
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return response.json().then(e => { throw Error(e.message); });
            })
            .then(json => {
                dispatch(receiveDirectoryChildren(path, json.children));
                dispatch(toggleDirectory(path, true));
            })
            .catch(e => {
                dispatch(constructAndPushMessage(`${USS_FETCH_CHILDREN_FAIL_MESSAGE} ${path} : ${e.message}`));
                dispatch(invalidateChildren());
            });
    };
}
