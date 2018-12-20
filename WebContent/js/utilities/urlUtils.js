/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018
 */

let host = 'winmvs3b.hursley.ibm.com:23956';
if (typeof location !== 'undefined') {
    const hostname = location.hostname;
    if (hostname !== 'localhost') {
        host = location.host;
    }
}
export const LOCAL_DEV_SERVER = host;

export function encodeURLComponent(URL) {
    return encodeURIComponent(URL);
}

function whichServer() {
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
        headers: { 'X-CSRF-ZOSMF-HEADER': '*' },
        credentials: 'include' };
    return atlasAction(endpoint, content, fetchParams);
}
export function atlasDelete(endpoint, content) {
    const fetchParams = {
        method: 'DELETE',
        headers: { 'X-CSRF-ZOSMF-HEADER': '*' },
        credentials: 'include' };
    return atlasAction(endpoint, content, fetchParams);
}
export function atlasPost(endpoint, body) {
    return fetch(`https://${whichServer()}/${endpoint}`, {
        method: 'POST',
        body,
        headers: { 'X-CSRF-ZOSMF-HEADER': '*', 'Content-Type': 'application/json' },
        credentials: 'include' });
}

export function atlasPut(endpoint, body, checksum) {
    const header = { 'X-CSRF-ZOSMF-HEADER': '*', 'Content-Type': 'text/plain' };
    if (checksum) {
        header['If-Match'] = checksum;
    }
    return fetch(`https://${whichServer()}/${endpoint}`, {
        method: 'PUT',
        body,
        headers: header,
        credentials: 'include' });
}

export function atlasChtag(endpoint, body) {
    const header = { 'X-CSRF-ZOSMF-HEADER': '*', 'Content-Type': 'text/plain' };
    return fetch(`https://${whichServer()}/${endpoint}`, {
        method: 'PUT',
        body,
        headers: header,
        credentials: 'include' });
}

export function linkPath(path, item) {
    let endpoint = `zosmf/restfiles/fs/${path && path.indexOf('/') === 0 ? path.substring(1) : path}`;
    endpoint = endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint;
    if (item === '.') {
        return `https://${whichServer()}${endpoint}`;
    }
    const relative = item && item.indexOf('/') === 0 ? item.substring(1) : item;
    return `https://${whichServer()}/${endpoint}/${relative}`;
}

export function augmentJson(json, path) {
    for (let i = json.items.length - 1; i > -1; i--) {
        const item = json.items[i];
        if (item.name === '..') {
            json.items.splice(i, 1);
        } else if (item.name === '.') {
            json.items.splice(i, 1);
        } else {
            item.type = item.mode.startsWith('d') ? 'directory' : 'file'; // TODO addFileAttributes(itemJson, builder)
            item.link = linkPath(path, item.name);
        }
    }
    return json;
}
