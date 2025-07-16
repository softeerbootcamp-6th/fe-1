// API 클라이언트 유틸리티
const API_BASE_URL = "http://localhost:3002";

// 개발 환경 체크(localhost에서 실행되는 경우만 개발 환경으로 판단하기 위함)
const __DEV__ = window.location.hostname === "localhost";

// 기본 fetch 함수(endpoint, options) => 옵션 기본값 설정
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  if (__DEV__) {
    console.log(`🌐 API 요청: ${options.method || "GET"} ${url}`);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (__DEV__) {
      console.log(`✅ API 응답: ${url}`, data);
    }

    return data;
  } catch (error) {
    if (__DEV__) {
      console.error(`❌ API 요청 실패: ${url}`, error);
    }
    throw error;
  }
}

// 병렬 처리를 위한 함수(Promise.all을 활용함) => 쓰일지는 모르겠음..?
export async function parallelRequest(endpoints, options = {}) {
  if (__DEV__) {
    console.log(`🚀 병렬 API 요청 시작:`, endpoints);
  }

  const apiRequests = endpoints.map((endpoint) =>
    apiRequest(endpoint, options)
  );
  const apiResults = await Promise.all(apiRequests);

  if (__DEV__) {
    console.log(`✅ 병렬 API 요청 완료:`, apiResults);
  }

  return apiResults;
}
