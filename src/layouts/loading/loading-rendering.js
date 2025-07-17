export async function renderLoading() {
  const loadingHTML = `
    <div class="loading-container">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p class="loading-text">페이지를 로드하는 중...</p>
      </div>
    </div>
  `;

  return loadingHTML;
}
