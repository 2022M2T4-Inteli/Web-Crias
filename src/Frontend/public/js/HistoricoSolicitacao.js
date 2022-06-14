$(document).ready(function(){
    var url1 = "http://127.0.0.1:5555/getInvoiceDataForPartner/" + localStorage.getItem("id_used");
    var url2 = "http://127.0.0.1:5555/getPaidInvoiceDataForPartner/" + localStorage.getItem("id_used");

    //Taking ranking info from database.
    $.get(url1, function(resultado){
        var objeto = JSON.parse(resultado);
        var aux = 1;
        for(i = 0; i < Object.keys(objeto).length; i ++){
            if (aux == 1){
                $("#pending-table").append(`<tr>
                                                <td class="nf">` + objeto[i].NotaFiscal + `</td>
                                                <td class="total-value">` + (objeto[i].ValorRecebido).toFixed(2) + `</td>
                                                <td class="receive-value">` + (objeto[i].ValorTaxado).toFixed(2) + `</td>
                                                <td class="antecipation-type">` + objeto[i].TipoAntecipação + `</td>
                                                <td class="date">` + objeto[i].Data + `</td>
                                                <td class="status">` + objeto[i].Status + `</td>
                                            </tr>`);
            }
            else{
                $("#pending-table").append(`<tr>
                                                <td class="nf" style="background-color: #F2F2F2">` + objeto[i].NotaFiscal + `</td>
                                                <td class="total-value" style="background-color: #F2F2F2">` + (objeto[i].ValorRecebido).toFixed(2) + `</td>
                                                <td class="receive-value" style="background-color: #F2F2F2">` + (objeto[i].ValorTaxado).toFixed(2) + `</td>
                                                <td class="antecipation-type" style="background-color: #F2F2F2">` + objeto[i].TipoAntecipação + `</td>
                                                <td class="date" style="background-color: #F2F2F2">` + objeto[i].Data + `</td>
                                                <td class="status" style="background-color: #F2F2F2">` + objeto[i].Status + `</td>
                                            </tr>`);
            }

            aux = -aux;
        }
    });

    $.get(url2, function(resultado){
        var objeto = JSON.parse(resultado);
        aux = 1;
        for(i = 0; i < Object.keys(objeto).length; i ++){
            if (aux == 1){
                $("#past-table").append(`<tr>
                                            <td class="nf">` + objeto[i].NotaFiscal + `</td>
                                            <td class="total-value">` + (objeto[i].ValorRecebido).toFixed(2) + `</td>
                                            <td class="receive-value">` + (objeto[i].ValorTaxado).toFixed(2) + `</td>
                                            <td class="antecipation-type">` + objeto[i].TipoAntecipação + `</td>
                                            <td class="date">` + objeto[i].Data + `</td>
                                            <td class="status">` + objeto[i].Status + `</td>
                                        </tr>`);
            }
            else{
                $("#past-table").append(`<tr>
                                            <td class="nf" style="background-color: #F2F2F2">` + objeto[i].NotaFiscal + `</td>
                                            <td class="total-value" style="background-color: #F2F2F2">` + (objeto[i].ValorRecebido).toFixed(2) + `</td>
                                            <td class="receive-value" style="background-color: #F2F2F2">` + (objeto[i].ValorTaxado).toFixed(2) + `</td>
                                            <td class="antecipation-type" style="background-color: #F2F2F2">` + objeto[i].TipoAntecipação + `</td>
                                            <td class="date" style="background-color: #F2F2F2">` + objeto[i].Data + `</td>
                                            <td class="status" style="background-color: #F2F2F2">` + objeto[i].Status + `</td>
                                        </tr>`);
            }

            aux = -aux;
        }
    });
});