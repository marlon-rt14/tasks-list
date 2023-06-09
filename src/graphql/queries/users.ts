export const USER_BY_EMAIL = `
query MyQuery($email: String) {
    user(email: $email) {
      id
      firstName
      lastName
      email
      is8base
      origin
      roles {
        items {
          id
          name
          description
        }
      }
      status
    }
  }
`;
