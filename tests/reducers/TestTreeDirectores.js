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
import treeDirectories from '../../WebContent/js/reducers/treeDirectories';
import * as treeDirectoriesActions from '../../WebContent/js/actions/treeDirectories';
import * as treeDirectoriesResources from '../testResources/reducers/treeDirectories';

describe('Reducer treeDirectories', () => {
    it('Should return the INITIAL_DIRECTORY_STATE', () => {
        expect(treeDirectories(undefined, {})).toEqual(treeDirectoriesResources.baseTreeDirectories);
    });

    it('Should handle REQUEST_DIRECTORY_CHILDREN and set isFetching to true', () => {
        const action = {
            type: treeDirectoriesActions.REQUEST_DIRECTORY_CHILDREN,
        };
        expect(treeDirectories(treeDirectoriesResources.baseTreeDirectories, action)).toEqual(treeDirectoriesResources.requestedTreeDirectories);
    });

    it('Should handle RECEIVE_DIRECTORY_CHILDREN, set isFetching to false and handle childData', () => {
        const action = {
            type: treeDirectoriesActions.RECEIVE_DIRECTORY_CHILDREN,
            children: treeDirectoriesResources.treeDirectoriesChildData,
            path: treeDirectoriesResources.treeDirectoriesPath,
        };
        expect(treeDirectories(treeDirectoriesResources.requestedTreeDirectories, action)).toEqual(treeDirectoriesResources.receivedTreeDirectories);
    });

    it('Should handle RECEIVE_DIRECTORY_CHILDREN, set isFetching to false and handle no childData', () => {
        const action = {
            type: treeDirectoriesActions.RECEIVE_DIRECTORY_CHILDREN,
            children: [],
            path: treeDirectoriesResources.treeDirectoriesPath,
        };
        expect(treeDirectories(treeDirectoriesResources.requestedTreeDirectories, action)).toEqual(treeDirectoriesResources.baseTreeDirectories);
    });

    it('Should handle RECEIVE_DIRECTORY_CHILDREN, set isFetching to false and handle childData with other children already', () => {
        const action = {
            type: treeDirectoriesActions.RECEIVE_DIRECTORY_CHILDREN,
            children: treeDirectoriesResources.treeDirectoriesChildData2,
            path: treeDirectoriesResources.treeDirectoriesPath2,
        };
        expect(treeDirectories(treeDirectoriesResources.receivedTreeDirectories, action)).toEqual(treeDirectoriesResources.receivedTreeDirectoriesWithExistingChildren);
    });

    it('Should handle INVALIDATE_DIRECTORY_CHILDREN, set is fetching back to false', () => {
        const action = {
            type: treeDirectoriesActions.INVALIDATE_DIRECTORY_CHILDREN,
        };
        expect(treeDirectories(treeDirectoriesResources.requestedTreeDirectories, action)).toEqual(treeDirectoriesResources.baseTreeDirectories);
    });

    it('Should handle TOGGLE_DIRECTORY and update the given directories toggled property to true', () => {
        const action = {
            type: treeDirectoriesActions.TOGGLE_DIRECTORY,
            path: treeDirectoriesResources.treeDirectoriesPath2,
            toggled: true,
        };
        expect(treeDirectories(treeDirectoriesResources.receivedTreeDirectories, action)).toEqual(treeDirectoriesResources.toggledReceivedTreeDirectories);
    });

    it('Should handle TOGGLE_DIRECTORY and update the given directories toggled property to false', () => {
        const action = {
            type: treeDirectoriesActions.TOGGLE_DIRECTORY,
            path: treeDirectoriesResources.treeDirectoriesPath2,
            toggled: false,
        };
        expect(treeDirectories(treeDirectoriesResources.toggledReceivedTreeDirectories, action)).toEqual(treeDirectoriesResources.receivedTreeDirectories);
    });
});
