export const getIsLogged = (state) => state.auth;
export const getTweets = (state) => state.tweets.data;
export const getAreTweetsLoaded = (state) => state.tweets.loaded;
// export const getTweet = (state, id) => {
//     return state.tweets.data.find((t) => { return t.id === id })
// };

export const getTweet = (tweetId) => (state) => {
    return state.tweets.data.find((t) => { return t.id === tweetId })
};

export const getUi = (state) => state.ui;