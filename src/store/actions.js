import { getAreTweetsLoaded, getTweet, getTweets } from "./selectors";
import { AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT_SUCCESS, TWEETS_LOADED_FAILURE, TWEETS_LOADED_REQUEST, TWEETS_LOADED_SUCCESS, TWEET_CREATED_SUCCESS, TWEET_LOADED_SUCCESS, UI_RESET_ERROR } from "./types";

export const authLoginRequest = () => ({
    type: AUTH_LOGIN_REQUEST
});

export const authLoginSuccess = () => ({
    type: AUTH_LOGIN_SUCCESS
});

export const authLoginFailure = (error) => ({
    type: AUTH_LOGIN_FAILURE,
    payload: error,
    error: true
});

export const uiResetError = () => ({
    type: UI_RESET_ERROR
});

export const authLogoutSuccess = () => ({
    type: AUTH_LOGOUT_SUCCESS
});

export const authLogout = () => {
    return async function(dispatch, _getState, { api }) {
        const result = await api.auth.logout();
        dispatch(authLogoutSuccess());
        return result;
    }
};
// ({
//     type: AUTH_LOGOUT
// });

export const tweetsLoadedRequest = (tweets) => ({
    type: TWEETS_LOADED_REQUEST
});
export const tweetsLoadedSuccess = (tweets) => ({
    type: TWEETS_LOADED_SUCCESS,
    payload: tweets
});

export const tweetLoadedSuccess = (tweet) => ({
    type: TWEET_LOADED_SUCCESS,
    payload: tweet
});


export const tweetLoaded = (tweetId) => {
    return async function(dispatch, _getState, { api }) {
        const tweetLoaded = getTweet(tweetId)(_getState());
        if (tweetLoaded) return;

        // dispatch(tweetsLoadedRequest());
        try {
            const tweet = await api.tweets.getTweet(tweetId);
            dispatch(tweetLoadedSuccess(tweet));
            // const from = location.state?.from?.pathname || '/';
            // navigate(from, { replace: true });
        } catch (error) {
            // dispatch(tweetsLoadedFailure(error));
            throw error;
        }
    }
};



export const tweetCreatedSuccess = () => ({
    type: TWEET_CREATED_SUCCESS
});


export const tweetCreated = (tweet) => {
    return async function(dispatch, _getState, { api }) {
        // dispatch(tweetsLoadedRequest());
        try {
            const createdTweet = await api.tweets.createTweet(tweet);
            console.log(createdTweet);
            dispatch(tweetCreatedSuccess());
            return createdTweet;
            // const from = location.state?.from?.pathname || '/';
            // navigate(from, { replace: true });
        } catch (error) {
            // dispatch(tweetsLoadedFailure(error));
            throw error;
        }
    }
};



export const tweetsLoadedFailure = (error) => ({
    type: TWEETS_LOADED_FAILURE,
    payload: error,
    error: true
});

export const authLogin = (credentials) => {
    return async function(dispatch, _getState, { api }) {
        try {
            dispatch(authLoginRequest());
            await api.auth.login(credentials);
            dispatch(authLoginSuccess());
            // const from = location.state?.from?.pathname || '/';
            // navigate(from, { replace: true });
        } catch (error) {
            dispatch(authLoginFailure(error));
            throw error;
        }
    }
};

export const tweetsLoaded = () => {
    return async function(dispatch, _getState, { api }) {
        const tweetsAreLoaded = getAreTweetsLoaded(_getState());
        //si ya hay tweets en el estado no hago la llamada al API
        if (tweetsAreLoaded) return;

        dispatch(tweetsLoadedRequest());
        try {
            const tweets = await api.tweets.getLatestTweets();
            dispatch(tweetsLoadedSuccess(tweets));
            // const from = location.state?.from?.pathname || '/';
            // navigate(from, { replace: true });
        } catch (error) {
            dispatch(tweetsLoadedFailure(error));
            throw error;
        }
    }
};