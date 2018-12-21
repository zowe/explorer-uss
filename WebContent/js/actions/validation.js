/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2018
 */

import { atlasGet } from '../utilities/urlUtils';

export const REQUEST_VALIDATION = 'REQUEST_VALIDATION';
export const RECEIVE_VALIDATION = 'RECEIVE_VALIDATION';
export const INVALIDATE_VALIDATION = 'INVALIDATE_VALIDATION';
export const SET_SERVER = 'SET_SERVER';

function requestValidation() {
    return {
        type: REQUEST_VALIDATION,
    };
}

function receiveValidation(username) {
    return {
        type: RECEIVE_VALIDATION,
        username,
    };
}

function invalidateValidation() {
    return {
        type: INVALIDATE_VALIDATION,
    };
}

export function validateUser() {
    return dispatch => {
        dispatch(requestValidation());
        return atlasGet('zosmf/restjobs/jobs')
            .then(response => {
                return response.json();
            })
            .then(json => {
                if (json.length > 0) {
                    return dispatch(receiveValidation(json[0].owner));
                }
                return dispatch(receiveValidation(''));
            })
            .catch(() => {
                return dispatch(invalidateValidation());
            });
    };
}
