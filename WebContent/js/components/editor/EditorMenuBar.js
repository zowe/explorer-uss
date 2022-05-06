/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2020
 */

import PropTypes from 'prop-types';
import React from 'react';
import RaisedButton from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import NewTabIcon from '@material-ui/icons/Tab';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgressMui from '@material-ui/core/CircularProgress';

export default class EditorMenuBar extends React.Component {
    static renderTypesDropdown() {
        const result = [];
        if (window.codeEdit) {
            const types = window.codeEdit.serviceRegistry.getServiceReferences('orion.core.contenttype');
            if (types) {
                types.forEach(type => {
                    if (type.getProperty('contentTypes')) {
                        type.getProperty('contentTypes').forEach(typeElement => {
                            result.push(<MenuItem id={typeElement.id} value={typeElement.id} key={typeElement.id}>{typeElement.name}</MenuItem>);
                        });
                    }
                });
            }
        }
        return result.length > 0 ? result : null;
    }

    static openFileInNewWindow(file) {
        const baseURI = `${window.location.origin}${window.location.pathname}`;
        const newWindow = window.open(`${baseURI}#/editor?file=${encodeURIComponent(file)}`, '_blank');
        newWindow.focus();
    }

    static renderFullScreenButton(file) {
        return (
            <IconButton style={{ float: 'right' }} onClick={() => { EditorMenuBar.openFileInNewWindow(file); }}>
                <NewTabIcon />
            </IconButton>
        );
    }

    handleSyntaxChange = event => {
        const { updateEditorSyntax } = this.props;
        updateEditorSyntax(event.target.value);
    };

    render() {
        const {
            file, handleSave, handleSaveAs, initialSyntax, isFetching,
        } = this.props;
        return (
            <div>
                <RaisedButton
                    style={{ margin: '5px' }}
                    disabled={!file}
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                >
                    Save
                </RaisedButton>
                <RaisedButton
                    style={{ margin: '5px' }}
                    disabled={!file || !file.includes('(')}
                    variant="contained"
                    color="primary"
                    onClick={handleSaveAs}
                >
                    Save as..
                </RaisedButton>
                <span aria-live="polite" style={{ whiteSpace: 'nowrap' }}>{file}</span>
                {isFetching && <CircularProgressMui size={24} style={{ verticalAlign: 'middle', marginLeft: '5px' }} />}
                {file ? EditorMenuBar.renderFullScreenButton(file) : null}
                <FormControl style={{ float: 'right', paddingTop: '5px', width: '100px' }}>
                    <Select
                        MenuProps={{ disableEnforceFocus: true }}
                        value={initialSyntax}
                        onChange={this.handleSyntaxChange}
                    >
                        {EditorMenuBar.renderTypesDropdown()}
                    </Select>
                </FormControl>
            </div>
        );
    }
}

EditorMenuBar.propTypes = {
    file: PropTypes.string,
    isFetching: PropTypes.bool,
    updateEditorSyntax: PropTypes.func,
    initialSyntax: PropTypes.string,
    handleSave: PropTypes.func,
    handleSaveAs: PropTypes.func,
};
