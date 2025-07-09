const routes = {
    "#main": "../pages/main.html",
    "#calander": "../pages/calander.html",
    "#stats": "../pages/stats.html"    
};

export const loadPage = async () => {
    const hash = window.location.hash || "#main";
    const path = routes[hash] || routes["#main"];
    try{
        const res = await fetch(path);
        const html = await res.text();
        document.getElementById("view").innerHTML = html;
    } catch (error) {
        console.error("Error loading page:", error);
        document.getElementById("view").innerHTML = "<h1>Page not found</h1>";
    }
}