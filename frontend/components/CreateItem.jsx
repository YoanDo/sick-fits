import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney'

class CreateItem extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: ''
  };

  handleChange = (e) => {
    const { name, type, value } = e.target;
    // console.log({ name: name, type: type, value: value })
    // As the input value will be inported as a text, we need to change it when the type will be number
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val })
  }

  render() {
    return (
      <Form>
        <h2>Sell an Item.</h2>
        <fieldset>
          <label htmlFor="title">
            Title
            <input type="text" id="title" name="title" placeholder="Title" required value={this.state.title} onChange={this.handleChange} />
          </label>

          <label htmlFor="price">
            Price
            <input type="number" id="price" name="price" placeholder="Price" required value={this.state.price} onChange={this.handleChange} />
          </label>

          <label htmlFor="description">
            Description
            <textarea type="text" id="description" name="description" placeholder="Description" required value={this.state.description} onChange={this.handleChange} />
          </label>
        </fieldset>
      </Form>
    );
  }
}

export default CreateItem;
