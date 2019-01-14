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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router';
import 'babel-polyfill';

import { validateUser } from '../actions/validation';

const imgex = require('../../img/zosexplorer40.png');

class MenuApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false, current: 0 };
    }

    componentWillMount() {
        const { dispatch, validated } = this.props;
        if (!validated) {
            dispatch(validateUser());
        }
    }

    renderTitle = () => {
        return (
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                {location.hostname}
            </Link>);
    }

    render() {
        const { children } = this.props;
        return (
            <div>
                <AppBar
                    title={this.renderTitle()}
                    showMenuIconButton={false}
                    iconElementRight={
                        <IconButton>
                            <Avatar src={imgex} size={34} />
                        </IconButton>}
                    iconStyleRight={{ marginTop: '3px', marginRight: '-4px' }}
                />
                {/* Children will be the pages passed down by React-Router */}
                {children}
            </div>
        );
    }
}

MenuApp.propTypes = {
    children: PropTypes.element.isRequired,
    dispatch: PropTypes.func.isRequired,
    validated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const validationRoot = state.get('validation');
    return {
        validated: validationRoot.get('validated'),
    };
}

const ConnectedMenuBar = connect(mapStateToProps)(MenuApp);
export default ConnectedMenuBar;
