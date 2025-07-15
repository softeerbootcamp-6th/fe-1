// // 가계부 데이터 관리 Store 클래스는 잠시... mock 서버가 생김으로써 미사용 합니다.

// import { initialData } from "../constants/dummy.js";
// import {
//   createTransaction as createTransactionApi,
//   updateTransaction as updateTransactionApi,
//   deleteTransaction as deleteTransactionApi,
//   getTransactions as getTransactionsApi,
// } from "../api/transaction.js";

// // 가계부 데이터 관리 Store 클래스
// class AccountBookStore {
//   constructor() {
//     this.transactions = [];
//     this.nextId = 1;
//     this.observers = []; // 상태 변경 관찰자들
//   }

//   // API에서 데이터를 가져와서 초기화
//   async initializeFromApi() {
//     try {
//       const apiTransactions = await getTransactionsApi();
//       this.transactions = apiTransactions.map((item) => ({
//         ...item,
//         id: parseInt(item.id, 10), // 문자열 ID를 숫자로 변환
//       }));

//       // nextId를 최대 ID + 1로 설정
//       if (this.transactions.length > 0) {
//         this.nextId = Math.max(...this.transactions.map((t) => t.id)) + 1;
//       }

//       this.notifyObservers();
//       console.log("Store initialized from API:", this.transactions);
//     } catch (error) {
//       console.error("API 초기화 실패, 로컬 데이터 사용:", error);
//       this.initializeData(initialData);
//     }
//   }

//   // 초기 데이터 설정 (fallback용)
//   initializeData(data) {
//     this.transactions = data.map((item) => ({
//       id: this.nextId++,
//       ...item,
//     }));
//     this.notifyObservers();
//   }

//   // 트랜잭션 추가
//   addTransaction(transaction) {
//     const newTransaction = {
//       id: String(this.nextId++),
//       ...transaction,
//     };

//     // 로컬에 추가
//     this.transactions.push(newTransaction);

//     // API에 저장 (비동기)
//     createTransactionApi(newTransaction).catch((error) => {
//       console.error("API 저장 실패:", error);
//     });

//     this.notifyObservers();
//     return newTransaction;
//   }

//   // 트랜잭션 수정
//   updateTransaction(id, updatedData) {
//     // 문자열로 전달된 ID를 숫자로 변환
//     const numId = typeof id === "string" ? parseInt(id, 10) : id;
//     const index = this.transactions.findIndex((t) => t.id === numId);
//     if (index !== -1) {
//       this.transactions[index] = {
//         ...this.transactions[index],
//         ...updatedData,
//       };
//       updateTransactionApi(numId, this.transactions[index]);
//       this.notifyObservers();
//       return this.transactions[index];
//     }
//     return null;
//   }

//   // 트랜잭션 삭제
//   deleteTransaction(id) {
//     // 문자열로 전달된 ID를 숫자로 변환
//     const numId = typeof id === "string" ? parseInt(id, 10) : id;
//     const index = this.transactions.findIndex((t) => t.id === numId);
//     if (index !== -1) {
//       const deleted = this.transactions.splice(index, 1)[0];
//       deleteTransactionApi(numId);
//       this.notifyObservers();
//       return deleted;
//     }
//     return null;
//   }

//   // 모든 트랜잭션 조회
//   getTransactions() {
//     return [...this.transactions];
//   }

//   // ID로 트랜잭션 조회
//   getTransactionById(id) {
//     // 문자열로 전달된 ID를 숫자로 변환
//     console.log("getTransactionById", id);
//     const numId = typeof id === "string" ? parseInt(id, 10) : id;
//     return this.transactions.find((t) => t.id === numId);
//   }

//   // 관찰자 패턴 - 상태 변경 구독
//   subscribe(observer) {
//     this.observers.push(observer);
//   }

//   // 관찰자 패턴 - 상태 변경 구독 해제
//   unsubscribe(observer) {
//     this.observers = this.observers.filter((obs) => obs !== observer);
//   }

//   // 관찰자들에게 변경 사항 알림
//   notifyObservers() {
//     this.observers.forEach((observer) => observer(this.transactions));
//   }
// }

// // Store 인스턴스 생성
// const accountBookStore = new AccountBookStore();

// // API에서 데이터를 가져와서 초기화 (비동기)
// accountBookStore.initializeFromApi();

// function initAccountBookStore() {
//   // window 객체에 등록 (전역 접근용)
//   window.accountBookStore = accountBookStore;
// }

// // Store 인스턴스 export
// export { accountBookStore, AccountBookStore };
