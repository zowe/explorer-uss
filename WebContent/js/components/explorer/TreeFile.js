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
import { ContextMenuTrigger } from 'react-contextmenu';
import DescriptionIcon from 'material-ui/svg-icons/action/description';
import { fetchUSSFile } from '../../actions/editor';
import USSFileMenu from '../../components/contextMenus/USSFileMenu';
import { getPathToResource } from '../../utilities/USSUtilities';

/**
 * TreeFile can represent either a Unix file or a Dataset (not a dataset member)
 * If its representing a Dataset it can have children (members)
 */
export default class TreeFile extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
    }

    /**
     * TODO:: change so we dont do a fetch every time we toggle the node, we should use the previous data
     */
    handleToggle() {
        return (() => {
            const { path, dispatch } = this.props;
            dispatch(fetchUSSFile(path));
        });
    }

    renderFile() {
        const { childId } = this.props;
        const iconStyle = { paddingRight: 5 };
        return (
            <div style={{ whiteSpace: 'nowrap' }}>
                <DescriptionIcon style={iconStyle} />
                <span className="node-label" onClick={this.handleToggle()} >{childId}</span>
            </div>);
    }

    renderContentMenu() {
        const { path, handleCreateDirectory, handleCreateFile, handleDelete, handleOrionEdit, isTreeInDialog } = this.props;
        if (!isTreeInDialog()) {
            return (
                <USSFileMenu
                    childId={path}
                    handleCreateDirectory={() => { handleCreateDirectory(getPathToResource(path)); }}
                    handleCreateFile={() => { handleCreateFile(getPathToResource(path)); }}
                    handleDelete={() => { handleDelete(path); }}
                    handleOrionEdit={() => { handleOrionEdit(path); }}
                />
            );
        }
        return null;
    }

    render() {
        const { path } = this.props;
        return (
            <li>
                <div className="node">
                    <div className="node-label">
                        <ContextMenuTrigger id={path}>
                            {this.renderFile()}
                        </ContextMenuTrigger>
                    </div>
                    {this.renderContentMenu()}
                </div>
            </li>
        );
    }
}

TreeFile.propTypes = {
    childId: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    handleCreateDirectory: PropTypes.func.isRequired,
    handleCreateFile: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleOrionEdit: PropTypes.func.isRequired,
    isTreeInDialog: PropTypes.func.isRequired,
};
