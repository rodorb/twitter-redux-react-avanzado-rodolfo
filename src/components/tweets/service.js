import client from '../../api/client';

const tweetsBaseUrl = '/api/tweets';

export const getLatestTweets = () => {
  const url = `${tweetsBaseUrl}?_expand=user&_embed=likes&_sort=updatedAt&_order=desc`;
  return client.get(url);
};

export const getTweet = tweetId => {
  const url = `${tweetsBaseUrl}/${tweetId}?_expand=user&_embed=likes`;
  return client.get(url);
};

export const createTweet = tweet => {
  const url = tweetsBaseUrl;
  return client.post(url, tweet);
};
