$(document).ready(function(){
    $.get("http://127.0.0.1:5555/getRanking", function(resultado){
        var objeto = JSON.parse(resultado);
        console.log(objeto);
        console.log(Object.keys(objeto).length);
        for(i = 0; i < Object.keys(objeto).length; i ++){
            $("#ranking-table").append(`<tr>
                                            <td class="ranking-table-position">` + (i + 1) + `</td>
                                            <td class="ranking-table-id">` + objeto[i].id + `</td>
                                            <td class="ranking-table-razao">` + objeto[i].RazaoSocial + `</td>
                                            <td class="ranking-table-qtd">` + objeto[i].QuantidadeAntecipacao + `</td>
                                            <td class="ranking-table-total">` + objeto[i].ValorAntecipado + `</td>
                                        </tr>`);
        }
    });

    $.get("http://127.0.0.1:5555/getGeneralVision", function(resultado){
        var objeto = JSON.parse(resultado);
        console.log(objeto);
        console.log(Object.keys(objeto).length);
        $("#total-amount-anticipations").html(objeto[0].TotalDeAntecipações);
        $("#total-amount-advance").html(objeto[0].ValorTotalAntecipado);
        $("#total-taxed-amount").html(objeto[0].ValorTotalTaxado);
        $("#most-requested-type").html(objeto[0].TipoMaisAntecipado);
    });
});