function calcd2() {
    var montante = document.getElementById("montante").value
    var taxado = montante * 0.12
    var recebido = montante - taxado
    taxado = taxado.toFixed(2)
    recebido = recebido.toFixed(2)
    document.getElementById("receberá").innerHTML = "Você receberá: R$ " + recebido
    document.getElementById("taxado").innerHTML = "Foi taxado: R$ " + taxado
}

function calcd7() {
    var montante = document.getElementById("montante").value
    var taxado = montante * 0.09
    var recebido = montante - taxado
    taxado = taxado.toFixed(2)
    recebido = recebido.toFixed(2)
    document.getElementById("receberá").innerHTML = "Você receberá: R$ " + recebido
    document.getElementById("taxado").innerHTML = "Foi taxado: R$ " + taxado
}

function calcd15() {
    var montante = document.getElementById("montante").value
    var taxado = montante * 0.06
    var recebido = montante - taxado
    taxado = taxado.toFixed(2)
    recebido = recebido.toFixed(2)
    document.getElementById("receberá").innerHTML = "Você receberá: R$ " + recebido
    document.getElementById("taxado").innerHTML = "Foi taxado: R$ " + taxado
}

function calcd30() {
    var montante = document.getElementById("montante").value
    var taxado = 0
    var recebido = montante
    document.getElementById("receberá").innerHTML = "Você receberá: R$ " + recebido
    document.getElementById("taxado").innerHTML = "Foi taxado: R$ " + taxado

}