var tpAnt = 0;
var taxado = 0
var recebido = 0

function calcd2() {
    var montante = parseFloat(document.getElementById("valores").value);
    taxado = montante * 0.12
    recebido = montante - taxado
    taxado = taxado.toFixed(2)
    recebido = recebido.toFixed(2)
    document.getElementById("receberá").innerHTML = "Você receberá: R$ " + recebido
    document.getElementById("taxado").innerHTML = "Foi taxado: R$ " + taxado
    tpAnt = 1;
}

function calcd7() {
    var montante = parseFloat(document.getElementById("valores").value);
    taxado = montante * 0.09
    recebido = montante - taxado
    taxado = taxado.toFixed(2)
    recebido = recebido.toFixed(2)
    document.getElementById("receberá").innerHTML = "Você receberá: R$ " + recebido
    document.getElementById("taxado").innerHTML = "Foi taxado: R$ " + taxado
    tpAnt = 2;
}

function calcd15() {
    var montante = parseFloat(document.getElementById("valores").value);
    taxado = montante * 0.06
    recebido = montante - taxado
    taxado = taxado.toFixed(2)
    recebido = recebido.toFixed(2)
    document.getElementById("receberá").innerHTML = "Você receberá: R$ " + recebido
    document.getElementById("taxado").innerHTML = "Foi taxado: R$ " + taxado
    tpAnt = 3;
}

function calcd30() {
    var montante = parseFloat(document.getElementById("valores").value);
    taxado = 0
    recebido = montante
    document.getElementById("receberá").innerHTML = "Você receberá: R$ " + recebido
    document.getElementById("taxado").innerHTML = "Foi taxado: R$ " + taxado
    tpAnt = 4;
}

let allReservas = 0;
let minInvoicedReservations = [];
let maxInvoicedReservations = [];
var value = 0;
var minValue = 0;
var max = 0;

function getAllReservations() {
    var url = "http://127.0.0.1:5555/getReservasNaoFaturadas/" + localStorage.getItem("id_used");

    $.get(url, function (resultado) {
        var objeto = JSON.parse(resultado)

        allReservas = objeto;
    })
}

function simulate() {
    var montante = parseFloat(document.getElementById("montante").value);
    var count = -1;
    minInvoicedReservations = [];
    maxInvoicedReservations = [];
    value = 0;
    minValue = 0;

    if (montante != null) {
        console.log(allReservas);

        if (montante > max) {
            document.getElementById("min-value").innerHTML = "Você não tem esse valor para faturar";
        }
        else if (montante >= allReservas[0].Valor) {
            while (value < montante) {
                count++;
                if (count <= allReservas.length) {
                    minInvoicedReservations.push(allReservas[count].Valor);
                    maxInvoicedReservations.push(allReservas[count].Valor);
                    value += allReservas[count].Valor;
                }
            }

            if (value > montante) {
                minValue = value - allReservas[count].Valor;
                minInvoicedReservations.pop();
                document.getElementById("min-value").innerHTML = "Valores mais próximos possiveis são:" + `<br>` + `<select id="valores" name="valores">  ` + `<option value="` + minValue.toFixed(2) + `">` + minValue.toFixed(2) + `</option>` + `<br>` + `<option value="` + value.toFixed(2) + `">` + value.toFixed(2) + `</option>` + `</select>`;
                var options = document.querySelector(".choose");
                options.style.display = 'block'
            }
            else if (value == montante) {
                document.getElementById("min-value").innerHTML = "Valor válido";
                var options = document.querySelector(".choose");
                options.style.display = 'block'
            }
        }
        else {
            document.getElementById("min-value").innerHTML = `Valor mínimo a se retirar é ${allReservas[0].Valor.toFixed(2)}`
        }
    }
    console.log(minInvoicedReservations);
    console.log(maxInvoicedReservations);
}

$(document).ready(function () {
    var url = "http://127.0.0.1:5555/getValorReservasNaoFaturadas/" + localStorage.getItem("id_used");

    $.get(url, function (resultado) {
        var objeto = JSON.parse(resultado)

        max = objeto[0].Valor;

        for (i = 0; i < Object.keys(objeto).length; i++) {
            $('#saldo').html("R$ " + (objeto[i].Valor).toFixed(2))
            $('#valMax').html("R$ " + (objeto[i].Valor).toFixed(2))
        }
    })

    getAllReservations();
})

function confirmar() {
    $.ajax({
        type: 'POST',
        url: "http://127.0.0.1:5555/postInvoiceData",
        data: {
            EstabelecimentoID: localStorage.getItem("id_used"),
            TipoAntecipacaoID: tpAnt,
            NotaFiscal: 231521,
            ValorRecebido: recebido,
            ValorTaxado: taxado,
            Data: "09/06/22",
            Status: "A Pagar"
        }
    }).done(function () {
        console.log("enviado com sucesso");
    })
}

function changeReservationFaturaId(){
    $.ajax({
        type: 'POST',
        url: "http://127.0.0.1:5555/postReservationData",
        data: {
            FaturaID: 1,
            ReservaID: 1
        }
    }).done(function () {
        console.log("enviado com sucesso");
    })
}