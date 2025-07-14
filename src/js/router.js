import { Header } from "../components/index.js";

class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.currentModule = null;
    this.headerRendered = false;

    // 브라우저 뒤로가기/앞으로가기 이벤트 처리
    window.addEventListener("popstate", () => {
      this.handleRoute(location.pathname);
    });
  }

  // 라우트 등록
  addRoute(path, config) {
    this.routes.set(path, config);
  }

  // 공통 헤더 렌더링
  renderHeader(selectedNav = "home") {
    const headerContainer = document.getElementById("header-container");
    if (headerContainer) {
      // 기존 헤더 제거
      headerContainer.innerHTML = "";

      // 새 헤더 생성
      const header = Header({
        selectedNav: selectedNav,
        onChangeMonth: this.handleMonthChange.bind(this),
      });

      headerContainer.appendChild(header);
    }
  }

  // 월 변경 핸들러 (홈 페이지에서만 필요)
  handleMonthChange() {
    if (
      this.currentRoute === "/" &&
      this.currentModule &&
      this.currentModule.renderHistory
    ) {
      this.currentModule.renderHistory();
    }
  }

  // 현재 페이지의 main 영역만 정리
  cleanupCurrentPage() {
    const mainContainer = document.getElementById("main-container");
    if (mainContainer) {
      mainContainer.innerHTML = "";
    }
  }

  // HTML 템플릿을 로드하고 main 내용만 추출
  async loadTemplate(templatePath) {
    try {
      const response = await fetch(templatePath);
      if (!response.ok) {
        throw new Error(`Failed to load template: ${response.status}`);
      }

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // main 태그 내용만 추출
      const mainElement = doc.querySelector("main");
      if (mainElement) {
        return mainElement.outerHTML;
      } else {
        // main 태그가 없으면 전체 내용 반환
        return html;
      }
    } catch (error) {
      console.error("Error loading template:", error);
      return "<main><div>페이지를 로드할 수 없습니다.</div></main>";
    }
  }

  // JavaScript 모듈을 동적으로 로드하고 실행
  async loadModule(modulePath) {
    try {
      // 기존 모듈 정리
      if (this.currentModule) {
        // 모듈에 cleanup 함수가 있다면 실행
        if (typeof this.currentModule.cleanup === "function") {
          this.currentModule.cleanup();
        }
      }

      // import()를 사용해 동적 모듈 로드
      // 캐시 무효화를 위해 timestamp 추가
      const timestamp = Date.now();
      const module = await import(`${modulePath}?t=${timestamp}`);

      this.currentModule = module;
      return module;
    } catch (error) {
      console.error("Error loading module:", error);
      return null;
    }
  }

  // 애플리케이션 레이아웃 초기화
  initializeLayout() {
    const app = document.getElementById("app");
    if (app && !this.headerRendered) {
      app.innerHTML = `
        <div id="header-container"></div>
        <div id="main-container"></div>
      `;
      this.headerRendered = true;
    }
  }

  // 라우트 처리
  async handleRoute(path) {
    const route = this.routes.get(path);

    if (!route) {
      console.error(`Route not found: ${path}`);
      this.handleRoute("/"); // 기본 라우트로 리다이렉트
      return;
    }

    // 애플리케이션 레이아웃 초기화
    this.initializeLayout();

    // 현재 페이지의 main 영역만 정리
    this.cleanupCurrentPage();

    try {
      // 공통 헤더 렌더링 (선택된 네비게이션에 따라)
      const navMap = {
        "/": "home",
        "/calendar": "calendar",
        "/chart": "chart",
      };
      this.renderHeader(navMap[path] || "home");

      // HTML 템플릿 로드 (main 부분만)
      const template = await this.loadTemplate(route.template);
      const mainContainer = document.getElementById("main-container");
      mainContainer.innerHTML = template;

      // 페이지 제목 설정
      if (route.title) {
        document.title = route.title;
      }

      // JavaScript 모듈 로드 및 실행
      if (route.module) {
        await this.loadModule(route.module);
      }

      this.currentRoute = path;

      // 커스텀 onLoad 콜백 실행
      if (route.onLoad && typeof route.onLoad === "function") {
        route.onLoad();
      }
    } catch (error) {
      console.error("Error handling route:", error);
      const mainContainer = document.getElementById("main-container");
      mainContainer.innerHTML =
        "<main><div>페이지 로드 중 오류가 발생했습니다.</div></main>";
    }
  }

  // 페이지 이동
  navigate(path) {
    if (path === this.currentRoute) {
      return;
    }

    // 브라우저 히스토리에 추가
    history.pushState(null, "", path);
    this.handleRoute(path);
  }

  // 현재 라우트 반환
  getCurrentRoute() {
    return this.currentRoute;
  }

  // 라우터 시작
  start() {
    const currentPath = location.pathname;
    this.handleRoute(currentPath);
  }
}

// 전역 라우터 인스턴스 생성
const router = new Router();

// 라우트 설정
router.addRoute("/", {
  template: "/src/views/home.html",
  module: "/src/js/home.js",
  title: "Wise Wallet - 홈",
});

router.addRoute("/calendar", {
  template: "/src/views/calandar.html",
  module: "/src/js/calandar.js",
  title: "Wise Wallet - 캘린더",
});

router.addRoute("/chart", {
  template: "/src/views/chart.html",
  module: "/src/js/chart.js",
  title: "Wise Wallet - 차트",
});

export default router;
