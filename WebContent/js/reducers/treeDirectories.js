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
    REQUEST_DIRECTORY_CHILDREN,
    RECEIVE_DIRECTORY_CHILDREN,
    INVALIDATE_DIRECTORY_CHILDREN,
    TOGGLE_DIRECTORY,
    RESET_DIRECTORY_CHILDREN,
} from '../actions/treeDirectories';

const INITIAL_DIRECTORY_STATE = Map({
    children: Map({}),
    isFetching: false,
});

function getChildrenFromJson(path, json) {
    let newDir = Map({});
    json.forEach(child => {
        let dirProps = Map({});
        /*
         * Do not include the . and ..
         */
        if (!['.', '..'].includes(child.name)) {
            if (child.mode) {
                if (child.mode.charAt(0) === 'd') {
                    dirProps = dirProps.set('type', 'DIRECTORY');
                } else {
                    dirProps = dirProps.set('type', 'FILE');
                }
            }
            dirProps = dirProps.set('isToggled', false);
            // if USSPath ends with slash '/' then remove '/'
            if (path.lastIndexOf('/') === path.length -1){
                newDir = newDir.set(`${path.substring(0, path.length - 1)}/${child.name}`, dirProps);
            } else {
                newDir = newDir.set(`${path}/${child.name}`, dirProps);
            }
        }
    });
    return newDir;
}

function updateDirectoryToggle(state, path, isToggled) {
    let child = Map({});
    child = child.set(path, state.get('children').get(path).set('isToggled', isToggled));
    return child;
}

export default function TreeDirectory(state = INITIAL_DIRECTORY_STATE, action) {
    switch (action.type) {
        case REQUEST_DIRECTORY_CHILDREN:
            return state.merge({
                isFetching: true,
            });
        case RECEIVE_DIRECTORY_CHILDREN: {
            if (action.children.length === 1 && state.get('children').get(`${action.path}/${action.children[0].name}`)) {
                return state;
            }
            return state.mergeDeep({
                children: getChildrenFromJson(action.path, action.children),
                isFetching: false,
            });
        }
        case INVALIDATE_DIRECTORY_CHILDREN:
            return state.merge({
                isFetching: false,
            });
        case TOGGLE_DIRECTORY:
            return state.mergeDeep({
                children: updateDirectoryToggle(state, action.path, action.toggled),
            });
        case RESET_DIRECTORY_CHILDREN: {
            return state.set('children', Map({}));
        }
        default:
            return state;
    }
}
