// import { combineReducers } from 'redux';
import {
    AUTH_LOGIN_FAILURE,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT_SUCCESS,
    TWEETS_LOADED_SUCCESS,
    TWEETS_LOADED_REQUEST,
    TWEETS_LOADED_FAILURE,
    UI_RESET_ERROR,
    TWEET_LOADED_SUCCESS,
    TWEET_LOADED_REQUEST,
    TWEET_LOADED_FAILURE,
    TWEET_CREATED_REQUEST,
    TWEET_CREATED_FAILURE,
    TWEET_CREATED_SUCCESS
} from "./types";

const DEFAULT_STATE = {
    auth: false,
    tweets: {
        loaded: false,
        data: []
    },
    ui: {
        isLoading: false,
        error: null
    }
}

// const reducer = (state = DEFAULT_STATE, action) => {
//     switch (action.type) {
//         case AUTH_LOGIN:
//             return {...state, auth: true };
//         case AUTH_LOGOUT:
//             return {...state, auth: false };
//         case TWEETS_LOADED:
//             return {...state, tweets: action.payload };
//         default:
//             return state;
//     }
// };

export const auth = (state = DEFAULT_STATE.auth, action) => {
    switch (action.type) {
        case AUTH_LOGIN_SUCCESS:
            return true;
        case AUTH_LOGOUT_SUCCESS:
            return false;
        default:
            return state;
    }
};

export const tweets = (state = DEFAULT_STATE.tweets, action) => {
    switch (action.type) {
        case TWEETS_LOADED_SUCCESS:
            return { loaded: true, data: action.payload }
        case TWEET_LOADED_SUCCESS:
            return {...state, data: [...state.data, action.payload] }
        default:
            return state;
    }
};

export const ui = (state = DEFAULT_STATE.ui, action) => {
    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
        case TWEETS_LOADED_REQUEST:
        case TWEET_LOADED_REQUEST:
        case TWEET_CREATED_REQUEST:
            return { isLoading: true, error: null }
        case AUTH_LOGIN_SUCCESS:
        case TWEETS_LOADED_SUCCESS:
        case TWEET_LOADED_SUCCESS:
        case TWEET_CREATED_SUCCESS:
            return {...state, isLoading: false }
        case AUTH_LOGIN_FAILURE:
        case TWEETS_LOADED_FAILURE:
        case TWEET_LOADED_FAILURE:
        case TWEET_CREATED_FAILURE:
            return {...state, isLoading: false, error: action.payload }
        case UI_RESET_ERROR:
            return {...state, error: null }
        default:
            return state;
    }
}


// const reducer = (state = DEFAULT_STATE, action) => {
//     return {
//         auth: authReducer(state.auth, action),
//         tweets: tweetsReducer(state.tweets, action),
//         ui: uiReducer(state.ui, action)
//     }
// };

// const reducer = combineReducers({
//     auth: authReducer,
//     tweets: tweetsReducer,
//     ui: uiReducer
// });
// export default reducer;