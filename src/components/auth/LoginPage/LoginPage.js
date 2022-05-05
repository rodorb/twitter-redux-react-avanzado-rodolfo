import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../common/Button';
import FormField from '../../common/FormField';
import { login } from '../service';
import T from 'prop-types';

import './LoginPage.css';
import { connect, useDispatch, useSelector } from 'react-redux';
import {  authLogin, authLoginFailure, authLoginRequest, authLoginSuccess, uiResetError } from '../../../store/actions';
import { getUi } from '../../../store/selectors';

function useRenders() {
  const count = useRef(1);

  useEffect(() => {
    count.current++;
  });
  return count.current;
}

function LoginPage() {
  const renders = useRenders();
  const ref = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    remember: false,
  });
const dispatch = useDispatch();
const {isLoading, error } = useSelector(getUi);

  useEffect(() => {
    console.log(ref.current);
    ref.current.focus();
  }, []);

  const { username, password, remember } = credentials;

  const handleChange = useCallback(event => {
    setCredentials(credentials => ({
      ...credentials,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    }));
  }, []);

  const resetError = () => dispatch(uiResetError());

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(authLogin(credentials)).then(()=>{
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    });
    // try {
    //   dispatch(authLoginRequest());
    //   await login(credentials);
    //   dispatch(authLoginSuccess());
    //   const from = location.state?.from?.pathname || '/';
    //   navigate(from, { replace: true });
    // } catch (error) {
    //   dispatch(authLoginFailure(error));
    // }
  };

  const buttonDisabled = useMemo(() => {
    console.log('calculando...');
    return !username || !password || isLoading;
  }, [username, password, isLoading]);

  return (
    <div className="loginPage">
      {renders}
      <h1 className="loginPage-title">Log in to Twitter</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="username"
          label="phone, email or username"
          className="loginForm-field"
          value={username}
          onChange={handleChange}
          // ref={ref}
        />
        <FormField
          type="password"
          name="password"
          label="password"
          className="loginForm-field"
          value={password}
          onChange={handleChange}
          ref={ref}
        />
        <input
          type="checkbox"
          name="remember"
          checked={remember}
          value="remember"
          onChange={handleChange}
        />
        <select value="2" onChange={event => console.log(event)}>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
        <input
          type="file"
          onChange={event => console.log(event.target.files[0])}
        />

        <Button
          className="loginForm-submit"
          type="submit"
          variant="primary"
          disabled={buttonDisabled}
        >
          Log in
        </Button>
      </form>
      {error && (
        <div onClick={resetError} className="loginPage-error">
          {error.message}
        </div>
      )}
    </div>
  );
}

LoginPage.propTypes = {
  onLogin: T.func,
};

// const mapDispatchToProps = (dispatch) =>{
//   return {
//     onLogin: ()=> dispatch(authLogin())
//   }
// }

// const ConnectedLoginPage = connect(null, mapDispatchToProps)(LoginPage)
export default LoginPage;
