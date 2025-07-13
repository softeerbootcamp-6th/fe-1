export const DropDown = (data) => {
  const dropDown = document.createElement("ul");
  dropDown.classList.add("drop-down");
  data.map((partData) => {
    const dropDownList = document.createElement("li");
    dropDownList.textContent = partData;
    dropDown.appendChild(dropDownList);
  });
  return dropDown;
};
