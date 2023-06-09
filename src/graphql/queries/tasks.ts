export const TASKS = `query MyQuery {
    tasksList {
      items {
        id
        name
        description
        state
        status
      }
    }
  }`;

export const TASKS_LIST_FILTER = `query MyQuery($name: String) {
    tasksList(filter: {name: {contains: $name}}) {
      items {
        id
        description
        name
        state
        status
      }
    }
  }`;

// export const TASKS_LIST_FILTER = `query MyQuery ($name: String, $idUser: [String!]) {
//     tasksList(filter: {name: {contains: $name}, usersId: {in: $idUser}}) {
//       items {
//         id
//         name
//         state
//         status
//         description
//       }
//     }
//   }
//   `;

export const TASKS_LIST_USER_FILTER = `
query MyQuery($name: String, $email: String) {
    user(email: $email) {
      tasks(filter: {name: {contains: $name}}) {
        items {
          id
          name
          description
          state
          status
        }
      }
    }
  }
`;
