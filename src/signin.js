import React, { Component } from 'react';
import './signin.css'; // Make sure to create this CSS file


class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      loading: false,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    if (!username || !password) {
      this.setState({ error: 'Please fill in all fields' });
      return;
    }

    this.setState({ loading: true, error: '' });

    try {
      const response = await fetch('http://localhost:3030/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Handle successful login (e.g., redirect or save token)
      console.log('Login successful:', data);
      // You might want to save the token or redirect the user

    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { username, password, error, loading } = this.state;
    return (
      <div className="signin-container">
        <h1 className="signin-heading">Sign In</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={this.handleSubmit} className="signin-form">
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
            placeholder="Username"
            className="input-field"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Password"
            className="input-field"
          />
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    );
  }
}

export default SignIn;
