const menuBar = document.querySelector(".menu-bar")
const menuBarText = document.querySelector(".menu-bar-text")

function showMenuBar(){
    if (menuBar.style.display == "flex"){
        menuBar.style.display = "none"
        menuBarText.style.display = "none"
    }
    else {
        menuBar.style.display = "flex"
        menuBarText.style.display = "flex"
    }
}