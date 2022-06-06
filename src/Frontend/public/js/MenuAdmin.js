let searchType = "Estabelecimento";

function changeSearchType(){
    switch(document.getElementById("search-type").value){
        case "Estabelecimento":
            searchType = "Estabelecimento";
            $("#partner-list").css("display", "block");
            $("#invoice-list").css("display", "none");
            break;
        case "Pendentes":
            searchType = "Pendentes";
            $("#partner-list").css("display", "none");
            $("#invoice-list").css("display", "block");
            break;
        case "Passadas":
            searchType = "Passadas";
            $("#partner-list").css("display", "none");
            $("#invoice-list").css("display", "block");
            break;
    }
}

$(document).ready(function(){
    //Taking ranking info from database.
    $.get("http://127.0.0.1:5555/getRanking", function(resultado){
        var objeto = JSON.parse(resultado);
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

    //Taking the general info section from database.
    $.get("http://127.0.0.1:5555/getGeneralVision", function(resultado){
        var objeto = JSON.parse(resultado);
        $("#total-amount-anticipations").html(objeto[0].TotalDeAntecipações);
        $("#total-amount-advance").html(objeto[0].ValorTotalAntecipado);
        $("#total-taxed-amount").html(objeto[0].ValorTotalTaxado);
        $("#most-requested-type").html(objeto[0].TipoMaisAntecipado);
    });
});