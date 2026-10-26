// @ts-nocheck
/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2020
 */

export function encodeURLComponent(URL: string) {
    return encodeURIComponent(URL);
}

function atlasAction(endpoint: string, content, fetchParams) {
    return fetch(`https://${global.location.host}/ibmzosmf/api/v1/zosmf/${endpoint}`, { ...fetchParams, ...content });
}

export function atlasGet(endpoint: string, content) {
    const fetchParams = {
        method: 'GET',
        credentials: 'include',
        headers: { 'X-CSRF-ZOSMF-HEADER': '*' },
    };
    return atlasAction(endpoint, content, fetchParams);
}

export function atlasDelete(endpoint: string, content) {
    const fetchParams = {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'X-IBM-Option': 'recursive', 'X-CSRF-ZOSMF-HEADER': '*' },
    };
    return atlasAction(endpoint, content, fetchParams);
}

export function atlasPost(endpoint: string, body) {
    return atlasAction(endpoint, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'text/plain', 'X-CSRF-ZOSMF-HEADER': '*' },
        credentials: 'include',
    });
}

export function atlasPut(endpoint: string, body: string, checksum) {
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
