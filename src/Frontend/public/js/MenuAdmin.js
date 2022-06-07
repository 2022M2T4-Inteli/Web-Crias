let searchType = "Estabelecimento";

$(document).ready(function(){
    changeSearchType()

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

function changeSearchType(){
    $("#search-table").html(`<tr id="partner-list">
                                        <th class="hotel-id">ID</th>
                                        <th class="hotel-name">Razão Social</th>
                                        <th class="hotel-state">Estado</th>
                                        <th class="hotel-tel">Telefone</th>
                                    </tr>
                                    <tr id="invoice-list">
                                        <th class="invoice-note">Nota Fiscal</th>
                                        <th class="invoice-partner-id">Esta. ID</th>
                                        <th class="invoice-received-value">Valor Recebido</th>
                                        <th class="invoice-taxed-value">Valor Taxado</th>
                                        <th class="invoice-type">Tipo</th>
                                        <th class="invoice-status">Status</th>
                                        <th class="invoice-date">Data</th>
                                    </tr>`);

    switch(document.getElementById("search-type").value){
        case "Estabelecimento":
            searchType = "Estabelecimento";
            showPartnerData();
            $("#partner-list").css("display", "flex");
            $("#invoice-list").css("display", "none");
            break;
        case "Pendentes":
            searchType = "Pendentes";
            showPaidInvoiceData();
            $("#partner-list").css("display", "none");
            $("#invoice-list").css("display", "flex");
            break;
        case "Passadas":
            searchType = "Passadas";
            showInvoiceData();
            $("#partner-list").css("display", "none");
            $("#invoice-list").css("display", "flex");
            break;
    }
}

function showInvoiceData(){
    $.get("http://127.0.0.1:5555/getInvoiceData", function(resultado){
        var objeto = JSON.parse(resultado);
        console.log(objeto);
        for(i = 0; i < Object.keys(objeto).length; i ++){
            $("#search-table").append(`<tr id="invoice-list">
                                            <td class="invoice-note">` + objeto[i].NotaFiscal + `</td>
                                            <td class="invoice-partner-id">` + objeto[i].IDdoParceiro + `</td>
                                            <td class="invoice-received-value">` + objeto[i].ValorRecebido + `</td>
                                            <td class="invoice-taxed-value">` + objeto[i].ValorTaxado + `</td>
                                            <td class="invoice-type">` + objeto[i].TipoAntecipação + `</td>
                                            <td class="invoice-status">` + objeto[i].Status + `</td>
                                            <td class="invoice-date">` + objeto[i].Data + `</td>
                                        </tr>`);
        }
        $("#invoice-list").css("display", "flex");
    });
}

function showPaidInvoiceData(){
    $.get("http://127.0.0.1:5555/getPaidInvoiceData", function(resultado){
        var objeto = JSON.parse(resultado);
        console.log(objeto);
        for(i = 0; i < Object.keys(objeto).length; i ++){
            $("#search-table").append(`<tr id="invoice-list">
                                            <td class="invoice-note">` + objeto[i].NotaFiscal + `</td>
                                            <td class="invoice-partner-id">` + objeto[i].IDdoParceiro + `</td>
                                            <td class="invoice-received-value">` + objeto[i].ValorRecebido + `</td>
                                            <td class="invoice-taxed-value">` + objeto[i].ValorTaxado + `</td>
                                            <td class="invoice-type">` + objeto[i].TipoAntecipação + `</td>
                                            <td class="invoice-status">` + objeto[i].Status + `</td>
                                            <td class="invoice-date">` + objeto[i].Data + `</td>
                                        </tr>`);
        }
        $("#invoice-list").css("display", "flex");
    });
}

function showPartnerData(){
    $.get("http://127.0.0.1:5555/getPartnerData", function(resultado){
        var objeto = JSON.parse(resultado);
        for(i = 0; i < Object.keys(objeto).length; i ++){
            $("#search-table").append(`<tr id="partner-list">
                                            <td class="hotel-id">`+ objeto[i].id + `</td>
                                            <td class="hotel-name">` + objeto[i].RazaoSocial + `</td>
                                            <td class="hotel-state">` + objeto[i].Estado + `</td>
                                            <td class="hotel-tel">` + objeto[i].Celular + `<a href="Detalhes do Hotel.html">Ver Mais</a></td>
                                        </tr>`);
        }
    });
}