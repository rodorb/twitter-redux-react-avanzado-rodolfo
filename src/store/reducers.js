import { AUTH_LOGIN, AUTH_LOGOUT, TWEETS_LOADED } from "./types";

const DEFAULT_STATE = {
    auth: false,
    tweets: []
}

const reducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return {...state, auth: true };
        case AUTH_LOGOUT:
            return {...state, auth: false };
        case TWEETS_LOADED:
            return {...state, tweets: action.payload };
        default:
            return state;
    }
};

export default reducer;