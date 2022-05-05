import { combineReducers, createStore, applyMiddleware } from 'redux';
import * as reducers from './reducers';
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from 'redux-thunk';
import * as auth from '../components/auth/service';
import * as tweets from '../components/tweets/service';
const api = { auth, tweets };

function logger(store) {
    return function(next) {
        return function(action) {
            console.log('before action', action, store.getState());
            const result = next(action);
            console.log('after action', action, store.getState());
            return result;
        }
    };
}

const timestamp = () => (next) => (action) => {
    const newAction = {
        ...action,
        meta: {
            ...action.meta,
            timestamp: new Date().toISOString()
        }
    };
    return next(newAction);
};


//destructuring de state
// const thunk = ({ dispatch, getState }) => (next) => (action) => {
//     if (typeof action === 'function') {
//         return action(dispatch, getState, {api: {auth: {login}}});
//     }
//     next(action);
// }

const configureStore = (preloadedState) => {
    const middlewares = [thunk.withExtraArgument({ api }), timestamp, logger];
    //método reducer, estado inicial?, store enhancers (amplian el funcionamiento del store de redux)
    const store = createStore(
        combineReducers(reducers),
        preloadedState,
        composeWithDevTools(applyMiddleware(...middlewares))
    );
    return store;
};


export default configureStore;