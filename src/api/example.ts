import apiBase from "./base";

const exampleAPI = {
    getExample() {
        return apiBase.get({
            url: `/example`
        });
    }
};

export default exampleAPI;
