/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2016, 2019
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Map } from 'immutable';
import rootReducer from '../reducers';

// Singleton
export default () => {
    let store;

    function configureStore() {
        let appMiddleware;
        if (window.localStorage.getItem('enableReduxLogger') === 'true') {
            appMiddleware = applyMiddleware(thunk, createLogger());
        } else {
            appMiddleware = applyMiddleware(thunk);
        }

        const emptyState = Map({});
        return appMiddleware(createStore)(rootReducer, emptyState);
    }
    return {
        getStore: () => {
            if (!store) {
                store = configureStore();
            }
            return store;
        },
    };
};
