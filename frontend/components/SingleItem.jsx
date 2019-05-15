import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import ErrorMessage from './ErrorMessage';
import SingleItemStyles from './styles/SingleItemStyles'


const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!){
    item(where: {id: $id}){
      id
      title
      description
      largeImage
      price
    }
  }
`;

class SingleItem extends Component {
  render() {
    const { id } = this.props
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{
        id: id
      }}>
        {({ error, loading, data }) => {
          if (error) return <ErrorMessage error={error} />;
          if (loading) return <p>Loading</p>;
          if (!data.item) return <p>No item found for id: {id}</p>
          const { largeImage, title, description, price } = data.item;
          console.log(data)
          return <SingleItemStyles>
            <Head>
              <title>
                Sick fits | {title}
              </title>
            </Head>
            <img src={largeImage} alt={title} />
            <div className="details">
              <h2>{title}</h2>
              <p>{description}</p>
              <p>price : ${price}</p>
            </div>
          </SingleItemStyles>
        }}
      </Query>
    );
  }
}

export default SingleItem;
