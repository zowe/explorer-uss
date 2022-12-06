/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2019
 */
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */

import PropTypes from 'prop-types';
import React from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import ContentIcon from '@material-ui/icons/Description';
import { hideMenu } from 'react-contextmenu/modules/actions';
import { fetchUSSFile } from '../../actions/editor';
import USSFileMenu from '../contextMenus/USSFileMenu';
import { getPathToResource } from '../../utilities/USSUtilities';

/**
 * TreeFile can represent either a Unix file or a Dataset (not a dataset member)
 * If its representing a Dataset it can have children (members)
 */
export default class TreeFile extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state = {
            menuShortCuts: true,
            menuVisible: false,
        };
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

    handleKeyDown(e) {
        const {
            handleCreateFile, handleOrionEdit, handleCreateDirectory, handleDownload, handleDelete, path,
        } = this.props;
        if (e.metaKey || e.altKey || e.ctrlKey) {
            return;
        }
        if (this.state.menuShortCuts && this.state.menuVisible) {
            if (e.key.toLowerCase() === 'd') {
                handleCreateDirectory(getPathToResource(path));
                this.hideContextMenu();
            }
            if (e.key.toLowerCase() === 'n') {
                handleCreateFile(getPathToResource(path));
                this.hideContextMenu();
            }
            if (e.key.toLowerCase() === 'o') {
                handleOrionEdit(path);
                this.hideContextMenu();
            }
            if (e.key.toLowerCase() === 'w') {
                handleDownload(path);
                this.hideContextMenu();
            }
            if (e.key.toLowerCase() === 'delete') {
                handleDelete(path);
                this.hideContextMenu();
            }
        }
    }

    hideContextMenu() {
        hideMenu();
        this.setState({ menuVisible: false });
    }

    renderFile() {
        const { childId } = this.props;
        return (
            <div style={{ whiteSpace: 'nowrap' }}>
                <ContentIcon className="node-icon" />
                <span className="node-label" onClick={this.handleToggle()}>{childId}</span>
            </div>
        );
    }

    renderContentMenu() {
        const {
            path, handleCreateDirectory, handleCreateFile, handleDownload, handleDelete, handleOrionEdit, inDialog,
        } = this.props;
        if (!inDialog) {
            return (
                <USSFileMenu
                    childId={path}
                    handleCreateDirectory={() => { handleCreateDirectory(getPathToResource(path)); }}
                    handleCreateFile={() => { handleCreateFile(getPathToResource(path)); }}
                    handleDownload={() => { handleDownload(path); }}
                    handleDelete={() => { handleDelete(path); }}
                    handleOrionEdit={() => { handleOrionEdit(path); }}
                    onShow={() => { this.setState({ menuVisible: true }); }}
                    onHide={() => { this.setState({ menuVisible: false }); }}
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
                    <ContextMenuTrigger id={path}>
                        <div
                            className="node-label"
                            onKeyDown={this.handleKeyDown}
                            tabIndex="0" /* eslint-disable-line */ 
                        >
                            {this.renderFile()}
                        </div>
                    </ContextMenuTrigger>
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
    handleDownload: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleOrionEdit: PropTypes.func.isRequired,
    inDialog: PropTypes.bool.isRequired,
};
