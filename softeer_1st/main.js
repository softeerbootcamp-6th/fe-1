import { Header } from "./components/Header.js";
import { router } from "./router.js";

Header();
document.addEventListener("DOMContentLoaded", () => router("home"));
