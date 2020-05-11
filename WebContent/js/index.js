/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2019
 */

/* global document */

// Needed for onTouchTap in Material UI - remove when React implements
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import store from './store/Store';
import HomeView from './containers/pages/Home';
import * as ibmcolors from './themes/ibmcolors';
import FullScreenEditor from './containers/pages/FullScreenEditor';

injectTapEventPlugin();

const lightTheme = getMuiTheme({
    palette: {
        primary1Color: ibmcolors.ibmBlueDark,
        primary2Color: ibmcolors.ibmBlue,
        primary3Color: ibmcolors.ibmGray30,
        accent1Color: ibmcolors.ibmBluePale,
        accent2Color: ibmcolors.ibmNWhite30,
        accent3Color: ibmcolors.ibmCGray40,
        textColor: ibmcolors.ibmDarkText,
        alternateTextColor: ibmcolors.ibmWhite,
        canvasColor: ibmcolors.ibmCyanPale,
    },
});

ReactDOM.render(
    <MuiThemeProvider muiTheme={lightTheme}>
        <Provider store={store().getStore()}>
            <Router history={hashHistory}>
                <Route path="/">
                    <IndexRoute component={HomeView} />
                    <Route path="/editor" component={FullScreenEditor} />
                </Route>
            </Router>
        </Provider>
    </MuiThemeProvider>
    , document.getElementById('app'));
