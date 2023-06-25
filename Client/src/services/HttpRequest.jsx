import axiosClient from "./configApi";

const graphQLRequest = async (data) => {
  if (localStorage.getItem('accessToken')) {
    try {
      const response = await axiosClient({
        url: "",
        method: "post",
        data: data,
      });
      return response.data;

    } catch (error) {
      return error;
    }
  }
  return null
};

export default graphQLRequest;

