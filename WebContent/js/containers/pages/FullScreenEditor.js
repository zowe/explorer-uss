/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2019
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Editor from '../../components/editor/Editor';
import ConnectedSnackbar from '../../components/Snackbar';
import { validateUser } from '../../actions/validation';
import LoginDialog from '../../components/dialogs/LoginDialog';

class FullScreenEditor extends React.Component {
    componentWillMount() {
        const { dispatch, validated } = this.props;
        if (!validated) {
            dispatch(validateUser());
        }
    }

    render() {
        const { location, validated } = this.props;
        if (validated) {
            return (
                <div>
                    <Editor location={location} />
                    <ConnectedSnackbar />
                </div>
            );
        }
        return (<LoginDialog />);
    }
}

FullScreenEditor.propTypes = {
    dispatch: PropTypes.func.isRequired,
    validated: PropTypes.bool.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
};

function mapStateToProps(state) {
    const validationRoot = state.get('validation');
    return {
        validated: validationRoot.get('validated'),
        isValidating: validationRoot.get('isValidating'),
    };
}

const ConnectedFullScreenEditor = connect(mapStateToProps)(FullScreenEditor);
export default ConnectedFullScreenEditor;

