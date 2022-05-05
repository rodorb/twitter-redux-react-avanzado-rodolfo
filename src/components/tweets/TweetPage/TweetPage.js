import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { tweetLoaded } from '../../../store/actions';
import { getTweet } from '../../../store/selectors';
import Page from '../../layout/Page';

class TweetPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // tweet: null,
      error: null,
      isLoading: false,
    };
  }

  // handleGetTweet = async () => {
  //   this.setState({ isLoading: true, error: null });
  //   try {
  //     const tweet = await getTweet(this.props.tweetId);
  //     this.setState({ tweet, isLoading: false });
  //   } catch (error) {
  //     this.setState({ isLoading: false, error });
  //   }
  // };

  // componentDidMount() {
  //   this.handleGetTweet();
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('old', prevProps, prevState);
  //   console.log('new', this.props, this.state);
  //   if (prevProps.tweetId !== this.props.tweetId) {
  //     this.handleGetTweet();
  //   }
  // }

  componentWillUnmount() {
    console.log('unmont');
    // clean tasks
  }

  render() {
    const {  error, isLoading } = this.state;
    const { tweet } = this.props;
    // isLoading - show an spinner
    // error - show an alert
    if (error?.status === 401) {
      return <Navigate to="/login" />;
    }

    if (error?.status === 404) {
      return <Navigate to="/404" />;
    }

    return (
      <Page title="Tweet detail">
        <div>{tweet ? JSON.stringify(tweet) : 'Nothing to show'}</div>
      </Page>
    );
  }
}

// const TweetPageFunction = () => {
//   const [tweet, setTweet] = useState(null);
//   const { tweetId } = useParams();
//   // return <TweetPage tweetId={tweetId} />;

//   useEffect(() => {
//     getTweet(tweetId).then(tweet => setTweet(tweet));

//     return () => {
//       // tweet 1
//       console.log('unmounted');
//     };
//   }, [tweetId]);

//   return (
//     <Page title="Tweet detail">
//       <div>{tweet ? JSON.stringify(tweet) : 'Nothing to show'}</div>
//     </Page>
//   );
// };

const TweetPageFunction = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { tweetId } = useParams();
  const parsedTweet = Number(tweetId);
  // const tweet = useSelector((state) => {
  //   return getTweet(state, Number(tweetId))
  // });
  const tweet = useSelector(getTweet(parsedTweet));

  useEffect(() => {
    console.log('ref', ref.current);
  }, []);

  useEffect(()=>{
    dispatch(tweetLoaded(parsedTweet))
  },[dispatch, tweetId]);

  return <TweetPage ref={ref} tweet={tweet} />;
};

export default TweetPageFunction;
