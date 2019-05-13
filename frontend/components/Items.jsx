import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

class Items extends Component {
  render() {
    return (
      <div>
        <p>I T E M S</p>
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, loading, error }) => {
            console.log(data, loading, error);
            if (loading) return <p>Loading</p>
            if (error) return <p>Error {error.message}</p>
            return <p>Hey I'm the child of query. <br />look at that {data.items[0].title}</p>;
          }}
        </Query>
      </div>
    );
  }
}

export default Items;
