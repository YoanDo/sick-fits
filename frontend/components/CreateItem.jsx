import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
// display error message 👇
import ErrorMessage from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
mutation CREATE_ITEM_MUTATION(
  $title: String!
  $description: String!
  $price: Int!
  $image: String
  $largeImage: String
){
  createItem(
    title: $title
    description: $description
    price: $price
    image: $image
    largeImage: $largeImage
  ) {
    id
  }
}
`;

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
    // As the input value will be imported as a text, we need to change it when the type will be number
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val })
  }

  uploadFile = async e => {
    console.log('uploading file ...', e.target.files)
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    // 👇 Necessary for cloudinary, should fit the upload presets settings
    data.append('upload_preset', 'Sickfits');
    // dyub4bz6x = my username on cloudinary
    const res = await fetch('https://api.cloudinary.com/v1_1/dyub4bz6x/image/upload', {
      method: 'POST',
      body: data
    });
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });


  }

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form onSubmit={async e => {
            //Prevent the form from submitting
            e.preventDefault();
            //call the mutation
            const res = await createItem();
            //change them to the single item page
            console.log(res)
            Router.push({
              pathname: '/item',
              query: { id: res.data.createItem.id }
            })
          }}>
            <ErrorMessage error={error} />
            {/* the bellow disabled will only works if loading is true and prevent the user from using the fieldset */}
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Image
            <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an image"
                  required
                  onChange={this.uploadFile} />
                {this.state.image && <img src={this.state.image} alt="upload" width="200" />}
              </label>
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
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}</Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
