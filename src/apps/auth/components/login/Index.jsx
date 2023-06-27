import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../store/userProfile';
import { renderButton, renderInput } from '../../../../utilities/uiElements';
import loginSchema from './login.schema';
import useValidator from '../../../../utilities/hooks/useValidator';

function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const [apiError, setApiError] = useState('');
  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const loginRef = useRef(null);
  const [errors, validateForm, validateProperty, setErrors] = useValidator(data, loginSchema);
  const handleBlur = ({ target: input }) => {
    validateProperty(input.name);
  };
  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.target === emailRef.current) {
        passwordRef.current.focus();
      } else if (e.target === passwordRef.current) {
        loginRef.current.click();
      }
    }
  };
  const handleLogin = async () => {
    const error = validateForm();
    if (error) return;
    try {
      setErrors('');
      setApiError('');
      setIsLoading(true);
      const { data: jwt } = await dispatch(login(data));
      localStorage.setItem('access', jwt.access);
      localStorage.setItem('refresh', jwt.refresh);
      window.location.reload();
    } catch (err) {
      if (
        err.response &&
        err.response.status === 401 &&
        err.response.data.detail === 'No active account found with the given credentials'
      ) {
        setApiError('Invalid email or password. Please check.');
      }
      setIsLoading(false);
    }
  };
  useEffect(() => {
    emailRef.current.focus();
  }, []);
  return (
    <div className="content-area login">
      <header>
        <h3 className="header"> Login page</h3>
      </header>
      <main className="login-form">
        {apiError && <span className="error-txt">{apiError}</span>}
        {renderInput({
          label: 'Email',
          type: 'email',
          name: 'email',
          data,
          handleChange,
          onBlur: handleBlur,
          onKeyDown: handleKeyDown,
          errors,
          ref: emailRef
        })}
        {renderInput({
          label: 'Password',
          type: 'password',
          name: 'password',
          data,
          handleChange,
          onBlur: handleBlur,
          onKeyDown: handleKeyDown,
          errors,
          ref: passwordRef
        })}
        <div className="flex--end" style={{ width: '100%' }}>
          <span>Forgot Password</span>
        </div>
        {renderButton({
          content: 'Login',
          className: 'btn--lg btn--block btn--blue',
          onClick: () => handleLogin(data),
          loading,
          ref: loginRef
        })}
        <div>
          Need an account? <Link to="/auth/signup">Sign Up</Link>
        </div>
      </main>
    </div>
  );
}

export default Login;
