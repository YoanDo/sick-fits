import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Head from 'next/head';
import ErrorMessage from './ErrorMessage';

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!){
    item(where: {id: $id}){
      id
      title
      description
      largeImage
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
          const { largeImage, title } = data.item;
          console.log(data)
          return <SingleItemStyles>
            <Head>
              <title>
                Sick fits | {title}
              </title>
            </Head>
            <img src={largeImage} alt={title} />
            Single item compo {id}
          </SingleItemStyles>
        }}
      </Query>
    );
  }
}

export default SingleItem;
