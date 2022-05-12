function calcd2() {
    var montante = document.getElementById("montante").value
    var taxado = montante * 0.12
    var recebido = montante - taxado
    document.getElementById("receberá").innerHTML = "Você receberá: R$ " + recebido
    document.getElementById("taxado").innerHTML = "Foi taxado: R$ " + taxado
}

function calcd7() {
    var montante = document.getElementById("montante").value
    var taxado = montante * 0.09
    var recebido = montante - taxado
    document.getElementById("receberá").innerHTML = "Você receberá: R$ " + recebido
    document.getElementById("taxado").innerHTML = "Foi taxado: R$ " + taxado
}

function calcd15() {
    var montante = document.getElementById("montante").value
    var taxado = montante * 0.06
    var recebido = montante - taxado
    document.getElementById("receberá").innerHTML = "Você receberá: R$ " + recebido
    document.getElementById("taxado").innerHTML = "Foi taxado: R$ " + taxado
}