import graphQLRequest from "../services/HttpRequest";

export const notesLoader = async ({ params }) => {
  const { folderId } = params;
  const query = `query Folder($folderId: String) {
      folder(folderId: $folderId) {
        id
        name
        notes {
          id
          content
          updatedAt
        }
      }
    }`;

  try {
    const res = await graphQLRequest({
      query: query,
      variables: {
        folderId: folderId,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const noteLoader = async ({ params }) => {
  const { noteId } = params;
  const query = `query Note($noteId: String) {
    note(noteId: $noteId) {
      id
      content
    }
  }`;

  try {
    const res = await graphQLRequest({
      query: query,
      variables: {
        noteId: noteId,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const addNewNote = async ({ params, request }) => {
  const newNote = await request.formData();
  const formDataObj = {};
  newNote.forEach((value, key) => {
    formDataObj[key] = value;
  });
  const query = `mutation AddNote($content: String!, $folderId: ID!) {
    addNote(content: $content, folderId: $folderId) {
      content
      id
    }
  } `;

  try {
    const res = await graphQLRequest({
      query: query,
      variables: formDataObj,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const updateNote = async ({ params, request }) => {
  const updateNote = await request.formData();

  const formDataObj = {};
  updateNote.forEach((value, key) => {
    formDataObj[key] = value;
  });
  const query = `mutation UpdateNote($id: String!, $content: String!) {
    updateNote(id: $id, content: $content) {
      id
      content
    }
  } `;

  try {
    const res = await graphQLRequest({
      query: query,
      variables: formDataObj,
    });
    return res;
  } catch (error) {
    return error;
  }
};
