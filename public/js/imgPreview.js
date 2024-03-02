
function preview(event,querySelector){

    //recuperamos el input que desencadeno la accion
    const input = event.target;

    //recuperamos la etiqueta img donde cargaremos la imagen
    let imgPreview = document.querySelector(querySelector);

    //verificamos si existe una imagen seleccionada, si no hay, sale y no sigue con lo siguiente
    if(!input.files.length)return 
    
    //si hay una imagen, le asignamos a file la imagen que se subio al input
    file= input.files[0];

    //creamos la url de la imagen
    objectURL = URL.createObjectURL(file);

    //reemplazamos lo que tenemos en el src de la imagen por esta url
    imgPreview.src = objectURL;
}