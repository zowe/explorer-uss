/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2020
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import RefreshIcon from '../components/explorer/RefreshIcon';
import TreeFile from '../components/explorer/TreeFile';
import ConnectedTreeDirectory from '../components/explorer/TreeDirectory';
import { setUSSPath, fetchUSSTreeChildren, resetUSSChildren } from '../actions/treeUSS';
import { addTreeDirectory, resetDirectoryChildren } from '../actions/treeDirectories';
import { fetchUSSFile } from '../actions/editor';
import ConnectedCreateUSSResourceDialog from '../components/dialogs/USS/CreateUSSResourceDialog';
import DeleteUSSResourceDialog from '../components/dialogs/USS/DeleteUSSResourceDialog';
import FullHeightTree from './FullHeightTree';
import { getPathToResource, sortChildren } from '../utilities/USSUtilities';

const NO_DIALOG = 'NO_DIALOG';
const CREATE_DIRECTORY = 'CREATE_DIRECTORY';
const CREATE_FILE = 'CREATE_FILE';
const DELETE = 'DELETE';

export class USSTree extends React.Component {
    static isPathAtRoot(path) {
        return path.lastIndexOf('/') === 0;
    }

    constructor(props) {
        super(props);
        this.resetAndFetchChildren = this.resetAndFetchChildren.bind(this);
        this.handlePathChange = this.handlePathChange.bind(this);
        this.handleRefreshTree = this.handleRefreshTree.bind(this);
        this.renderUSSChild = this.renderUSSChild.bind(this);

        this.state = {
            timeout: 0,
            dialog: NO_DIALOG,
            selectedResource: undefined,
        };
    }

    componentWillMount() {
        const { dispatch, username, USSChildren } = this.props;
        if (USSChildren.isEmpty()) {
            let append = '';
            if (username.length > 0) {
                append = `/${username.toLowerCase()}`;
            }
            dispatch(setUSSPath(`/u${append}`));
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {
            dispatch, validated, username, USSPath, USSChildren,
        } = this.props;
        // Once we receive validation update the path, once we have set the path, fetch the children
        if (!validated) {
            let append = '';
            if (username.length > 0) {
                append = `/${username.toLowerCase()}`;
            }
            dispatch(setUSSPath(`/u${append}`));
        } else if (USSPath !== nextProps.USSPath) {
            this.handlePathUpdate(nextProps.USSPath);
        }
        if (USSChildren !== nextProps.USSChildren) {
            nextProps.USSChildren.keySeq().toArray().map(child => {
                return dispatch(addTreeDirectory(USSPath, child));
            });
        }
    }

    handlePathUpdate(path) {
        if (document.activeElement && document.activeElement.tagName && document.activeElement.tagName.toLowerCase() === 'input') {
            clearTimeout(this.state.timeout);
            this.state.timeout = setTimeout(() => {
                this.resetAndFetchChildren(path);
            }, 1500);
        } else {
            this.resetAndFetchChildren(path);
        }
    }

    handlePathChange(event) {
        const { dispatch } = this.props;
        dispatch(resetUSSChildren());
        dispatch(resetDirectoryChildren());
        dispatch(setUSSPath(event.target.value));
    }

    handleRefreshTree() {
        const { USSPath, dispatch } = this.props;
        dispatch(resetUSSChildren());
        dispatch(resetDirectoryChildren());
        dispatch(fetchUSSTreeChildren(USSPath));
    }

    dialogReturn = () => {
        this.setState({ dialog: NO_DIALOG });
    }

    handleCreateDirectory = path => {
        const { dispatch } = this.props;
        dispatch(setUSSPath(path));
        this.setState({ dialog: CREATE_DIRECTORY });
    }

    handleCreateFile = path => {
        const { dispatch } = this.props;
        dispatch(setUSSPath(path));
        this.setState({ dialog: CREATE_FILE });
    }

    handleDelete = path => {
        const { dispatch } = this.props;
        dispatch(setUSSPath(getPathToResource(path)));
        this.setState({ selectedResource: path });
        this.setState({ dialog: DELETE });
    }

    handleOrionEdit = path => {
        const { dispatch } = this.props;
        dispatch(fetchUSSFile(path));
    }

    handleUpOneDirectory = () => {
        const { dispatch, USSPath } = this.props;
        if (!USSTree.isPathAtRoot(USSPath)) {
            dispatch(setUSSPath(USSPath.substring(0, USSPath.lastIndexOf('/'))));
        } else if (USSPath.length >= 1) {
            dispatch(setUSSPath('/'));
        }
    }

    resetAndFetchChildren(path) {
        const { dispatch } = this.props;
        dispatch(resetUSSChildren());
        dispatch(fetchUSSTreeChildren(path));
    }

    renderUSSChild(child) {
        const {
            USSPath, USSChildren, dispatch, inDialog,
        } = this.props;
        if (USSChildren.get(child) === 'DIRECTORY') {
            return (
                <ConnectedTreeDirectory
                    childId={child}
                    key={child}
                    path={`${USSPath}/${child}`}
                    handleCreateDirectory={this.handleCreateDirectory}
                    handleCreateFile={this.handleCreateFile}
                    handleDelete={this.handleDelete}
                    handleOrionEdit={this.handleOrionEdit}
                    inDialog={inDialog}
                />
            );
        }
        return (
            <TreeFile
                childId={child}
                key={child}
                path={`${USSPath}/${child}`}
                dispatch={dispatch}
                handleCreateDirectory={this.handleCreateDirectory}
                handleCreateFile={this.handleCreateFile}
                handleDelete={this.handleDelete}
                handleOrionEdit={this.handleOrionEdit}
                inDialog={inDialog}
            />
        );
    }

    renderDialog() {
        const { dispatch } = this.props;
        switch (this.state.dialog) {
            case CREATE_DIRECTORY:
                return (
                    <ConnectedCreateUSSResourceDialog
                        dialogReturn={this.dialogReturn}
                        type="DIRECTORY"
                    />
                );
            case CREATE_FILE:
                return (
                    <ConnectedCreateUSSResourceDialog
                        dialogReturn={this.dialogReturn}
                        type="FILE"
                    />
                );
            case DELETE:
                return (
                    <DeleteUSSResourceDialog
                        dialogReturn={this.dialogReturn}
                        resource={this.state.selectedResource}
                        dispatch={dispatch}
                    />
                );
            default:
                return null;
        }
    }

    renderArrowUpwardIcon() {
        const { USSPath } = this.props;
        const iconStyle = { float: 'right', padding: '10px' };
        if (USSPath !== '/') {
            return (
                <ArrowUpwardIcon
                    style={iconStyle}
                    onClick={this.handleUpOneDirectory}
                />
            );
        }
        return null;
    }

    render() {
        const {
            USSChildren, USSPath, isFetching, dispatch, inDialog,
        } = this.props;
        return (
            <Card class="tree-card" style={{ paddingBottom: 0 }}>
                <CardContent>
                    <div className="component-header">
                        <TextField
                            className="component-text-field-fill"
                            id="path"
                            value={USSPath}
                            onChange={this.handlePathChange}
                        />
                        <RefreshIcon
                            isFetching={isFetching}
                            submitAction={this.handleRefreshTree}
                            dispatch={dispatch}
                        />
                        {this.renderArrowUpwardIcon()}
                    </div>
                    <FullHeightTree offset={16} overrideHeight={inDialog ? '300px' : null}>
                        <ul>
                            {sortChildren(USSChildren.keySeq().toArray()).map(this.renderUSSChild)}
                        </ul>
                    </FullHeightTree>
                    {this.renderDialog()}
                </CardContent>
            </Card>
        );
    }
}

USSTree.defaultProps = {
    inDialog: false,
};

USSTree.propTypes = {
    dispatch: PropTypes.func.isRequired,
    USSPath: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    USSChildren: PropTypes.instanceOf(Map),
    username: PropTypes.string.isRequired,
    validated: PropTypes.bool.isRequired,
    inDialog: PropTypes.bool,
};

function mapStateToProps(state) {
    const treeRoot = state.get('treeUSS');
    const validationRoot = state.get('validation');
    return {
        USSChildren: treeRoot.get('USSChildren'),
        USSPath: treeRoot.get('USSPath'),
        selectedUSSPath: treeRoot.get('selectedUSSPath'),
        isFetching: treeRoot.get('isFetching'),
        validated: validationRoot.get('validated'),
        username: validationRoot.get('username'),
    };
}
const ConnectedTree = connect(mapStateToProps)(USSTree);
export default ConnectedTree;
