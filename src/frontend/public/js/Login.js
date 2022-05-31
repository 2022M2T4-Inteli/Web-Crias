// $(document).ready(function(){

    function checkLogin( ){ 
        
        var EMAIL = $("#log").val();
        var PASSWORD = $("#pass").val(); 
        // console.log(EMAIL);
        // console.log(PASSWORD);

        $.get("http://127.0.0.1:5555/checkLogin", function(resultado){
          
            var objeto = JSON.parse(resultado);
            console.log(objeto);
            // console.log(Object.keys(emails).length);
            for(i = 0; i < Object.keys(objeto).length; i ++) {
                console.log(objeto[i].Email);  
                if (objeto[i].Email == EMAIL) {
                    console.log("email ok");
                }
        }});
        $.get("http://127.0.0.1:5555/checkPass", function(resultado){
          
            var objeto = JSON.parse(resultado);
            console.log(objeto);
            // console.log(Object.keys(emails).length);
            for(i = 0; i < Object.keys(objeto).length; i ++) {
                console.log(objeto[i].Senha);   
                if (objeto[i].Senha == PASSWORD) {
                    console.log("senha ok");
                }
        }});
    }