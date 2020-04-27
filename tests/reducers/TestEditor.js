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
import { Map } from 'immutable';
import editor from '../../WebContent/js/reducers/editor';
import * as editorActions from '../../WebContent/js/actions/editor';
import * as editorResources from '../testResources/reducers/editor';

describe('Reducer: editor', () => {
    it('Should return the initial state', () => {
        expect(editor(undefined, {})).toEqual(editorResources.baseEditor);
    });

    it('Should handle RECEIVE_CONTENT', () => {
        const action = {
            type: editorActions.RECEIVE_CONTENT,
            resource: editorResources.file,
            content: editorResources.content,
            checksum: editorResources.checksum,
        };
        expect(editor(editorResources.baseEditor, action)).toEqual(editorResources.editorReceivedContent);
    });

    it('Should handle INVALIDATE_CONTENT', () => {
        const action = { type: editorActions.INVALIDATE_CONTENT };
        expect(editor(editorResources.editorReceivedContent, action)).toEqual(editorResources.baseEditor);
    });

    it('Should handle REQUEST_SAVE', () => {
        const action = {
            type: editorActions.REQUEST_SAVE,
            resource: editorResources.file,
        };
        expect(editor(editorResources.editorReceivedContent, action)).toEqual(editorResources.editorReceivedContent);
    });

    it('Should handle REQUEST_CHECKSUM', () => {
        const action = {
            type: editorActions.REQUEST_CHECKSUM,
            resource: editorResources.file,
        };
        expect(editor(editorResources.editorReceivedContent, action)).toEqual(editorResources.editorReceivedContent);
    });

    it('Should handle UPDATE_EDITOR_CONTENT', () => {
        const action = {
            type: editorActions.UPDATE_EDITOR_CONTENT,
            content: editorResources.newContent,
        };
        expect(editor(editorResources.editorReceivedContent, action)).toEqual(editorResources.editorNewContent);
    });

    it('Should handle UPDATE_EDITOR_CHECKSUM', () => {
        const action = {
            type: editorActions.UPDATE_EDITOR_CHECKSUM,
            checksum: editorResources.newChecksum,
        };
        expect(editor(editorResources.editorReceivedContent, action)).toEqual(editorResources.editorNewChecksum);
    });

    it('Should handle INVALIDATE_CHECKSUM', () => {
        const action = { type: editorActions.INVALIDATE_CHECKSUM };
        expect(editor(editorResources.editorReceivedContent, action)).toEqual(editorResources.editorContentNullChecksum);
    });

    it('Should handle INVALIDATE_SAVE', () => {
        const action = {
            type: editorActions.INVALIDATE_SAVE,
            message: new Map({
                messageType: editorActions.EDITOR_MESSAGE_TYPE,
                message: `${editorActions.SAVE_FAILURE_MESSAGE}: Precondition failed`,
            }),
        };
        expect(editor(editorResources.editorReceivedContent, action)).toEqual(editorResources.editorContentNullChecksum);
    });
});
