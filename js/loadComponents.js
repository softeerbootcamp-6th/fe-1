window.addEventListener("DOMContentLoaded", async () => {
  async function loadComponent(id, path) {
    const res = await fetch(path);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
  }

  // console.log("Loading components...");
  // await loadComponent("header-container", "../components/header.html");
  await loadComponent("input-form-container", "../components/input-form.html");
  //   await loadComponent("modal-container", "components/modal.html");
  //   await loadComponent("entry-list-container", "components/entry-list.html");

  const script = document.createElement("script");
  script.type = "module";
  script.src = "js/index.js";
  document.body.appendChild(script);
});
