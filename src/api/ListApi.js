const SERVER_URL = "http://localhost:3001";
export const ListApi = {
  getList: () => {
    return fetch(`${SERVER_URL}/list`)
      .then((response) => {
        if (!response.ok) throw new Error("get fail!");
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
