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
import { saveAsUSSResource } from '../../../actions/editor';
import ConnectedUSSTree from '../../../containers/USSTree';
import USSFieldName from './USSFieldName';
import { NEW_FILE_FIELD } from './CreateUSSResourceDialog';
import AtlasDialog from '../AtlasDialog';

class USSSaveAsDataset extends React.Component {
    static getFileName = path => {
        return path.substring(path.lastIndexOf('/') + 1);
    }

    constructor(props) {
        super(props);
        this.updateName = this.updateName.bind(this);
        this.state = {
            newFileName: USSSaveAsDataset.getFileName(props.file),
        };
    }

    submitAction = () => {
        const { file, USSPath, content } = this.props;
        return saveAsUSSResource(file, `${USSPath}/${this.state.newFileName}`, content);
    }

    updateName(newValue) {
        this.setState({
            newFileName: newValue,
        });
    }

    render() {
        const { dialogReturn, file, dispatch } = this.props;
        const dialogWidthStyle = { width: '584px' };
        const dialogContentDataset = (
            <div>
                <ConnectedUSSTree inDialog={true} />
                <USSFieldName fieldName={NEW_FILE_FIELD} updateField={this.updateName} startValue={USSSaveAsDataset.getFileName(file)} />
            </div>);

        return (
            <AtlasDialog
                title={'Save File As'}
                submitAction={() => { return this.submitAction(); }}
                dialogReturn={dialogReturn}
                dispatch={dispatch}
                dialogContent={dialogContentDataset}
                contentStyle={dialogWidthStyle}
                bodyStyle={{ overflowY: 'auto' }}
            />
        );
    }
}

USSSaveAsDataset.propTypes = {
    file: PropTypes.string.isRequired,
    USSPath: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    dialogReturn: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    const treeRoot = state.get('treeUSS');
    return {
        USSPath: treeRoot.get('USSPath'),
    };
}

const ConnectedUSSSaveAsDataset = connect(mapStateToProps)(USSSaveAsDataset);
export default ConnectedUSSSaveAsDataset;

