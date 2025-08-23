import { gql } from '@apollo/client';

export const GET_USER = gql`
  query ($login: String!) {
    user(login: $login) {
      name
      login
      avatarUrl
      bio
      url
      location
      websiteUrl
      company
      
      repositories(first: 100) {
        totalCount
        nodes {
          name
          description
          stargazerCount
          forkCount
          url
          languages(first: 5) {
            edges {
              node {
                name
              }
              size
            }
          }
        }
      }
      followers(first: 5) {
        totalCount
        nodes {
          id
          login
          avatarUrl
          url
        }
      }
      following {
        totalCount
      }
      gists {
        totalCount
      }
    }
  }
`;

// Separate query for followers to avoid issues
export const GET_USER_FOLLOWERS = gql`
  query ($login: String!) {
    user(login: $login) {
      followers(first: 10) {
        totalCount
        nodes {
          id
          login
          name
          avatarUrl
          url
          bio
        }
      }
    }
  }
`;