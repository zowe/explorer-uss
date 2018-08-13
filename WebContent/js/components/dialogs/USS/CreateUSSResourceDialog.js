/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2018
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUSSResource } from '../../../actions/treeUSS';
import ConnectedUSSTree from '../../../containers/USSTree';
import AtlasDialog from '../AtlasDialog';
import USSFieldName from './USSFieldName';

const CREATE_DIRECTORY_TITLE = 'Create Directory';
const CREATE_FILE_TITLE = 'Create File';

const NEW_DIRECTORY_FIELD = 'New Directory Name';
export const NEW_FILE_FIELD = 'New File Name';

class CreateUSSResourceDialog extends React.Component {
    constructor(props) {
        super(props);
        this.updateName = this.updateName.bind(this);

        this.state = {
            field: '',
        };
    }

    getTitleName() {
        const { type } = this.props;
        return type === 'directory' ? CREATE_DIRECTORY_TITLE : CREATE_FILE_TITLE;
    }

    getFieldName() {
        const { type } = this.props;
        return type === 'directory' ? NEW_DIRECTORY_FIELD : NEW_FILE_FIELD;
    }

    addSlashToPathIfMissing = path => {
        if (path.endsWith('/')) {
            return path;
        }
        return `${path}/`;
    }

    submitAction = () => {
        const { USSPath, type } = this.props;
        return createUSSResource(`${this.addSlashToPathIfMissing(USSPath)}${this.state.field}`, type);
    }

    updateName(newValue) {
        this.setState({
            field: newValue,
        });
    }

    render() {
        const { dialogReturn, dispatch } = this.props;
        const dialogContent = (
            <div>
                <ConnectedUSSTree inDialog={true} />
                <USSFieldName updateField={this.updateName} fieldName={this.getFieldName()} />
            </div>
        );

        return (
            <AtlasDialog
                title={this.getTitleName()}
                submitAction={() => { return this.submitAction(); }}
                dialogReturn={dialogReturn}
                dispatch={dispatch}
                dialogContent={dialogContent}
            />
        );
    }
}

CreateUSSResourceDialog.propTypes = {
    dialogReturn: PropTypes.func.isRequired,
    USSPath: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    const treeRoot = state.get('treeUSS');
    return {
        USSPath: treeRoot.get('USSPath'),
    };
}

const ConnectedCreateUSSResourceDialog = connect(mapStateToProps)(CreateUSSResourceDialog);
export default ConnectedCreateUSSResourceDialog;
