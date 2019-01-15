/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2019
 */

import { Map } from 'immutable';
import {
    UPDATE_EDITOR_CHECKSUM,
    UPDATE_EDITOR_CONTENT,
    INVALIDATE_CHECKSUM,
    INVALIDATE_SAVE,
    REQUEST_SAVE,
    REQUEST_CHECKSUM,
    RECEIVE_CONTENT,
    INVALIDATE_CONTENT,
} from '../actions/editor';

const INITIAL_EDITOR_STATE = Map({
    file: null,
    content: null,
    checksum: null,
});

export default function editor(state = INITIAL_EDITOR_STATE, action) {
    switch (action.type) {
        case RECEIVE_CONTENT:
            return state.merge({
                file: action.resource,
                content: action.content,
                checksum: action.checksum,
            });
        case INVALIDATE_CONTENT:
            return state.merge({
                file: null,
                content: null,
                checksum: null,
            });
        case REQUEST_SAVE:
            return state.merge({
                file: action.resource,
            });
        case REQUEST_CHECKSUM:
            return state.merge({
                file: action.resource,
            });
        case UPDATE_EDITOR_CONTENT:
            return state.merge({
                content: action.content,
            });
        case UPDATE_EDITOR_CHECKSUM:
            return state.merge({
                checksum: action.checksum,
            });
        case INVALIDATE_CHECKSUM:
            return state.merge({
                checksum: null,
            });
        case INVALIDATE_SAVE:
            return state.merge({
                checksum: null,
            });
        default:
            return state;
    }
}
