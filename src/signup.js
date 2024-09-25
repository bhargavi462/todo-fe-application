import React, { Component } from 'react';
import './signup.css'; // Make sure to create this CSS file

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      reenterPassword: '',
      email: '',
      error: '',
      loading: false,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password, reenterPassword, email } = this.state;

    if (!username || !password || !reenterPassword || !email) {
      this.setState({ error: 'Please fill in all fields' });
      return;
    }

    if (password !== reenterPassword) {
      this.setState({ error: 'Passwords do not match' });
      return;
    }

    this.setState({ loading: true, error: '' });

    try {
      const response = await fetch('http://localhost:3030/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Handle successful signup (e.g., redirect or show success message)
      console.log('Sign up successful:', data);
      // You might want to redirect the user or show a success message

    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { username, password, reenterPassword, email, error, loading } = this.state;

    return (
      <div className="signup-container">
        <h1 className="signup-heading">Sign Up</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={this.handleSubmit} className="signup-form">
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
            placeholder="Username"
            className="input-field"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            placeholder="Email"
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
          <input
            type="password"
            name="reenterPassword"
            value={reenterPassword}
            onChange={this.handleChange}
            placeholder="Re-enter Password"
            className="input-field"
          />
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
