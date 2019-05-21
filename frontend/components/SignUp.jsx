import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage'

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  }

  saveToState = (e) => {
    const { name, type, value } = e.target;
    console.log({ name, type, value })
    this.setState({ [name]: value })
  }

  render() {
    const { email, name, password } = this.state
    return (
      <Form>
        <fieldset>
          <h2>Sign up for an account</h2>
          <label htmlFor="email">
            email
            <input
              type="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={this.saveToState}
            />
          </label>
          <label htmlFor="name">
            name
            <input
              type="text"
              name="name"
              placeholder="name" value={name} onChange={this.saveToState} />
          </label>
          <label htmlFor="password">
            password
            <input
              type="password"
              name="password"
              placeholder="password" value={password} onChange={this.saveToState} />
          </label>
          <button type="submit">Sign Up!</button>
        </fieldset>
      </Form>
    );
  }
}

export default SignUp;
