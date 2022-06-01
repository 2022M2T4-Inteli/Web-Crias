function checkLogin( ){ 
    
    var EMAIL = $("#log").val();
    var PASSWORD = $("#pass").val(); 
    // console.log(EMAIL);
    // console.log(PASSWORD);

    $.get("http://127.0.0.1:5555/checkLogin", function(resultado){
        
        var objeto = JSON.parse(resultado);
        console.log(objeto);
        console.log(Object.keys(objeto).length);

        for(i = 0; i < Object.keys(objeto).length; i ++) {
            console.log(objeto[i].Email);
            console.log(objeto[i].Senha);  

            if (objeto[i].Email == EMAIL && objeto[i].Senha == PASSWORD) {
                console.log("email e senha ok");
                let id_parceiro = objeto[i].Parceiro_id; console.log(id_parceiro);

                loadPage(id_parceiro);
                return id_parceiro;

            }
            else {
                console.log("algo deu errado ;)");
            }}
    });
}

export var id_parceiro;

function loadPage (id) {

    location.replace("MenuAdmin.html")

}

    