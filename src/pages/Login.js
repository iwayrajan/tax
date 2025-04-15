import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faLock, 
  faEnvelope 
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth.service';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login({
        email,
        password
      });

      // Store tokens and user data
      if (response.access_token && response.refresh_token && response.user) {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        // Update auth context with user data
        login(response.user);
        
        navigate('/dashboard', { replace: true });
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await authService.forgotPassword({ email });
      alert('Password reset instructions have been sent to your email');
      setIsForgotPassword(false);
    } catch (err) {
      console.error('Forgot password error:', err);
      // Handle the specific error format from the API
      if (err.response?.data?.email?.[0]) {
        setError(err.response.data.email[0]);
      } else {
        setError('Error sending reset instructions. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="login-box">
          <h1 className="text-center mb-4">
            {isForgotPassword ? 'Forgot Password' : 'Login'}
          </h1>
          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}
          {!isForgotPassword ? (
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3 input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faUser} color="#968D8D" size="lg" />
                  </span>
                </div>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faLock} color="#968D8D" size="lg" />
                  </span>
                </div>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </Form.Group>

              <div className="text-end mb-3">
                <a 
                  href="#" 
                  className="forgot-password"
                  onClick={(e) => {
                    e.preventDefault();
                    setError('');
                    setIsForgotPassword(true);
                  }}
                >
                  Forgot Password?
                </a>
              </div>

              <Button 
                type="submit" 
                className="w-100 login-button"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login Now'}
              </Button>
            </Form>
          ) : (
            <Form onSubmit={handleForgotPassword}>
              <Form.Group className="mb-3 input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faEnvelope} color="#968D8D" size="lg" />
                  </span>
                </div>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <a 
                  href="#" 
                  className="back-to-login"
                  onClick={(e) => {
                    e.preventDefault();
                    setError('');
                    setIsForgotPassword(false);
                  }}
                >
                  Back to Login
                </a>
              </div>

              <Button 
                type="submit" 
                className="w-100 login-button"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </Form>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Login; 