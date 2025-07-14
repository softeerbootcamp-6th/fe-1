import { initialData } from "../constants/dummy.js";

// 가계부 데이터 관리 Store 클래스
class AccountBookStore {
  constructor() {
    this.transactions = [];
    this.nextId = 1;
    this.observers = []; // 상태 변경 관찰자들
  }

  // 초기 데이터 설정
  initializeData(data) {
    this.transactions = data.map((item) => ({
      id: this.nextId++,
      ...item,
    }));
    this.notifyObservers();
  }

  // 트랜잭션 추가
  addTransaction(transaction) {
    const newTransaction = {
      id: this.nextId++,
      ...transaction,
    };
    this.transactions.push(newTransaction);
    this.notifyObservers();
    return newTransaction;
  }

  // 트랜잭션 수정
  updateTransaction(id, updatedData) {
    // 문자열로 전달된 ID를 숫자로 변환
    const numId = typeof id === "string" ? parseInt(id, 10) : id;
    const index = this.transactions.findIndex((t) => t.id === numId);
    if (index !== -1) {
      this.transactions[index] = {
        ...this.transactions[index],
        ...updatedData,
      };
      this.notifyObservers();
      return this.transactions[index];
    }
    return null;
  }

  // 트랜잭션 삭제
  deleteTransaction(id) {
    // 문자열로 전달된 ID를 숫자로 변환
    const numId = typeof id === "string" ? parseInt(id, 10) : id;
    const index = this.transactions.findIndex((t) => t.id === numId);
    if (index !== -1) {
      const deleted = this.transactions.splice(index, 1)[0];
      this.notifyObservers();
      return deleted;
    }
    return null;
  }

  // 모든 트랜잭션 조회
  getTransactions() {
    return [...this.transactions];
  }

  // ID로 트랜잭션 조회
  getTransactionById(id) {
    // 문자열로 전달된 ID를 숫자로 변환
    const numId = typeof id === "string" ? parseInt(id, 10) : id;
    return this.transactions.find((t) => t.id === numId);
  }

  // 관찰자 패턴 - 상태 변경 구독
  subscribe(observer) {
    this.observers.push(observer);
  }

  // 관찰자 패턴 - 상태 변경 구독 해제
  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  // 관찰자들에게 변경 사항 알림
  notifyObservers() {
    this.observers.forEach((observer) => observer(this.transactions));
  }
}

// Store 인스턴스 생성 및 초기화
const accountBookStore = new AccountBookStore();
accountBookStore.initializeData(initialData);

// Store 인스턴스 export
export { accountBookStore, AccountBookStore };
