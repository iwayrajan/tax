import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (username === 'admin' && password === 'admin') {
      login();
      navigate('/dashboard', { replace: true });
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="login-box">
          <h1 className="text-center mb-4">Login</h1>
          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faUser} color="#968D8D" size="lg" />
                </span>
              </div>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
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
              />
            </Form.Group>

            <div className="text-end mb-3">
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <Button type="submit" className="w-100 login-button">
              Login Now
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Login; 