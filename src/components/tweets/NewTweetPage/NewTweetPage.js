import Page from '../../layout/Page';
import Photo from '../../common/Photo';
import Textarea from '../../common/Textarea';
import Button from '../../common/Button';

import './NewTweetPage.css';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { tweetCreated } from '../../../store/actions';
import { getUi } from '../../../store/selectors';

const MAX_CHARACTERS = 280;

const NewTweetPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const {error} = useSelector(getUi);

  const handleChange = event => {
    setContent(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
      const createdTweet =  await dispatch(tweetCreated({content}));
      // setCreatedTweet(tweet);
      navigate(`/tweets/${createdTweet.id}`);
    
  };

  const characters = `${content.length} / ${MAX_CHARACTERS}`;
  const buttonDisabled = content.length < 5;

  // if (createdTweet) {
  //   return <Navigate to={`/tweets/${createdTweet.id}`} />;
  // }

  if (error?.status === 401) {
    return <Navigate to="/login" />;
  }

  return (
    <Page title="What are you thinking...">
      <div className="newTweetPage bordered">
        <div className="left">
          <Photo />
        </div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <Textarea
              className="newTweetPage-textarea"
              placeholder="Hey! What's up!"
              value={content}
              onChange={handleChange}
              maxLength={MAX_CHARACTERS}
            />
            <div className="newTweetPage-footer">
              <span className="newTweetPage-characters">{characters}</span>
              <Button
                type="submit"
                className="newTweetPage-submit"
                variant="primary"
                disabled={buttonDisabled}
              >
                Let's go!
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Page>
  );
};

export default NewTweetPage;
