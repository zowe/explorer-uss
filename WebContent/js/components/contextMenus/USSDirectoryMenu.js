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
import { MENU_NEW_DIRECTORY, MENU_NEW_FILE, MENU_DELETE } from './USSFileMenu';

const USSDirectoryMenu = props => {
    const { childId, handleCreateDirectory, handleCreateFile, handleDelete, onHide, onShow } = props;
    return (
        <ContextMenu id={childId} onShow={onShow} onHide={onHide}>
            <MenuItem onClick={path => { handleCreateDirectory(path); }}>
                {MENU_NEW_DIRECTORY}
            </MenuItem>
            <MenuItem onClick={handleCreateFile}>
                {MENU_NEW_FILE}
            </MenuItem>
            <MenuItem onClick={handleDelete}>
                {MENU_DELETE}
            </MenuItem>
        </ContextMenu>
    );
};

export default USSDirectoryMenu;

USSDirectoryMenu.propTypes = {
    childId: PropTypes.string.isRequired,
    handleCreateDirectory: PropTypes.func.isRequired,
    handleCreateFile: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
};
