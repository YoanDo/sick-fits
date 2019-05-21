import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!,
    $name: String!,
    $password: String!
  ){
    signup(
      email: $email,
      name: $name,
      password: $password
    ){
      id
      email
      name
    }
  }

`

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
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}>{(signup, { error, loading }) => {
          return (
            <Form method="post" onSubmit={async e => {
              e.preventDefault();
              const res = await signup();
              console.log(res);
              this.setState({
                name: '',
                email: '',
                password: ''
              })
            }}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign up for an account</h2>
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
                <label htmlFor="name">
                  name
                  <input
                    type="text"
                    name="name"
                    placeholder="name" value={name} onChange={this.saveToState}
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
                <button type="submit">Sign Up!</button>
              </fieldset>
            </Form>
          )
        }}</Mutation>
    );
  }
}

export default SignUp;
