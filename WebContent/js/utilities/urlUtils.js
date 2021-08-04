/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2020
 */

export function encodeURLComponent(URL) {
    return encodeURIComponent(URL);
}

export function whichServer() {
    let server = location.host;
    if (location.hostname === 'tester.test.com') {
        server = 'tester.test.com:7443';
    }
    return server;
}

function atlasAction(endpoint, content, fetchParams) {
    return fetch(`https://${whichServer()}/ibmzosmf/api/v1/zosmf/${endpoint}`, { ...fetchParams, ...content });
}

export function atlasGet(endpoint, content) {
    const fetchParams = {
        method: 'GET',
        credentials: 'include',
    };
    return atlasAction(endpoint, content, fetchParams);
}

export function atlasDelete(endpoint, content) {
    const fetchParams = {
        method: 'DELETE',
        credentials: 'include',
    };
    return atlasAction(endpoint, content, fetchParams);
}

export function atlasPost(endpoint, body) {
    return atlasAction(endpoint, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });
}

export function atlasPut(endpoint, body, checksum) {
    const headers = { 'Content-Type': 'application/json' };
    if (checksum) {
        headers['If-Match'] = checksum;
    }
    return atlasAction(endpoint, {
        method: 'PUT',
        body,
        headers,
        credentials: 'include',
    });
}

