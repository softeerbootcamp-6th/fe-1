const paymentDataStore = {
    paymentData: getDummyData(),

    addPaymentData(newData) {
        this.paymentData.push(newData);
        this.notifyPaymentDataUpdated();
    },

    deletePaymentData(id) {
        this.paymentData = this.paymentData.filter((data) => data.id !== id);
        this.notifyPaymentDataUpdated();
    },

    notifyPaymentDataUpdated() {
        document.dispatchEvent(new CustomEvent('paymentDataUpdated'));
    },
};

export default paymentDataStore;

function getDummyData() {
    return [
        {
            id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
            category: 'food',
            description: '편의점 간식 구매',
            paymentMethod: 'card',
            amount: -4500,
            paidAt: '2025-07-11',
            createdAt: '2025-07-11',
        },
        {
            id: 'b2c3d4e5-f6g7-8901-2345-678901bcdefg',
            category: 'transport',
            description: '지하철 정기권 충전',
            paymentMethod: 'transfer',
            amount: -55000,
            paidAt: '2025-07-10',
            createdAt: '2025-07-10',
        },
        {
            id: 'c3d4e5f6-g7h8-9012-3456-789012cdefgh',
            category: 'leisure',
            description: '넷플릭스 구독',
            paymentMethod: 'card',
            amount: -13500,
            paidAt: '2025-07-09',
            createdAt: '2025-07-09',
        },
        {
            id: 'd4e5f6g7-h8i9-0123-4567-890123defghi',
            category: 'shopping',
            description: '무신사 티셔츠 구매',
            paymentMethod: 'mobile',
            amount: -29000,
            paidAt: '2025-07-08',
            createdAt: '2025-07-08T16:05:35Z',
        },
        {
            id: 'e5f6g7h8-i9j0-1234-5678-901234efghij',
            category: 'salary',
            description: '7월 급여',
            paymentMethod: 'transfer',
            amount: 2800000,
            paidAt: '2025-07-07',
            createdAt: '2025-07-07T09:00:01Z',
        },
        {
            id: 'f6g7h8i9-j0k1-2345-6789-012345fghijk',
            category: 'living',
            description: '세탁소 이용',
            paymentMethod: 'cash',
            amount: -8000,
            paidAt: '2025-07-07',
            createdAt: '2025-07-07T13:22:45Z',
        },
        {
            id: 'g7h8i9j0-k1l2-3456-7890-123456ghijkl',
            category: 'health',
            description: '약국 감기약 구매',
            paymentMethod: 'card',
            amount: -6700,
            paidAt: '2025-07-06',
            createdAt: '2025-07-06T11:45:50Z',
        },
        {
            id: 'h8i9j0k1-l2m3-4567-8901-234567hijklm',
            category: 'other_income',
            description: '중고나라 거래 수익',
            paymentMethod: 'transfer',
            amount: 50000,
            paidAt: '2025-07-06',
            createdAt: '2025-07-06T19:11:00Z',
        },
        {
            id: 'i9j0k1l2-m3n4-5678-9012-345678ijklmn',
            category: 'allowance',
            description: '용돈 입금',
            paymentMethod: 'cash',
            amount: 100000,
            paidAt: '2025-07-05',
            createdAt: '2025-07-05T12:00:30Z',
        },
        {
            id: 'j0k1l2m3-n4o5-6789-0123-456789jklmno',
            category: 'uncategorized',
            description: '미지정 지출',
            paymentMethod: 'card',
            amount: -9900,
            paidAt: '2025-07-04',
            createdAt: '2025-07-04T18:48:00Z',
        },
    ];
}
