//Written by Renato
//Declaring variables
const buttons = {
    leftButton: document.querySelector("#left-button"),
    midButton: document.querySelector("#mid-button"),
    rightButton: document.querySelector("#right-button")
}
const bodyInfo = document.querySelector(".body-info");

//Searching section variables
const searchResult = document.querySelector("#hotel-name");
const searchBar = document.querySelector("#search-input-text");
const searchType = document.querySelector(".select-type");
const divHotel = document.querySelector(".data-hotel");
const divPending = document.querySelector(".data-pending");
const divHistory = document.querySelector(".data-history");
const pedngingDateList = document.querySelectorAll(".pending-date");

//Changing search property according what is searched
function changeSearchProperty(){
    const searchProperty = document.querySelector(".select-type");
    const searchData = document.querySelector("#search-data");
    const searchHotel = document.querySelector("#search-hotel");
    switch (searchProperty.value){
        case "Parceiro":
            console.log("aa");
            searchHotel.style.display = "flex";
            searchData.style.display = "none";
            break;
        case "Antecipações Pendentes":
            searchHotel.style.display = "none";
            searchData.style.display = "flex";
        break;
        case "Histórico de Antecipações":
            searchHotel.style.display = "none";
            searchData.style.display = "flex";
        break;
    }
}

//Show answers to search
function search(){
    switch (searchType.value){
        case "Parceiro":
            divHotel.style.display = "flex";
            divPending.style.display = "none";
            divHistory.style.display = "none";
            searchResult.innerHTML = searchBar.value;
            break;
        case "Antecipações Pendentes":
            divHotel.style.display = "none";
            divPending.style.display = "flex";
            divHistory.style.display = "none";
            pedngingDateList.forEach(element => {
                element.innerHTML = searchBar.value;
            });
            break;
        case "Histórico de Antecipações":
            divHotel.style.display = "none";
            divPending.style.display = "none";
            divHistory.style.display = "flex";
            pedngingDateList.forEach(element => {
                element.innerHTML = searchBar.value;
            });
            break;
    }
}

//Changing date buttons colors
function selectDateButton(index){
    switch(index){
        case 0:
            changingColor("#8CAAFD", "#FFFFFF", "#FFFFFF");
            changingFontWeight(650, 500, 500);
            break;
        case 1:
            changingColor("#FFFFFF", "#8CAAFD", "#FFFFFF");
            changingFontWeight(500, 650, 500);
            break;
        case 2:
            changingColor("#FFFFFF", "#FFFFFF", "#8CAAFD");
            changingFontWeight(500, 500, 650);
            break;
    }
}

//Changing font-weight of date-button's text
function changingFontWeight(b1, b2, b3){
    buttons.leftButton.style.fontWeight = b1;
    buttons.midButton.style.fontWeight = b2;
    buttons.rightButton.style.fontWeight = b3;
}

//Changing date-button background-color
function changingColor(b1, b2, b3){
    bodyInfo.style.display = "flex";
    buttons.leftButton.style.backgroundColor = b1;
    buttons.midButton.style.backgroundColor = b2;
    buttons.rightButton.style.backgroundColor = b3;  
}