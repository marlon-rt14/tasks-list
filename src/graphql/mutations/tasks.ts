export const CREATE_TASK = `mutation MyMutation($name: String, $description: String) {
    taskCreate(data: {name: $name, description: $description}) {
      id
      name
      description
      status
      state
    }
  }`;

export const DELETE_TASK = `mutation MyMutation($id: ID) {
    taskDelete(data: {id: $id}) {
      success
    }
  }`;

export const UPDATE_TASK = `
mutation MyMutation($id: ID, $name: String, $description: String, $state: String) {
    taskUpdate(data: {id: $id, name: $name, description: $description, state: $state}) {
        id
        name
        description
        state
        status
    }
  }
  `;
