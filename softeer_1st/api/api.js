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
        const { year, month } = yearMonthStack[i];
        try {
            const monthData = await getMonthData(year, month);
            const categoryExpenses = monthData.filter(
                (item) => item.type === "expense" && item.category === category
            );
            const total = categoryExpenses.reduce(
                (sum, item) => sum + item.amount,
                0
            );
            return total;
        } catch (error) {
            console.error(`No data found for ${year}-${month}:`, error);
            return 0; // Return 0 if there's an error
        }
    });
    const items = await Promise.all(targetCategoryStack);
    const max = Math.max(...items);
    const min = Math.min(...items);
    return { category, max, min, items };
}

export async function getRecentMonthCategoryData(year, month, category) {
    //목표: date, items만 넘겨주기. items는 expense중 특정 카테고리만.
    const monthData = await getMonthData(year, month);
    const categoryData = monthData.filter((item) => item.category === category && item.type === "expense");
    const grouped = {};
    categoryData.forEach((item) => {
        const dateKey = `${item.date}`;
        if (!grouped[dateKey]) {
            grouped[dateKey] = [];
        }
        const {date, ...itemsWithoutDate} = item;
        grouped[dateKey].push(itemsWithoutDate);
    });
    const processedData = [];
    Object.keys(grouped).forEach((date) => {
        processedData.push({
            date: Number(date),
            items: grouped[date],
        });
    });
    return processedData;
}
