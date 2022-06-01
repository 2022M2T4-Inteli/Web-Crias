const TOKEN = Math.floor(Math.random() * 10000) + 1;

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
            //console.log(objeto[i].Email);
            //console.log(objeto[i].Senha);  

            if (objeto[i].Email == EMAIL && objeto[i].Senha == PASSWORD) {
                console.log("email e senha ok");
                let id_used = objeto[i].id; //console.log(id_used);

                loadPage(id_used, objeto[i].Parceido_id);

                return;

            }
            else {
                console.log("algo deu errado ;)");
            }}
    });
}

function loadPage (id, id_parc) {

    var token_key = id * TOKEN;

    if(id_parc){
        console.log(token_key);
        //location.replace("MenuParceiro.html")
    }

    else{
        console.log(token_key);
        //location.replace("MenuAdmin.html")
    }
   
}

    