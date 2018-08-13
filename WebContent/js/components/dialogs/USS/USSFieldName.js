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
import TextField from 'material-ui/TextField';


export default class USSFieldName extends React.Component {
    constructor(props) {
        super(props);
        this.handleFieldChange = this.handleFieldChange.bind(this);

        this.state = {
            field: '',
        };
    }

    componentWillMount() {
        const { startValue } = this.props;
        if (startValue) {
            this.setState({ field: startValue });
        }
    }

    handleFieldChange({ target }) {
        const { updateField } = this.props;
        const fieldValue = target.value;
        this.setState({ field: fieldValue });
        updateField.call(this, fieldValue);
    }

    render() {
        const { fieldName } = this.props;
        return (
            <TextField
                hintText={fieldName}
                value={this.state.field}
                onChange={this.handleFieldChange}
                floatingLabelText={fieldName}
            />);
    }
}

USSFieldName.propTypes = {
    updateField: PropTypes.func.isRequired,
    fieldName: PropTypes.string.isRequired,
    startValue: PropTypes.string,
};
