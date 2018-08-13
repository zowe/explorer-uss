/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018
 */

import { Map } from 'immutable';

export const baseEditor = Map({
    file: null,
    content: null,
    checksum: null,
});

export const file = '/u/tester/txt';

export const content = 'some sample content';

export const checksum = 'asfugiabdfpoasidhfuasdpfohausd';

export const editorReceivedContent = Map({
    file,
    content,
    checksum,
});

export const newChecksum = '1234567890543456789asfgasdf';

export const editorNewChecksum = Map({
    file,
    content,
    checksum: newChecksum,
});

export const newContent = 'some new sample content';

export const editorNewContent = Map({
    file,
    content: newContent,
    checksum,
});

export const editorContentNullChecksum = Map({
    file,
    content,
    checksum: null,
});
