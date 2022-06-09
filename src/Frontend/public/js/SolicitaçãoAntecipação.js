function calcd2() {
    var montante = document.getElementById("montante").value
    var taxado = montante * 0.12
    var recebido = montante - taxado
    taxado = taxado.toFixed(2)
    recebido = recebido.toFixed(2)
    document.getElementById("receberá").innerHTML = "Você receberá: R$ " + recebido
    document.getElementById("taxado").innerHTML = "Foi taxado: R$ " + taxado
    simulate()
}

function calcd7() {
    var montante = document.getElementById("montante").value
    var taxado = montante * 0.09
    var recebido = montante - taxado
    taxado = taxado.toFixed(2)
    recebido = recebido.toFixed(2)
    document.getElementById("receberá").innerHTML = "Você receberá: R$ " + recebido
    document.getElementById("taxado").innerHTML = "Foi taxado: R$ " + taxado
    simulate()
}

function calcd15() {
    var montante = document.getElementById("montante").value
    var taxado = montante * 0.06
    var recebido = montante - taxado
    taxado = taxado.toFixed(2)
    recebido = recebido.toFixed(2)
    document.getElementById("receberá").innerHTML = "Você receberá: R$ " + recebido
    document.getElementById("taxado").innerHTML = "Foi taxado: R$ " + taxado
    simulate()
}

function calcd30() {
    var montante = document.getElementById("montante").value
    var taxado = 0
    var recebido = montante
    document.getElementById("receberá").innerHTML = "Você receberá: R$ " + recebido
    document.getElementById("taxado").innerHTML = "Foi taxado: R$ " + taxado
    simulate()
}

let allReservas = 0;

function getAllReservations(){
    var url = "http://127.0.0.1:5555/getReservasNaoFaturadas/" + localStorage.getItem("id_used");

    $.get(url, function (resultado) {
        var objeto = JSON.parse(resultado)

        allReservas = objeto;
    })
}

function simulate(){
    var montante = parseFloat(document.getElementById("montante").value);
    var value = 0;
    var count = -1;
    var minValue = 0;

    if (montante != null){
        console.log(allReservas);
        console.log();

        if (montante > document.getElementById("valMax")){
            console.log("Você não tem esse valor para faturar");
        }
        else if (montante >= allReservas[0].Valor){
            while(value < montante){
                count ++;

                if(count <= allReservas.length){
                    value += allReservas[count].Valor;
                }
            }
            
            if(value > montante){
                minValue = value - allReservas[count].Valor;
                console.log("Valores possiveis são " + minValue.toFixed(2) + " ou " + value.toFixed(2));
            }
            else if(value == montante){
                console.log("Valor possivel");
            }
        }
        else {
            console.log("Valor mínimo a se retirar é " + allReservas[0].Valor.toFixed(2));
        }
    }
}

$(document).ready(function () {
    var url = "http://127.0.0.1:5555/getValorReservasNaoFaturadas/" + localStorage.getItem("id_used");

    $.get(url, function (resultado) {
        var objeto = JSON.parse(resultado)

        for (i = 0; i < Object.keys(objeto).length; i++) {
            $('#saldo').html("R$ " + (objeto[i].Valor).toFixed(2))
            $('#valMax').html("R$ " + (objeto[i].Valor).toFixed(2))
        }
    })

    getAllReservations();
})