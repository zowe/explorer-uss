/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2018
 */

import PropTypes from 'prop-types';
import React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';

const USSDirectoryMenu = props => {
    const { childId, handleCreateDirectory, handleCreateFile, handleDelete } = props;
    return (
        <ContextMenu id={childId}>
            <MenuItem onClick={path => { handleCreateDirectory(path); }}>
                New Directory
            </MenuItem>
            <MenuItem onClick={handleCreateFile}>
                New File
            </MenuItem>
            <MenuItem onClick={handleDelete}>
                Delete
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
};
