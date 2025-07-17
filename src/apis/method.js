import { API_BASE_URL } from "../constants/baseUrl.js";

export async function getMetohds() {
  const res = await fetch(`${API_BASE_URL}/method`);
  if (!res.ok) throw new Error("Failed to fetch method");
  return res.json();
}

export async function addMethod(newMethod) {
  const res = await fetch(`${API_BASE_URL}/method`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMethod),
  });

  if (!res.ok) throw new Error("Failed to create item");
  return res.json();
}

export async function deleteMethod(id) {
  const res = await fetch(`${API_BASE_URL}/method/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete item");
  return true;
}
