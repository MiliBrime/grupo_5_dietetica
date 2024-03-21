console.log("conectadooooooooo create");

window.addEventListener("load",function(){
    let formulario= document.getElementById("form-create");
    let errores = [];

    //Función general para verificar que el campo no esté vacío
    function estaVacio(input){
        let name = document.getElementById(input).value.trim();
        if (name == ""){
            errores.push("Campo "+input+" vacío");
            document.getElementById("error-"+input).innerText = "Tenes que completar este campo";
        } else {
            document.getElementById("error-"+input).innerText = "";
        }
    }

    // Función para validar el campo de nombre
    function validarNombre() {
        let name = document.getElementById("name").value.trim();
        if (name == "") {
            errores.push("Nombre vacío");
            document.getElementById("error-name").innerText = "Ingresa el nombre del producto"}
            else if(name.length < 5){
                errores.push("Nombre menor a 5 caracteres");
                document.getElementById("error-name").innerText = "El nombre debe tener al menos 5 caracteres";
            }
        else {
            document.getElementById("error-name").innerText = "";
        }
    }
    // Función para validar la descripcion
    function validarDescripcionDetalle() {
        let descripcion = document.getElementById("descriptionProduct").value.trim();
        if (descripcion == "") {
            errores.push("Descripción vacía");
            document.getElementById("error-descripcion").innerText = "Ingresa la descripción del producto"}
            else if(descripcion.length < 20){
                errores.push("Descripción menor a 20 caracteres");
                document.getElementById("error-descripcion").innerText = "Esta descripción debe tener al menos 20 caracteres";
            }
        else {
            document.getElementById("error-descripcion").innerText = "";
        }
    }
    function validarDescripcionHome() {
        let descripcion = document.getElementById("descriptionHome").value.trim();
        if (descripcion == "") {
            errores.push("Descripción vacía");
            document.getElementById("error-descriptionHome").innerText = "Ingresa la descripción del producto"}
            else if(descripcion.length > 94){
                errores.push("Descripción mayor a 94 caracteres");
                document.getElementById("error-descriptionHome").innerText = "Esta descripción debe tener como máximo 94 caracteres";
            }
        else {
            document.getElementById("error-descriptionHome").innerText = "";
        }
    }


    // Función para validar la foto
    function validarFoto() {
        let fileInput = document.getElementById("image");
        let errorMessage = document.getElementById("error-image");
        let acceptedExtensions = [".jpg", ".png", ".gif", ".jpeg"];
        let fileExtension;

        //Verificar si se subio una foto
        if (fileInput.files.length == 0) {
            errorMessage.innerText = "Debes ingresar una imagen";
        } else {
             fileExtension = fileInput.files[0].name.substring(fileInput.files[0].name.lastIndexOf(".")).toLowerCase();}
        //Verificar las extensiones estan bien
        if (fileInput.files.length > 0) {
            if (!acceptedExtensions.includes(fileExtension)) {
                errores.push("Extensión de archivo no válida");
                errorMessage.innerText = `Las extensiones de archivo permitidas son ${acceptedExtensions.join(", ")}`;
            } else {
                errorMessage.innerText = "";
            
        } }
    }

    document.getElementById("name").addEventListener("input", validarNombre);
    document.getElementById("descriptionProduct").addEventListener("input", validarDescripcionDetalle);
    document.getElementById("descriptionHome").addEventListener("input", validarDescripcionHome);
    document.getElementById("image").addEventListener("input", validarFoto);
    document.getElementById("brand").addEventListener("input", function(){estaVacio("brand")});
    document.getElementById("price").addEventListener("input", function(){estaVacio("price")});
    document.getElementById("category").addEventListener("input", function(){estaVacio("category")});
    document.getElementById("ofertaOdestacado").addEventListener("input", function(){estaVacio("ofertaOdestacado")});

    formulario.addEventListener("submit", function(e) {
        errores = [];
    
        // Validación de los campos al enviar el formulario
        validarNombre();
        validarDescripcion();
        validarDescripcionHome();
        validarFoto();
        estaVacio("brand");
        estaVacio("price");
        estaVacio("category");
        estaVacio("ofertaOdestacado");
    
        // Evitar que el formulario se envíe si hay errores
        if (errores.length > 0) {
            e.preventDefault();
    
            for (let i = 0; i < errores.length; i++) {
                console.log(errores[i]);
            }
        }
    });
})