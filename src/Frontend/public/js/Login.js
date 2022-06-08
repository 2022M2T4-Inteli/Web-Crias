//module.exports = id_used;

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

                //id_used = objeto[i].id; 
                
                console.log(objeto[i].Estabelecimento_id);

                loadPage(objeto[i].Estabelecimento_id);

                return;

            }
            else {
                console.log("algo deu errado ;)");
            }}
    });
}

function loadPage (id) {

    if(id){
        //console.log(token_key);
        location.replace("MenuParceiro.html")
    }
    else{
       //console.log(token_key);
        location.replace("MenuAdmin.html")
    }
   
}
