function calcd2() {
    var montante = document.getElementById("montante").value
    var taxado = (montante * 12) / 100
    var recebido = montante - taxado
    document.getElementById("receberá").innerHTML = "Você receberá: R$ " + recebido
    document.getElementById("taxado").innerHTML = "Foi taxado: R$ " + taxado
}

function calcd7() {
    var montante = document.getElementById("montante").value
    var taxado = (montante * 9) / 100
    var recebido = montante - taxado
    document.getElementById("receberá").innerHTML = "Você receberá: R$ " + recebido
    document.getElementById("taxado").innerHTML = "Foi taxado: R$ " + taxado
}

function calcd15() {
    var montante = document.getElementById("montante").value
    var taxado = (montante * 6) / 100
    var recebido = montante - taxado
    document.getElementById("receberá").innerHTML = "Você receberá: R$ " + recebido
    document.getElementById("taxado").innerHTML = "Foi taxado: R$ " + taxado
}