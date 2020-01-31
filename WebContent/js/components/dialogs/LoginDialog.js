/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2020
 */

import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField, FlatButton } from 'material-ui';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import { validateUser, loginUser } from '../../actions/validation';

class LoginDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
            username: '',
            password: '',
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        return dispatch(validateUser());
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value,
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value,
        });
    }

    handleLogin = () => {
        const { dispatch } = this.props;
        return dispatch(loginUser(this.state.username, this.state.password));
    }

    render() {
        const { isValidating, validationMessage } = this.props;
        const dialogContent = isValidating ? <CircularProgress /> :
            (<div>
                <form onSubmit={this.handleLogin}>
                    <TextField
                        id="username"
                        label="username"
                        hintText="Username"
                        errorText={this.state.username === '' ? <div>*Required</div> : null}
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                        style={{ display: 'block' }}
                    />
                    <TextField
                        id="password"
                        label="password"
                        hintText="Password"
                        errorText={this.state.password === '' ? <div>*Required</div> : null}
                        type="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />
                    <input type="submit" style={{ display: 'none' }} />
                </form>
                <div style={{ color: 'red' }}>
                    {validationMessage}
                </div>
            </div>);

        const actions = [
            <FlatButton label={'Login'} onClick={this.handleLogin} />,
        ];

        return (
            <Dialog
                title="Zowe Login"
                open={true}
                actions={actions}
                type={'primary'}
            >
                {dialogContent}
            </Dialog>
        );
    }
}

LoginDialog.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isValidating: PropTypes.bool.isRequired,
    validationMessage: PropTypes.string,
};

function mapStateToProps(state) {
    const validationRoot = state.get('validation');
    return {
        isValidating: validationRoot.get('isValidating'),
        validationMessage: validationRoot.get('message'),
    };
}

const connectedLoginDialog = connect(mapStateToProps)(LoginDialog);
export default connectedLoginDialog;
