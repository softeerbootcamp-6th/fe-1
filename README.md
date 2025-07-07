# fe-1
# 📒 가계부 프로젝트

## ✅ 1. 프로젝트 개요

- [ ] 본 프로젝트는 **ES Modules** 기반의 가계부 SPA입니다.
- [ ] Vite 등 빌드 도구 없이, **vanilla JS의 import/export**를 활용합니다.

---

## ✅ 2. 기능 정의 (1주차)

### 1. ESM 형식으로 프로젝트 구성
- [ ] `type="module"`을 사용하여 import/export 모듈화.

### 2. DB 설계 (Mock Data: JSON)
- [ ] mock data를 정의한다.

예시:

```js
export const transactions = [
  { id: 1, type: 'income', amount: 50000, description: '월급' },
  { id: 2, type: 'expense', amount: 15000, description: '점심식사' },
];
```
### 3. 함수 설계
- [ ] 함수 Input/Output을 명확히 정의하고 이유를 기술한다.

함수명	역할	input	output	이유
- [ ]renderHeader()	헤더 렌더링	없음	HTMLElement	Header 모듈화
- [ ]handleAddTransaction(event)	폼 submit 처리	event	없음	데이터 추가 후 렌더링

### 4. 폴더 구조
- [ ] 아래 폴더 구조를 생성한다.

```bash
📁 src/
  📁 pages/
    📜 Main.js         # 메인 페이지
    📜 Calender.js     # 달력 페이지
    📜 Stats.js        # 통계 페이지
  📁 components/
    📜 Header.js       # 헤더 컴포넌트
    📜 Form.js         # 가계부 추가 폼
    📜 DatesCard.js    # 요일별 지출/수입 카드
    📜 CostList.js     # DatesCard 내부 리스트
    📜 DonutGraph.js   # 월별 소비 원그래프
    📜 DotGraph.js     # 요일별 소비 점그래프
  📁 styles/
    📜 (추후 컴포넌트별 or 통합 스타일 파일)
  📜 index.html
  📜 main.js
  📜 router.js
```
### 5. 헤더 컴포넌트 제작
- [ ] logo(main으로 이동), nav button(main, calender, stats) 포함.

- [ ] 각 페이지로 이동하는 버튼은 router.js를 통해 main 영역 전환.

### 6. Form 제작 (POST 기능)
- [ ] 사용자가 입력한 가계부 데이터를 mock DB에 추가.

- [ ] template literal로 DOM 생성 후 main에 append.

### 7. Main 컴포넌트 제작
- [ ] mock data를 불러와 화면에 렌더링.

- [ ] DatesCard, CostList 등과 조합.

## ✅ 3. 향후 계획 (2주차)
- [ ] CSS 스타일링 및 디자인 가이드 적용

- [ ] 컴포넌트별 스타일링

- [ ] DonutGraph, DotGraph 기능 완성

- [ ] 전체 페이지 통합 및 UI/UX 개선

## ✅ 4. 기술 스택
 HTML/CSS/JavaScript (ES Modules)

 별도의 빌드 도구 없이 순수 Vanilla JS

 DOM 조작 및 template literal 중심 개발

 addEventListener 기반 이벤트 처리

