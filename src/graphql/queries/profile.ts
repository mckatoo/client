import gql from 'graphql-tag'

export const QUERY_PROFILE_ME = gql`
  query QueryProfileMe {
    me {
      id
      username
      email
      role {
        name
      }
      blocked
    }
  }
`
