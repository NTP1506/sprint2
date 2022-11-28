import axiosClient from "./axiosClient";

const userApi = {
  getAll: () => {
    const url = "/Users/GetAll";
    return axiosClient.get(url); 
  },

  // edit, remove, ...
}
export default userApi;