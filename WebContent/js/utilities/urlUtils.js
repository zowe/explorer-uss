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
    let server = global.location.host;
    if (global.location.hostname === 'tester.test.com') {
        server = 'tester.test.com:7443';
    }
    return server;
}

// zosmf/
const ZOSMF_PREFIX_LENGTH = 6;

function atlasAction(endpoint, content, fetchParams) {
    // In v3, /ibmzosmf/api/v1 endpoint removes /zosmf part of a /zosmf URL, so string must be trimmed.
    const trimmedEndpoint = endpoint.substring(ZOSMF_PREFIX_LENGTH);

    return fetch(`https://${whichServer()}/ibmzosmf/api/v1/zosmf/${trimmedEndpoint}`, { ...fetchParams, ...content });
}

export function atlasGet(endpoint, content) {
    const fetchParams = {
        method: 'GET',
        credentials: 'include',
        headers: { 'X-CSRF-ZOSMF-HEADER': '*' },
    };
    return atlasAction(endpoint, content, fetchParams);
}

export function atlasDelete(endpoint, content) {
    const fetchParams = {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'X-IBM-Option': 'recursive', 'X-CSRF-ZOSMF-HEADER': '*' },
    };
    return atlasAction(endpoint, content, fetchParams);
}

export function atlasPost(endpoint, body) {
    return atlasAction(endpoint, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'text/plain', 'X-CSRF-ZOSMF-HEADER': '*' },
        credentials: 'include',
    });
}

export function atlasPut(endpoint, body, checksum) {
    const headers = { 'Content-Type': 'text/plain', 'X-CSRF-ZOSMF-HEADER': '*' };
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
