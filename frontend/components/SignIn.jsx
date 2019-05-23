import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION(
    $email: String!,
    $password: String!
  ){
    signin(
      email: $email,
      password: $password
    ){
      id
      email
      name
    }
  }

`

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  saveToState = (e) => {
    const { name, type, value } = e.target;
    console.log({ name, type, value })
    this.setState({ [name]: value })
  }

  render() {
    const { email, password } = this.state
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
      >{(signup, { error, loading }) => {
        return (
          <Form method="post" onSubmit={async e => {
            e.preventDefault();
            const res = await signup();
            console.log(res);
            this.setState({
              email: '',
              password: ''
            })
          }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign in</h2>
              <ErrorMessage error={error} />
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
              <label htmlFor="password">
                password
                  <input
                  type="password"
                  name="password"
                  placeholder="password" value={password} onChange={this.saveToState}
                />
              </label>
              <button type="submit">Sign In!</button>
            </fieldset>
          </Form>
        )
      }}</Mutation>
    );
  }
}

export default SignIn;
