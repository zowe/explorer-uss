/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2020
 */
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { ContextMenuTrigger } from 'react-contextmenu';
import OpenFolderIcon from '@material-ui/icons/FolderOpen';
import ClosedFolderIcon from '@material-ui/icons/Folder';
import { fetchDirectoryChildren, toggleDirectory } from '../../actions/treeDirectories';
import { setUSSPath, resetUSSChildren } from '../../actions/treeUSS';
import TreeFile from './TreeFile';
import USSDirectoryMenu from '../contextMenus/USSDirectoryMenu';
import { getPathToResource, sortChildren } from '../../utilities/USSUtilities';

export class TreeDirectory extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.hasChildren = this.hasChildren.bind(this);
        this.renderChildren = this.renderChildren.bind(this);
        this.isDirectoryToggled = this.isDirectoryToggled.bind(this);
        this.pathMatchesStartOfElement = this.pathMatchesStartOfElement.bind(this);
    }

    handleToggle() {
        const { path, dispatch } = this.props;
        const isToggled = this.isDirectoryToggled();
        if (!isToggled) {
            dispatch(fetchDirectoryChildren(path));
        } else {
            dispatch(toggleDirectory(path, !isToggled));
        }
    }

    handleDirectorySelect() {
        const { path, dispatch } = this.props;
        dispatch(resetUSSChildren());
        dispatch(setUSSPath(path));
    }

    getToggleIcon() {
        const isToggled = this.isDirectoryToggled();
        if (isToggled) {
            return (<OpenFolderIcon className="node-icon" />);
        }
        return (<ClosedFolderIcon className="node-icon" />);
    }

    isDirectoryToggled() {
        const { children, path } = this.props;
        if (children && children.size > 0) {
            if (children.get(path)) {
                return children.get(path).get('isToggled');
            }
        }
        return false;
    }

    pathMatchesStartOfElement(child) {
        const { path } = this.props;
        return path === child.substring(0, child.lastIndexOf('/'));
    }

    hasChildren() {
        const { children } = this.props;
        if (children && children.size > 0) {
            return children.keySeq().toArray().some(this.pathMatchesStartOfElement);
        }
        return false;
    }

    /**
     * Take the map of children, check if it belongs in the currenttly selected directory,
     * create the directories first then the files, return the components in an array
     */
    renderChildren() {
        const {
            path, children, dispatch, handleCreateDirectory, handleCreateFile, handleDownload, handleDelete, handleOrionEdit, inDialog,
        } = this.props;
        const childComponents = [];

        sortChildren(children.keySeq().toArray().filter(this.pathMatchesStartOfElement))
            .forEach(child => {
                const type = children.get(child).get('type');
                if (type === 'DIRECTORY') {
                    childComponents.push(<ConnectedTreeDirectory
                        childId={child.substring(child.lastIndexOf('/') + 1)}
                        key={child}
                        path={`${path}/${child.substring(child.lastIndexOf('/') + 1)}`}
                        handleCreateDirectory={handleCreateDirectory}
                        handleCreateFile={handleCreateFile}
                        handleDownload={handleDownload}
                        handleDelete={handleDelete}
                        handleOrionEdit={handleOrionEdit}
                        inDialog={inDialog}
                    />);
                } else if (type === 'FILE') {
                    childComponents.push(<TreeFile
                        childId={child.substring(child.lastIndexOf('/') + 1)}
                        key={child}
                        path={`${path}/${child.substring(child.lastIndexOf('/') + 1)}`}
                        dispatch={dispatch}
                        handleCreateDirectory={handleCreateDirectory}
                        handleCreateFile={handleCreateFile}
                        handleDownload={handleDownload}
                        handleDelete={handleDelete}
                        handleOrionEdit={handleOrionEdit}
                        inDialog={inDialog}
                    />);
                }
            });
        return childComponents;
    }

    renderContentMenu() {
        const {
            path, handleCreateDirectory, handleCreateFile, handleDelete, inDialog,
        } = this.props;
        if (!inDialog) {
            return (
                <USSDirectoryMenu
                    childId={path}
                    handleCreateDirectory={() => { handleCreateDirectory(getPathToResource(path)); }}
                    handleCreateFile={() => { handleCreateFile(getPathToResource(path)); }}
                    handleDelete={() => { handleDelete(path); }}
                />
            );
        }
        return null;
    }

    render() {
        const { childId, path } = this.props;
        return (
            <li>
                <div className="node">
                    <ContextMenuTrigger id={path}>
                        <div className="node-label" onClick={() => { this.handleToggle(); }} onDoubleClick={() => { this.handleDirectorySelect(); }}>
                            {this.getToggleIcon()}
                            {childId}
                        </div>
                    </ContextMenuTrigger>
                    {this.renderContentMenu()}
                    <ul>
                        {this.hasChildren() && this.isDirectoryToggled() ? this.renderChildren() : null}
                    </ul>
                </div>
            </li>
        );
    }
}

TreeDirectory.propTypes = {
    childId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    children: PropTypes.instanceOf(Map),
    handleCreateDirectory: PropTypes.func.isRequired,
    handleCreateFile: PropTypes.func.isRequired,
    handleDownload: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleOrionEdit: PropTypes.func.isRequired,
    inDialog: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const treeDirectoriesRoot = state.get('treeDirectories');
    const treeUSSRoot = state.get('treeUSS');
    return {
        children: treeDirectoriesRoot.get('children'),
        isToggled: treeDirectoriesRoot.get('isToggled'),
        USSPath: treeUSSRoot.get('USSPath'),
    };
}

const ConnectedTreeDirectory = connect(mapStateToProps)(TreeDirectory);
export default ConnectedTreeDirectory;
