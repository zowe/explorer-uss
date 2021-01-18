/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2019
 */

import PropTypes from 'prop-types';
import React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';

export const MENU_NEW_DIRECTORY = <div>New <u>D</u>irectory</div>;
export const MENU_NEW_FILE = <div><u>N</u>ew File</div>;
export const MENU_OPEN = <div><u>O</u>pen</div>;
export const MENU_DELETE = <div><u>Del</u>ete</div>;

const USSFileMenu = props => {
    const { childId, handleCreateDirectory, handleCreateFile, handleDelete, handleOrionEdit, onHide, onShow } = props;
    return (
        <ContextMenu id={childId} onShow={onShow} onHide={onHide}>
            <MenuItem onClick={path => { handleCreateDirectory(path); }}>
                {MENU_NEW_DIRECTORY}
            </MenuItem>
            <MenuItem onClick={handleCreateFile}>
                {MENU_NEW_FILE}
            </MenuItem>
            <MenuItem onClick={handleOrionEdit}>
                {MENU_OPEN}
            </MenuItem>
            <MenuItem onClick={handleDelete}>
                {MENU_DELETE}
            </MenuItem>
        </ContextMenu>
    );
};

export default USSFileMenu;

USSFileMenu.propTypes = {
    childId: PropTypes.string.isRequired,
    handleCreateDirectory: PropTypes.func.isRequired,
    handleCreateFile: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleOrionEdit: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
};
