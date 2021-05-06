import gql from 'graphql-tag'

export const QUERY_PROFILE_ME = gql`
  query QueryProfileMe($identifier: ID!) {
    user(id: $identifier) {
      id
      email
      username
    }
  }
`
