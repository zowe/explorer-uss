/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2020
 */

import { Map } from 'immutable';
import {
    REQUEST_USS_TREE_CHILDREN,
    RECEIVE_USS_TREE_CHILDREN,
    SET_USS_TREE_PATH,
    TOGGLE_USS_TREE,
    RESET_USS_TREE_CHILDREN,
    RECEIVE_NEW_DIRECTORY,
    RECEIVE_NEW_FILE,
    RECEIVE_DELETE_RESOURCE,
    INVALIDATE_USS_TREE_CHILDREN } from '../actions/treeUSS';
import { getResourceFromPath } from '../utilities/USSUtilities';

export const ROOT_TREE_ID = 'treeUSS';
export const INITIAL_TREE_STATE = Map({
    id: ROOT_TREE_ID,
    USSChildren: Map({}),
    isFetching: false,
    USSPath: '',
});

function getUSSChildrenFromJSON(childData) {
    let children = Map({});
    childData.forEach(child => {
        children = children.set(child.name, child.type);
    });
    return children;
}

export default function treeUSS(state = INITIAL_TREE_STATE, action) {
    switch (action.type) {
        case SET_USS_TREE_PATH:
            return state.set('USSPath', action.USSPath);
        case TOGGLE_USS_TREE:
            return state.set('isToggled', action.isToggled);
        case REQUEST_USS_TREE_CHILDREN:
            return state.set('isFetching', true);
        case RECEIVE_USS_TREE_CHILDREN: {
            const children = getUSSChildrenFromJSON(action.childData);
            return state.mergeDeep({
                isFetching: false,
                USSChildren: children,
            });
        }
        case INVALIDATE_USS_TREE_CHILDREN:
            return state.set('isFetching', false);
        case RECEIVE_NEW_DIRECTORY: {
            let child = Map({});
            child = child.set(`${getResourceFromPath(action.USSPath)}`, 'DIRECTORY');
            return state.mergeDeep({
                USSChildren: child,
            });
        }
        case RECEIVE_NEW_FILE: {
            let child = Map({});
            child = child.set(`${getResourceFromPath(action.USSPath)}`, 'FILE');
            return state.mergeDeep({
                USSChildren: child,
            });
        }
        case RESET_USS_TREE_CHILDREN:
            return state.set('USSChildren', Map({}));
        case RECEIVE_DELETE_RESOURCE: {
            const pathToResource = `${getResourceFromPath(action.path)}`;
            if (state.get('USSChildren').has(pathToResource)) {
                return state.set('USSChildren', state.get('USSChildren').remove(pathToResource));
            }
            return state;
        }
        default:
            return state;
    }
}
