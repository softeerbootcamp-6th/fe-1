import { API_BASE_URL } from "../constants/baseUrl.js";

export async function getItems() {
  const res = await fetch(`${API_BASE_URL}/items`);
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
}

export async function addItem(newItem) {
  const res = await fetch(`${API_BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  });

  if (!res.ok) throw new Error("Failed to create item");
  return res.json();
}

export async function updateItem({ id, updatedItem }) {
  const res = await fetch(`${API_BASE_URL}/items/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedItem),
  });

  if (!res.ok) throw new Error("Failed to update item");
  return res.json();
}

export async function deleteItem(id) {
  const res = await fetch(`${API_BASE_URL}/items/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete item");
  return true;
}
