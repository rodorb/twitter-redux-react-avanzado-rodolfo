import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Page from '../../layout/Page';
import Button from '../../common/Button';
import Tweet from './Tweet';
import { getLatestTweets } from '../service';

import './TweetsPage.css';
import styles from './TweetsPage.module.css';

const EmptyList = () => (
  <div style={{ textAlign: 'center' }}>
    <p>Be the first twitter!</p>
    <Button as={Link} to="/tweets/new" variant="primary">
      Tweet
    </Button>
  </div>
);

const useTweets = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    // getLatestTweets().then(tweets => setTweets(tweets));
    const execute = async () => {
      const tweets = await getLatestTweets();
      setTweets(tweets);
    };
    execute();

    return () => {};
  }, []);

  return tweets;
};

const TweetsPage = () => {
  const tweets = useTweets();

  return (
    <Page title="What's going on...">
      <div className={styles.tweetsPage}>
        {tweets.length ? (
          <ul>
            {tweets.map(tweet => (
              <li key={tweet.id}>
                <Link to={`/tweets/${tweet.id}`}>
                  <Tweet {...tweet} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </div>
    </Page>
  );
};

export default TweetsPage;
