const DUMMY_DATA_URL = 'http://localhost:1080/summaries';

// 더미데이터를 로드하는 함수
export const loadDummyData = () =>
    fetch(DUMMY_DATA_URL)
        .then(res => (res.ok ? res.json() : []))
        .catch(err => {
            return [];
        });

// 더미데이터를 서버에 POST 요청으로 추가하는 함수
export const PostDummyData = (data) =>
    fetch(DUMMY_DATA_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(res => (res.ok ? res.json() : Promise.reject(res)))
        .catch(err => {
            return Promise.reject(err);
        });

// 더미데이터를 서버에 PUT이나 PATCH 요청으로 수정하는 함수, DELETE 요청으로 삭제하는 함수 구현 예정


// 더미데이터를 서버에 DELETE 요청으로 삭제하는 함수
export const DeleteDummyData = (id) =>
    fetch(`${DUMMY_DATA_URL}/${id}`, {
        method: 'DELETE',
    })
        .then(res => (res.ok ? res.json() : Promise.reject(res)))
        .catch(err => {
            return Promise.reject(err);
        });