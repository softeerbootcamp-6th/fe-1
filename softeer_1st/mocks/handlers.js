import { http, HttpResponse } from "https://esm.sh/msw@2.10.4";
import transactions from "../backend/data.js";

const address = "/api/data";

export const handlers = [
    // GET ${address} - 전체 데이터 조회
    http.get(`${address}`, async () => {
        return HttpResponse.json(transactions);
    }),

    // GET ${address}/:year/:month - 특정 년월 데이터 조회
    http.get(`${address}/:year/:month`, async ({ params }) => {
        console.log("MSW: Fetching month data for:", params);

        const { year, month } = params;
        const yearData = transactions.find((t) => t.year === parseInt(year));

        if (!yearData) {
            return HttpResponse.json(
                { error: "Year not found" },
                { status: 404 }
            );
        }

        const monthData = yearData.months.find(
            (m) => m.month === parseInt(month)
        );
        if (!monthData) {
            return HttpResponse.json(
                { error: "Month not found" },
                { status: 404 }
            );
        }

        return HttpResponse.json(monthData.list);
    }),

    // POST ${address}/:year/:month - 특정 년월에 데이터 추가
    http.post(`${address}/:year/:month`, async ({ params, request }) => {
        const { year, month } = params;
        const newTransaction = await request.json();

        const yearInt = parseInt(year);
        const monthInt = parseInt(month);

        // year 찾기
        let yearData = transactions.find((t) => t.year === yearInt);
        if (!yearData) {
            yearData = { year: yearInt, months: [] };
            transactions.push(yearData);
        }

        // month 찾기 또는 생성
        let monthData = yearData.months.find((m) => m.month === monthInt);
        if (!monthData) {
            monthData = { month: monthInt, list: [] };
            yearData.months.push(monthData);
        }

        // 데이터 추가 (year, month는 URL에서 가져오므로 body에서 제외)
        monthData.list.push(newTransaction);

        return HttpResponse.json(
            { message: "Added successfully", data: newTransaction },
            { status: 201 }
        );
    }),

    // DELETE ${address}/:year/:month - 특정 년월의 특정 항목 삭제
    http.delete(`${address}/:year/:month`, async ({ params, request }) => {
        const { year, month } = params;
        const target = await request.json();

        const yearData = transactions.find((t) => t.year === parseInt(year));
        if (!yearData) {
            return HttpResponse.json(
                { error: "Year not found" },
                { status: 404 }
            );
        }

        const monthData = yearData.months.find(
            (m) => m.month === parseInt(month)
        );
        if (!monthData) {
            return HttpResponse.json(
                { error: "Month not found" },
                { status: 404 }
            );
        }

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
            return HttpResponse.json(
                { error: "Item not found" },
                { status: 404 }
            );
        }

        return HttpResponse.json({ message: "Deleted successfully" });
    }),

    // PUT ${address}/:year/:month - 특정 년월의 특정 항목 수정
    http.put(`${address}/:year/:month`, async ({ params, request }) => {
        const { year, month } = params;
        const { originalData, ...updatedData } = await request.json();

        const yearData = transactions.find((t) => t.year === parseInt(year));
        if (!yearData) {
            return HttpResponse.json(
                { error: "Year not found" },
                { status: 404 }
            );
        }

        const monthData = yearData.months.find(
            (m) => m.month === parseInt(month)
        );
        if (!monthData) {
            return HttpResponse.json(
                { error: "Month not found" },
                { status: 404 }
            );
        }

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
            return HttpResponse.json(
                { error: "Item not found" },
                { status: 404 }
            );
        }

        // 새로운 데이터로 교체
        monthData.list[itemIndex] = updatedData;

        return HttpResponse.json({
            message: "Updated successfully",
            data: updatedData,
        });
    }),
];
