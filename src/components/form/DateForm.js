export const DateForm = (input) => {
  const dateForm = document.createElement("div");
  dateForm.classList.add("date-form");
  dateForm.innerHTML = `
      <label for="date" class="light-12">일자</label>
      <input type="date" id="date" name="date" value="${
        input.date.toISOString().split("T")[0]
      }" class="semibold-12">
  `;
  return dateForm;
};
