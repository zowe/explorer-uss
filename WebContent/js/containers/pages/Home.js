/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2020
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import USSTreeComponent from '../USSTree';
import Editor from '../../components/editor/Editor';
import ConnectedSnackbar from '../../components/Snackbar';
import LoginDialog from '../../components/dialogs/LoginDialog';
import debounce from '../../utilities/debounce';

const gridOfTwelveCol3 = 0.238;
const widthForFullScreen = 600;
const minContainerWidth = 300;

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moveMode: false,
            collapsed: false,
            windowWidth: window.innerWidth,
            treeWidthPercent: gridOfTwelveCol3,
        };
        this.debHandleResize = debounce(this.handleResize, 100);
        this.debRecalcTreeWidth = debounce(this.recalcTreeWidth, 10);
    }

    componentDidMount() {
        window.addEventListener('resize', this.debHandleResize);
    }

    UNSAFE_componentWillMount() {
        window.removeEventListener('resize', this.debHandleResize);
    }

    onDraggingStart = event => {
        if (!this.state.collapsed) {
            event.preventDefault();
            this.setState({ moveMode: true });
        }
    };

    onDragging = event => {
        if (this.state.moveMode) {
            this.debRecalcTreeWidth(event.clientX);
        }
    };

    onDraggingEnd = event => {
        if (this.state.moveMode) {
            this.debRecalcTreeWidth(event.clientX);
            this.setState({ moveMode: false });
        }
    };

    handleResize = () => {
        this.setState({ windowWidth: window.innerWidth });
        const newX = window.innerWidth * this.state.treeWidthPercent;
        const maxTreeWidth = window.innerWidth - minContainerWidth;
        if (newX < minContainerWidth) {
            this.setState({ treeWidthPercent: minContainerWidth / window.innerWidth });
        }
        if (newX > maxTreeWidth) {
            this.setState({ treeWidthPercent: maxTreeWidth / window.innerWidth });
        }
    };

    recalcTreeWidth = mouseX => {
        const maxTreeWidth = window.innerWidth - minContainerWidth;
        const halfBarWidthCorrection = window.innerWidth * 0.005;
        let newX = mouseX;
        if (mouseX < minContainerWidth || mouseX > maxTreeWidth) {
            newX = (minContainerWidth < mouseX) ? maxTreeWidth : minContainerWidth;
        }
        const treeWidthPercent = (newX - halfBarWidthCorrection) / window.innerWidth;
        this.setState({ treeWidthPercent });
    };

    render() {
        if (this.props.validated) {
            const {
                collapsed, windowWidth, treeWidthPercent, moveMode,
            } = this.state;
            return (
                <div className="row group">
                    <div
                        className={moveMode ? 'action-layer draggable' : 'action-layer'}
                        onMouseUp={this.onDraggingEnd}
                        onMouseMove={this.onDragging}
                    >
                        <div
                            id="explorer-sidebar"
                            className={`component col col-3 ${collapsed ? 'hidden' : ''}`}
                            style={windowWidth <= widthForFullScreen ? {} : { width: `${treeWidthPercent * 100}%` }}
                        >
                            <USSTreeComponent id="USSTree" title="Unix File Explorer" subtitle="Browse Unix Files" type="unix" />
                        </div>
                        <div
                            id="resize-bar"
                            className={`component col col-0-1 collapse-col ${collapsed ? '' : 'draggable'} `}
                            onMouseDown={this.onDraggingStart}
                        >
                            <IconButton
                                id="collapse-button"
                                className="collapse-btn"
                                onClick={() => {
                                    this.setState({ collapsed: !collapsed });
                                }}
                                onMouseDown={e => {
                                    e.stopPropagation();
                                }}
                            >
                                <ChevronLeftIcon className={collapsed ? 'rotate-180' : ''} />
                            </IconButton>
                        </div>
                        <div
                            className={`component col ${collapsed ? 'col-11-8' : 'col-9-2'}`}
                            style={(collapsed || windowWidth <= widthForFullScreen) ? {} : { width: `calc(100% - ${treeWidthPercent * 100}% - 2%)` }}
                        >
                            <Editor />
                        </div>
                        <ConnectedSnackbar />
                    </div>
                </div>
            );
        }
        return (<LoginDialog />);
    }
}

HomeView.propTypes = {
    validated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const validationRoot = state.get('validation');
    return {
        validated: validationRoot.get('validated'),
    };
}

const ConnectedHome = connect(mapStateToProps)(HomeView);
export default ConnectedHome;
