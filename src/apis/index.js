const API_BASE_URL = "http://localhost:3001";

const get = async (url) => {
  const response = await fetch(`${API_BASE_URL}${url}`);
  return response.json();
};

const post = async (url, data) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const put = async (url, data) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const patch = async (url, data) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const del = async (url) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: "DELETE",
  });
  return response.json();
};

export { get, post, put, patch, del };
