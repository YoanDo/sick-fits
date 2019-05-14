import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
// display error message 👇
import ErrorMessage from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
      image
    }
  }
`;
const UPDATE_ITEM_MUTATION = gql`
mutation UPDATE_ITEM_MUTATION(
  $id: ID!
  $title: String
  $description: String
  $price: Int
  $image: String
){
  updateItem(
    id: $id
    title: $title
    description: $description
    price: $price
    image: $image
  ) {
    id
    title
    description
    price
    image
  }
}
`;

class UpdateItem extends Component {
  state = {
  };

  handleChange = (e) => {
    const { name, type, value } = e.target;
    // console.log({ name: name, type: type, value: value })
    // As the input value will be imported as a text, we need to change it when the type will be number
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val })
  }
  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    console.log('updating Item!');
    console.log(this.state)
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });
    console.log('Updated!')

  }

  render() {
    const { id } = this.props
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading ...</p>;
          if (!data.item) return <p>No data found for id {id}</p>
          const { title, description, price, image } = data.item
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, { loading, error }) => (
                <Form onSubmit={e => this.updateItem(e, updateItem)}>
                  <ErrorMessage error={error} />
                  {/* the bellow disabled will only works if loading is true and prevent the user from using the fieldset */}
                  <fieldset disabled={loading} aria-busy={loading}>
                    {image && <img src={image} alt="upload" width="" />}
                    <label htmlFor="title">
                      Title
            <input type="text" id="title" name="title" placeholder="Title" required defaultValue={title} onChange={this.handleChange} />
                    </label>

                    <label htmlFor="price">
                      Price
            <input type="number" id="price" name="price" placeholder="Price" required defaultValue={price} onChange={this.handleChange} />
                    </label>

                    <label htmlFor="description">
                      Description
            <textarea type="text" id="description" name="description" placeholder="Description" required defaultValue={description} onChange={this.handleChange} />
                    </label>
                    <button type="submit">Sav{loading ? 'ing' : 'e'} changes</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          )
        }}</Query>
    );
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
