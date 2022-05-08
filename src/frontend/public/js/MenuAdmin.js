//Declaring variables

const buttons = {
    leftButton: document.querySelector("#left-button"),
    midButton: document.querySelector("#mid-button"),
    rightButton: document.querySelector("#right-button")
}
const bodyInfo = document.querySelector(".body-info");

function selectDateButton(index){
    switch(index){
        case 0:
            changingColor("#8CAAFD", "#FFFFFF", "#FFFFFF");
            break;
        case 1:
            changingColor("#FFFFFF", "#8CAAFD", "#FFFFFF");
            break;
        case 2:
            changingColor("#FFFFFF", "#FFFFFF", "#8CAAFD");
            break;
    }
}

function changingColor(b1, b2, b3){
    bodyInfo.style.display = "flex";
    buttons.leftButton.style.backgroundColor = b1;
    buttons.midButton.style.backgroundColor = b2;
    buttons.rightButton.style.backgroundColor = b3;
}