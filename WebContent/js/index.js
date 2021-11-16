/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2019
 */

import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, HashRouter } from 'react-router-dom';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; // v1.x
import store from './store/Store';
import HomeView from './containers/pages/Home';
// import * as ibmcolors from './themes/ibmcolors';
import FullScreenEditor from './containers/pages/FullScreenEditor';

// const lightTheme = createMuiTheme({
//     palette: {
//         primary1Color: ibmcolors.ibmBlueDark,
//         primary2Color: ibmcolors.ibmBlue,
//         primary3Color: ibmcolors.ibmGray30,
//         accent1Color: ibmcolors.ibmBluePale,
//         accent2Color: ibmcolors.ibmNWhite30,
//         accent3Color: ibmcolors.ibmCGray40,
//         textColor: ibmcolors.ibmDarkText,
//         alternateTextColor: ibmcolors.ibmWhite,
//         canvasColor: ibmcolors.ibmCyanPale,
//     },
// });

ReactDOM.render(

    <Provider store={store().getStore()}>
        <HashRouter>
            <Route exact={true} path="/" component={HomeView} />
            <Route path="/editor" component={FullScreenEditor} />
        </HashRouter>
    </Provider>,
    document.getElementById('app'),
);
