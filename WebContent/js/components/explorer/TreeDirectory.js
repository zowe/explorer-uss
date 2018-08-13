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
import { connect } from 'react-redux';
import { Map } from 'immutable';
import IconButton from 'material-ui/IconButton';
import { ContextMenuTrigger } from 'react-contextmenu';
import DownArrowIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import RightArrowIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { fetchDirectoryChildren, toggleDirectory } from '../../actions/treeDirectories';
import { setUSSPath, resetUSSChildren } from '../../actions/treeUSS';
import TreeFile from './TreeFile';
import USSDirectoryMenu from '../../components/contextMenus/USSDirectoryMenu';
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

    getToggleIcon() {
        const style = { padding: 0, height: 24, width: 24 };
        const isToggled = this.isDirectoryToggled();
        return (
            <IconButton onClick={this.handleToggle} style={style}>
                {isToggled ? <DownArrowIcon /> : <RightArrowIcon />}
            </IconButton>
        );
    }

    handleToggle() {
        const { path, dispatch } = this.props;
        const isToggled = this.isDirectoryToggled();
        return (() => {
            if (!isToggled) {
                dispatch(fetchDirectoryChildren(path));
            } else {
                dispatch(toggleDirectory(path, !isToggled));
            }
        });
    }

    handleDirectorySelect() {
        const { path, dispatch } = this.props;
        dispatch(resetUSSChildren());
        dispatch(setUSSPath(path));
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
        const { path, children, dispatch, handleCreateDirectory, handleCreateFile, handleDelete, handleOrionEdit, isTreeInDialog } = this.props;
        const childComponents = [];

        sortChildren(children.keySeq().toArray().filter(this.pathMatchesStartOfElement))
            .forEach(child => {
                const type = children.get(child).get('type');
                if (type === 'directory') {
                    childComponents.push(<ConnectedTreeDirectory
                        childId={child.substring(child.lastIndexOf('/') + 1)}
                        key={child}
                        path={`${path}/${child.substring(child.lastIndexOf('/') + 1)}`}
                        handleCreateDirectory={handleCreateDirectory}
                        handleCreateFile={handleCreateFile}
                        handleDelete={handleDelete}
                        handleOrionEdit={handleOrionEdit}
                        isTreeInDialog={isTreeInDialog}
                    />);
                } else if (type === 'file') {
                    childComponents.push(<TreeFile
                        childId={child.substring(child.lastIndexOf('/') + 1)}
                        key={child}
                        path={`${path}/${child.substring(child.lastIndexOf('/') + 1)}`}
                        dispatch={dispatch}
                        handleCreateDirectory={handleCreateDirectory}
                        handleCreateFile={handleCreateFile}
                        handleDelete={handleDelete}
                        handleOrionEdit={handleOrionEdit}
                        isTreeInDialog={isTreeInDialog}
                    />);
                }
            });
        return childComponents;
    }

    renderContentMenu() {
        const { path, handleCreateDirectory, handleCreateFile, handleDelete, isTreeInDialog } = this.props;
        if (!isTreeInDialog()) {
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
                    <div className="uss-node-label">
                        <span onClick={this.handleToggle()} >
                            {this.getToggleIcon()}
                        </span>
                        <ContextMenuTrigger id={path}>
                            <span onClick={() => { this.handleDirectorySelect(); }}>{childId}</span>
                        </ContextMenuTrigger>
                    </div>
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
    handleDelete: PropTypes.func.isRequired,
    handleOrionEdit: PropTypes.func.isRequired,
    isTreeInDialog: PropTypes.func.isRequired,
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
