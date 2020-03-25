/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2020
 */

let host = 'tvt5003.svl.ibm.com:9554';
if (typeof location !== 'undefined') {
    const hostname = location.hostname;
    if (hostname !== 'localhost') {
        host = location.host;
    }
}
export const LOCAL_DEV_SERVER = host;

export function whichServer() {
    let server = LOCAL_DEV_SERVER;
    if (location.hostname === 'tester.test.com') {
        server = 'tester.test.com:7443';
    }
    return `${server}/api/v1`;
}

function atlasAction(endpoint, content, fetchParams) {
    return fetch(`https://${whichServer()}/${endpoint}`, { ...fetchParams, ...content });
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
    return fetch(`https://${whichServer()}/${endpoint}`, {
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
    return fetch(`https://${whichServer()}/${endpoint}`, {
        method: 'PUT',
        body,
        headers,
        credentials: 'include',
    });
}

