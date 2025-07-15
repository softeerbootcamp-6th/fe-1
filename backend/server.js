import express from "express";
import cors from "cors";
import fs from "fs/promises";

const app = express();
const PORT = 3000;

// 요청 로깅 미들웨어
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);

    // body가 있는 경우 출력 (POST, PUT, DELETE 등)
    if (req.body && Object.keys(req.body).length > 0) {
        console.log("Request Body:", JSON.stringify(req.body, null, 2));
    }

    next();
});

app.use(cors());
app.use(express.json());

const DB_FILE = "./data.json";

// 데이터 전체 조회 API
app.get("/api/data", async (req, res) => {
    const {year, month} = req.query;
    if(year && month){
        try {
            const data = JSON.parse(await fs.readFile(DB_FILE, "utf-8"));
            const yearData = data.find((item) => item.year === parseInt(year));
            if (!yearData) return res.status(404).send("Year not found");

            const monthData = yearData.months.find(
                (item) => item.month === parseInt(month)
            );
            if (!monthData) return res.status(404).send("Month not found");

            res.json(monthData.list);
        } catch (error) {
            console.error("Error reading data:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else{
        try {
            const data = await fs.readFile(DB_FILE, "utf-8");
            res.json(JSON.parse(data));
        } catch (error) {
            console.error("Error reading data:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});


// 데이터 추가 API
app.post("/api/data", async (req, res) => {
    const newData = req.body; //request body에서 새 데이터 가져오기
    try {
        // 파일 읽기 (fs.readFile 사용)
        const fileContent = await fs.readFile(DB_FILE, "utf-8");
        const currentData = JSON.parse(fileContent);

        // year 찾기
        const yearData = currentData.find((item) => item.year === newData.year);
        if (!yearData) return res.status(404).send("Year not found");

        // month 찾기
        let monthData = yearData.months.find(
            (item) => item.month === newData.month
        );
        if (!monthData) {
            monthData = { month: newData.month, list: [] };
            yearData.months.push(monthData);
        }

        // year, month 제외하고 list에 추가
        const { year, month, ...rest } = newData;
        monthData.list.push(rest);

        // 파일 쓰기
        await fs.writeFile(DB_FILE, JSON.stringify(currentData, null, 2));

        res.status(201).json({ message: "Added successfully", data: rest });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 데이터 삭제
app.delete("/api/data", async (req, res) => {
    const target = req.body;

    const data = JSON.parse(await fs.readFile(DB_FILE, "utf-8"));

    const yearData = data.find((item) => item.year === target.year);
    if (!yearData) return res.status(404).send("Year not found");

    const monthData = yearData.months.find((m) => m.month === target.month);
    if (!monthData) return res.status(404).send("Month not found");

    const beforeLength = monthData.list.length;

    monthData.list = monthData.list.filter(
        (entry) =>
            !(
                entry.date === target.date &&
                entry.type === target.type &&
                entry.description === target.description &&
                entry.paymentMethod === target.paymentMethod &&
                entry.category === target.category &&
                entry.amount === target.amount
            )
    );

    const afterLength = monthData.list.length;

    if (beforeLength === afterLength) {
        return res.status(404).send("Item not found");
    }

    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
    res.json({ message: "Deleted successfully" });
});

// 데이터 수정
app.put("/api/data", async (req, res) => {
    const { originalData, ...updatedData } = req.body;

    try {
        const data = JSON.parse(await fs.readFile(DB_FILE, "utf-8"));

        // originalData를 기준으로 기존 항목 찾기
        const yearData = data.find(
            (item) => item.year === originalData.Eventyear
        );
        if (!yearData) return res.status(404).send("Year not found");

        const monthData = yearData.months.find(
            (item) => item.month === originalData.Eventmonth
        );
        if (!monthData) return res.status(404).send("Month not found");

        const itemIndex = monthData.list.findIndex(
            (item) =>
                item.date === originalData.date &&
                item.type === originalData.type &&
                item.description === originalData.description &&
                item.paymentMethod === originalData.paymentMethod &&
                item.category === originalData.category &&
                item.amount === originalData.amount
        );

        if (itemIndex === -1) {
            return res.status(404).send("Item not found");
        }

        // year, month 제외하고 새로운 데이터로 교체
        const { year, month, ...newItemData } = updatedData;
        monthData.list[itemIndex] = newItemData;

        await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
        res.json({ message: "Updated successfully", data: newItemData });
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
