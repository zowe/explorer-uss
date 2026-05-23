/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2019
 */

export function getPathToResource(path) {
    return path.lastIndexOf('/') === 0 ? '/' : path.substring(0, path.lastIndexOf('/'));
}

export function getResourceFromPath(path) {
    return path.substring(path.lastIndexOf('/') + 1);
}

export function sortChildren(children) {
    return children.sort((a, b) => {
        return a.toUpperCase() < b.toUpperCase() ? -1 : 1;
    });
}
