import {expenseCategories, incomeCategories} from '../../../shared/constants/categories.js';
import {addCommaFormatter} from '../util/commaFormatter.js';
import {bindValidation} from '../util/formValidator.js';
import {showModal} from '../../../shared/components/modal.js';
import {PostDummyData, PuTDummyData} from '../../../shared/data/dummyData.js';

// 금액의 부호를 확인하는 함수
const isExpense = (els) => els.signBtn.textContent === '-';

// 부호 버튼의 텍스트를 토글하는 함수
const toggleSign = (els) => {
    els.signBtn.textContent = isExpense(els) ? '+' : '-';
};

// 카테고리 셀렉트 박스를 채우는 함수
// 현재 부호에 따라 수입 또는 지출 카테고리를 채움
const fillCats = (els) => {
    // 카테고리 셀렉트 박스의 옵션을 초기화, 0번 인덱스인 "선택하세요"를 제외하고 모두 제거
    while (els.catSel.options.length > 1) els.catSel.remove(1);
    (isExpense(els) ? expenseCategories : incomeCategories).forEach(({
                                                                         value,
                                                                         label
                                                                     }) => els.catSel.appendChild(new Option(label, value)));
};

// 폼 요소들을 선택하는 함수
const selectFormElements = (formEl) => {
    return {
        date: formEl.querySelector('#form-date'),
        signBtn: formEl.querySelector('#form-sign'),
        catSel: formEl.querySelector('#form-category'),
        methSel: formEl.querySelector('#form-method'),
        amtInp: formEl.querySelector('#form-amount'),
        memoInp: formEl.querySelector('#form-memo'),
        submit: formEl.querySelector('.submit-btn')
    };
};

// 데이터 생성
// 데이터 생성 - 기존 ID 유지 가능하도록 수정
const generateData = (els, existingId = null) => {
    return {
        id: existingId || crypto.randomUUID(), // 기존 ID가 있으면 사용, 없으면 새로 생성
        date: els.date.value,
        sign: isExpense(els) ? '-' : '+',
        amount: +els.amtInp.value.replace(/,/g, ''),
        memo: els.memoInp.value.trim(),
        category: {
            value: els.catSel.value,
            text: els.catSel.selectedOptions[0].textContent
        },
        method: {
            value: els.methSel.value,
            text: els.methSel.selectedOptions[0].textContent
        },
    };
}

const resetForm = (els) => {
    // 폼 요소를 초기화
    els.memoInp.value = els.amtInp.value = '';
    els.catSel.selectedIndex = els.methSel.selectedIndex = 0;
    // 날짜 입력 필드는 오늘 날짜로 설정
    els.date.value = new Date().toISOString().split('T')[0];
    // 부호 버튼은 기본값인 '-'로 설정
    els.signBtn.textContent = '-';
}

// 새 결제수단 추가 핸들러 함수를 밖으로 분리
const handleAddNewMethod = (methodSelect, newMethod) => {
    // 이미 있는 결제수단인지 확인
    const exists = [...methodSelect.options].some(o => o.textContent.toLowerCase() === newMethod.toLowerCase());
    if (exists) return;

    // 새 결제수단을 추가할 때는 'custom-' 접두사를 붙여 고유한 ID를 생성
    const customId = `custom-${crypto.randomUUID()}`;
    // 사용자로부터 입력받은 이름과 ID를 사용하여 새로운 옵션 생성
    const opt = new Option(newMethod, customId);
    // 결제수단 셀렉트 박스에 새 옵션을 추가하고 선택 상태로 설정
    methodSelect.insertBefore(opt, methodSelect.lastElementChild);
    opt.selected = true;
};

// 폼에 선택한 엔트리가 있다면 해당 엔트리의 데이터를 폼에 채우는 함수
const fillFormWithSelectedEntryState = ({formEl, selectedEntryState}) => {
    const selectedEntry = selectedEntryState.selectedEntry;
    if (!selectedEntry) return;

    const els = selectFormElements(formEl);
    els.date.value = selectedEntry.date;
    els.signBtn.textContent = selectedEntry.sign;
    // 카테고리 옵션을 부호에 따라 채움
    fillCats(els);

    els.amtInp.value = selectedEntry.amount.toLocaleString('ko-KR');
    els.memoInp.value = selectedEntry.memo;
    els.methSel.value = selectedEntry.method.value;
    els.catSel.value = selectedEntry.category.value;

    // 폼 요소가 입력될 때 유효성 검사를 수행하고, 유효한 경우에만 제출 버튼을 활성화
    bindValidation([els.date, els.amtInp, els.memoInp, els.methSel, els.catSel], els.submit);
}


export const initFormView = ({formEl, summaryStore, selectedEntryStore}) => {
    // 폼 요소에서 필요한 요소들을 선택
    const els = selectFormElements(formEl);

    // 날짜 입력 필드의 초기값을 오늘 날짜로 설정
    els.date.value = new Date().toISOString().split('T')[0];

    // 금액 입력 필드에 천 단위 구분 기호를 추가하는 포맷터를 적용
    addCommaFormatter(els.amtInp);

    // 부호에 따라 카테고리 옵션을 채우는 함수 호출
    fillCats(els);

    // 폼 요소가 입력될 때 유효성 검사를 수행하고, 유효한 경우에만 제출 버튼을 활성화
    bindValidation([els.date, els.amtInp, els.memoInp, els.methSel, els.catSel], els.submit);

    selectedEntryStore.subscribe((state) => {
        fillFormWithSelectedEntryState({formEl, selectedEntryState: state})
    });

    // 부호 버튼 클릭 시 부호를 토글하고 카테고리 옵션을 다시 채움
    els.signBtn.addEventListener('click', () => {
        toggleSign(els);
        fillCats(els);
    });

    // 결제수단 방식에서 '추가'를 선택했을 때 모달을 띄워 새 결제수단을 추가
    els.methSel.addEventListener('change', e => {
        if (e.target.value !== 'add-form-method') return;
        // '추가' 옵션이 선택되면 모달을 띄워 새 결제수단을 입력받음
        // 모달 내의 추가 버튼 클릭 시 showModal의 파라미터로 지정한 함수가 호출됨
        // 분리된 함수를 참조하여 모달에 전달
        showModal(newMeth => handleAddNewMethod(els.methSel, newMeth));
        // 모달이 닫히면 결제수단 셀렉트 박스의 선택을 초기화
        els.methSel.selectedIndex = 0;
    });

    // 폼 제출 이벤트 핸들러
    formEl.addEventListener('submit', e => {
        e.preventDefault();

        // 선택된 엔트리가 있다면 PUT 요청을 통해 업데이트
        const selectedEntry = selectedEntryStore.getState().selectedEntry;
        const data = generateData(els, selectedEntry.id);
        if (selectedEntry) {
            // 선택된 엔트리가 있다면 PUT 요청으로 업데이트
            PuTDummyData(selectedEntry.id, data).then(() => {
                // store에 선택된 항목을 업데이트
                selectedEntryStore.dispatch('ENTRY/SELECT/CLEAR', data);
                resetForm(els);
                summaryStore.dispatch('ENTRY/UPDATE', data);
            }).catch(err => {
                console.error('Error updating entry:', err);
            });
            return;
        }


        // 서버에 데이터를 전송하고, 성공적으로 추가되면 상태를 업데이트
        PostDummyData(data).then(() => {
            // store에 새 항목을 추가
            summaryStore.dispatch('ENTRY/ADD', data);
            resetForm(els);
        }).catch(err => {
            console.error('Error adding entry:', err);
        });
    });

};