export const renderMain = (type = "doc") => {
  const main = document.createElement("main");
  main.id = "main";
  main.innerHTML = type;
  return main;
};
