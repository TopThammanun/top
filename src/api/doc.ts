import apiBase from "./base";

const docAPI = {
  getAll() {
    return apiBase.get({
      url: `/doc/all`,
    });
  },
  getById(id: any) {
    return apiBase.get({
      url: `/doc/${id}`,
    });
  },
  create(req: { data: any }) {
    return apiBase.post({
      data: req.data,
      url: `/doc/create`,
    });
  },
  update(id: string, req: { data: any }) {
    return apiBase.put({
      data: req.data,
      url: `/doc/update/${id}`,
    });
  },
};

export default docAPI;
