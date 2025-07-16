const address = "http://localhost:3000/api/data";

export async function getMonthData(year, month) {
    return fetch(`${address}?year=${year}&month=${month}`)
        .then((response) => response.json())
        .catch((error) => {
            console.error("Error fetching month data:", error);
            throw error;
        });
}
export async function putMonthData(data) {
    return fetch(`${address}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to update month data");
            }
            return response.json();
        })
        .catch((error) => {
            console.error("Error updating month data:", error);
            throw error;
        });
}
export async function postMonthData(data) {
    return fetch(`${address}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to add month data");
            }
            return response.json();
        })
        .catch((error) => {
            console.error("Error adding month data:", error);
            throw error;
        });
}
export async function deleteMonthData(data) {
    return fetch(`${address}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to delete month data");
            }
            return response.json();
        })
        .catch((error) => {
            console.error("Error deleting month data:", error);
            throw error;
        });
}
//API가 있는 척
export async function getExpenseByMonth(year, month) {
    const monthData = await getMonthData(year, month);
    const categoryData = {};
    let total = 0;
    monthData.forEach((item) => {
        if (item.type === "expense") {
            total += item.amount;
            categoryData[item.category] =
                (categoryData[item.category] || 0) + item.amount;
        }
    });
    const sortedCategories = Object.entries(categoryData)
        .sort((a, b) => b[1] - a[1])
        .map(([category, amount]) => ({ category, amount }));
    return {
        data: sortedCategories,
        total: total,
    };
}
export async function getExpenseByCategory(year, month, category) {
    const yearMonthStack = Array.from({ length: 7 }, (_, i) => {
        let targetMonth = month - i;
        let targetYear = year;

        if (targetMonth <= 0) {
            targetMonth += 12;
            targetYear -= 1;
        }

        return { year: targetYear, month: targetMonth };
    });
    yearMonthStack.reverse();
    const targetCategoryStack = Array.from({ length: 7 }, async (_, i) => {
        const {year, month} = yearMonthStack[i];
        const monthData = await getMonthData(year, month);
        const categoryExpenses = monthData.filter(
            (item) => item.type === "expense" && item.category === category
        );
        const total = categoryExpenses.reduce(
            (sum, item) => sum + item.amount,
            0
        );
        return total;
    });
    const items = await Promise.all(targetCategoryStack);
    const max = Math.max(...items);
    const min = Math.min(...items);
    return { category, max, min, items };
}

export async function getRecentMonthCategoryData(year, month, category) {
    const monthData = await getMonthData(year, month);
    const categoryData = monthData.filter((item) => item.category === category);
    const total = categoryData.reduce((sum, item) => sum + item.amount, 0);
    return {
        data: categoryData,
        total: total,
    };
}
