/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2019
 */

import React from 'react';
import PropTypes from 'prop-types';
import AtlasDialog from '../AtlasDialog';
import { deleteUSSResource } from '../../../actions/treeUSS';

export default class DeleteUSSResourceDialog extends React.Component {
    submitAction = () => {
        const { resource } = this.props;
        return deleteUSSResource(resource);
    };

    render() {
        const { resource, dialogReturn, dispatch } = this.props;
        return (
            <AtlasDialog
                title={`Delete "${resource}"?`}
                submitAction={() => { return this.submitAction(); }}
                dialogReturn={dialogReturn}
                dispatch={dispatch}
            />);
    }
}

DeleteUSSResourceDialog.propTypes = {
    resource: PropTypes.string.isRequired,
    dialogReturn: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
};
