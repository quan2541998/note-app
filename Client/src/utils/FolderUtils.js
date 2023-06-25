import graphQLRequest from "../services/HttpRequest";

export const foldersLoader = async () => {
  const query = `query Folders {
      folders {
        id
        name
        createdAt
      }
    }`;

  try {
    const res = await graphQLRequest({ query: query });
    return res;
  } catch (error) {
    return error;
  }
};

export const addNewFolder = async (newFolder) => {
  const query = `mutation AddFolder($name: String!) {
    addFolder(name: $name) {
      name
      author {
        name
        uid
      }
    }
  }`;

  try {
    const res = await graphQLRequest({
      query: query,
      variables: { name: newFolder.name },
    });
    return res;
  } catch (error) {
    return error;
  }
};
