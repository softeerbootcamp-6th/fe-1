const SERVER_URL = "http://localhost:3001";

export const ListApi = {
  getList: () => {
    return fetch(`${SERVER_URL}/list`).then((response) => {
      if (!response.ok) throw new Error("get fail!");
      return response.json();
    });
  },
  postList: (newItem) => {
    return fetch(`${SERVER_URL}/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    }).then((response) => {
      if (!response.ok) throw new Error("post fail!");
      return response.json();
    });
  },
};
