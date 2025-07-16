const address = "http://localhost:3000/api/data";

export async function getMonthData(year, month){
    return fetch(`${address}?year=${year}&month=${month}`)
        .then(response => response.json())
        .catch(error => {
            console.error("Error fetching month data:", error);
            throw error;
        });
}
export async function putMonthData(data){
    return fetch(`${address}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to update month data");
            }
            return response.json();
        })
        .catch(error => {
            console.error("Error updating month data:", error);
            throw error;
        });
}
export async function postMonthData(data){
    return fetch(`${address}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to add month data");
            }
            return response.json();
        })
        .catch(error => {
            console.error("Error adding month data:", error);
            throw error;
        });
}
export async function deleteMonthData(data){
    return fetch(`${address}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to delete month data");
            }
            return response.json();
        })
        .catch(error => {
            console.error("Error deleting month data:", error);
            throw error;
        });
}