// Dark Lite

const button = document.querySelector(".dark-light");
(function () {
    let onpageLoad = localStorage.getItem("theme");
    if (onpageLoad === "light-theme") {
        document.body.classList.add("light-theme");
    }
})();


function themeToggle() {
    let element = document.body;
    element.classList.toggle("light-theme");

    let theme = localStorage.getItem("theme");
    if (theme && theme === "light-theme") {
        localStorage.setItem("theme", "");
    } else {
        localStorage.setItem("theme", "light-theme");
    }
}
