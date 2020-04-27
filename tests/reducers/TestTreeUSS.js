/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2019
 */

import expect from 'expect';
import tree from '../../WebContent/js/reducers/treeUSS';
import * as treeActions from '../../WebContent/js/actions/treeUSS';
import * as treeResources from '../testResources/reducers/treeUSS';

describe('Reducer: treeUSS', () => {
    it('Should return the INITIAL_TREE_STATE', () => {
        expect(tree(undefined, {})).toEqual(treeResources.baseTree);
    });

    it('Should handle SET_USS_TREE_PATH and update the path for USS', () => {
        const action = {
            type: treeActions.SET_USS_TREE_PATH,
            USSPath: treeResources.USSPathSetTree.get('USSPath'),
        };
        expect(tree(treeResources.baseTree, action)).toEqual(treeResources.USSPathSetTree);
    });

    it('Should handle REQUEST_USS_TREE_CHILDREN and set isFetching to true', () => {
        const action = {
            type: treeActions.REQUEST_USS_TREE_CHILDREN,
        };
        expect(tree(treeResources.USSPathSetTree, action)).toEqual(treeResources.requestedChildrenTree);
    });

    it('Should handle RECEIVE_USS_TREE_CHILDREN, process child data isToggled to true and isFetching to false', () => {
        const action = {
            type: treeActions.RECEIVE_USS_TREE_CHILDREN,
            childData: treeResources.USSChildData,
        };
        expect(tree(treeResources.USSPathSetTree, action)).toEqual(treeResources.receivedUSSChildrenTree);
    });

    it('Should handle RESET_USS_TREE_CHILDREN and return to the initial state from DS', () => {
        const action = {
            type: treeActions.RESET_USS_TREE_CHILDREN,
        };
        expect(tree(treeResources.receivedUSSChildrenTree, action)).toEqual(treeResources.restUSSChildren);
    });
});
