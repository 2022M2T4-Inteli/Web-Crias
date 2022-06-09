$(document).ready(function(){
    var url1 = "http://127.0.0.1:5555/getInvoiceDataForPartner/" + localStorage.getItem("id_used");
    var url2 = "http://127.0.0.1:5555/getPaidInvoiceDataForPartner/" + localStorage.getItem("id_used");

    //Taking ranking info from database.
    $.get(url1, function(resultado){
        var objeto = JSON.parse(resultado);
        for(i = 0; i < Object.keys(objeto).length; i ++){
            $("#pending-table").append(`<tr>
                                            <td class="nf">` + objeto[i].NotaFiscal + `</td>
                                            <td class="total-value">` + (objeto[i].ValorRecebido).toFixed(2) + `</td>
                                            <td class="receive-value">` + (objeto[i].ValorTaxado).toFixed(2) + `</td>
                                            <td class="antecipation-type">` + objeto[i].TipoAntecipação + `</td>
                                            <td class="date">` + objeto[i].Data + `</td>
                                            <td class="status">` + objeto[i].Status + `</td>
                                        </tr>`);
        }
    });

    $.get(url2, function(resultado){
        var objeto = JSON.parse(resultado);
        for(i = 0; i < Object.keys(objeto).length; i ++){
            $("#past-table").append(`<tr>
                                        <td class="nf">` + objeto[i].NotaFiscal + `</td>
                                        <td class="total-value">` + (objeto[i].ValorRecebido).toFixed(2) + `</td>
                                        <td class="receive-value">` + (objeto[i].ValorTaxado).toFixed(2) + `</td>
                                        <td class="antecipation-type">` + objeto[i].TipoAntecipação + `</td>
                                        <td class="date">` + objeto[i].Data + `</td>
                                        <td class="status">` + objeto[i].Status + `</td>
                                    </tr>`);
    }
    });
});