
$(document).ready(function(){
    $.get("http://127.0.0.1:5555/getPartnerData", function(resultado){
        var objeto = JSON.parse(resultado);
        console.log(objeto);
        console.log(Object.keys(objeto).length);
        $("#hotel-name").html(objeto[0].RazaoSocial);
        $("#cnpj-hotel").html(objeto[0].CNPJ);
        $("#cell-hotel").html(objeto[0].Celular);
        $("#email-hotel").html(objeto[0].Email);
        $("#logradouro-hotel").html(objeto[0].Logradouro);
        $("#logradouro-name-hotel").html(objeto[0].NomedoLogradouro);
        $("#neighbourhood-hotel").html(objeto[0].Bairro);
        $("#number-hotel").html(objeto[0].Número);
        $("#zip-hotel").html(objeto[0].CEP);
        $("#state-hotel").html(objeto[0].Estado);
    });
});