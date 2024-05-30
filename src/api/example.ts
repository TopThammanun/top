import apiBase from "./base";

const exampleAPI = {
  getExample() {
    return apiBase.get({
      url: `/`,
    });
  },
};

export default exampleAPI;
