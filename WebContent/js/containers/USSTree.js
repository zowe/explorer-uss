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
import TextField from 'material-ui/TextField';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import UpDirectory from 'material-ui/svg-icons/navigation/arrow-upward';
import RefreshIcon from '../components/explorer/RefreshIcon';
import TreeFile from '../components/explorer/TreeFile';
import ConnectedTreeDirectory from '../components/explorer/TreeDirectory';
import { setUSSPath, fetchUSSTreeChildren, resetUSSChildren } from '../actions/treeUSS';
import { addTreeDirectory, resetDirectoryChildren } from '../actions/treeDirectories';
import { requestEdit, fetchUSSFile } from '../actions/editor';
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
            dispatch(setUSSPath(`/u/${username.toLowerCase()}`));
        }
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch, validated, username, USSPath, USSChildren } = this.props;
        // Once we receive validation update the path, once we have set the path, fetch the children
        if (!validated) {
            dispatch(setUSSPath(`/u/${username.toLowerCase()}`));
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
        if (this.pathRef.state.isFocused) {
            clearTimeout(this.state.timeout);
            this.state.timeout = setTimeout(() => {
                this.resetAndFetchChildren(path);
            }, 1500);
        } else {
            this.resetAndFetchChildren(path);
        }
    }

    resetAndFetchChildren(path) {
        const { dispatch } = this.props;
        dispatch(resetUSSChildren());
        dispatch(fetchUSSTreeChildren(path));
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
        dispatch(requestEdit());
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

    isTreeInDialog = () => {
        const { title } = this.props;
        // When tree is rendered in a dialog box it is not provided with a title
        return title === undefined;
    }

    renderTitle() {
        const { title, subtitle } = this.props;
        if (!this.isTreeInDialog()) {
            return (
                <CardHeader title={title} subtitle={subtitle} />
            );
        }
        return null;
    }

    renderUSSChild(child) {
        const { USSPath, USSChildren, dispatch } = this.props;
        if (USSChildren.get(child) === 'directory') {
            return (
                <ConnectedTreeDirectory
                    childId={child}
                    key={child}
                    path={`${USSPath}/${child}`}
                    handleCreateDirectory={this.handleCreateDirectory}
                    handleCreateFile={this.handleCreateFile}
                    handleDelete={this.handleDelete}
                    handleOrionEdit={this.handleOrionEdit}
                    isTreeInDialog={this.isTreeInDialog}
                />);
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
                isTreeInDialog={this.isTreeInDialog}
            />);
    }

    renderDialog() {
        const { dispatch } = this.props;
        switch (this.state.dialog) {
            case CREATE_DIRECTORY:
                return (
                    <ConnectedCreateUSSResourceDialog
                        dialogReturn={this.dialogReturn}
                        type={'directory'}
                    />
                );
            case CREATE_FILE:
                return (
                    <ConnectedCreateUSSResourceDialog
                        dialogReturn={this.dialogReturn}
                        type={'file'}
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

    renderUpDirectory() {
        const { USSPath } = this.props;
        const iconStyle = { float: 'right', padding: '10px' };
        if (USSPath !== '/') {
            return (
                <UpDirectory
                    style={iconStyle}
                    onClick={this.handleUpOneDirectory}
                />);
        }
        return null;
    }

    render() {
        const { USSChildren, USSPath, isFetching, dispatch, inDialog } = this.props;
        const textFieldStyle = { paddingLeft: 8 };
        return (
            <Card class="tree-card" containerStyle={{ paddingBottom: 0 }}>
                {this.renderTitle()}
                <CardText>
                    <div>
                        <TextField
                            style={textFieldStyle}
                            id="path"
                            ref={ref => { this.pathRef = ref; }}
                            value={USSPath}
                            onChange={this.handlePathChange}
                        />
                        <RefreshIcon
                            isFetching={isFetching}
                            submitAction={this.handleRefreshTree}
                            dispatch={dispatch}
                        />
                        {this.renderUpDirectory()}
                    </div>
                    <FullHeightTree offset={16} overrideHeight={inDialog ? '300px' : null}>
                        <ul>
                            {sortChildren(USSChildren.keySeq().toArray()).map(this.renderUSSChild)}
                        </ul>
                    </FullHeightTree>
                    {this.renderDialog()}
                </CardText>
            </Card>
        );
    }
}

USSTree.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
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
