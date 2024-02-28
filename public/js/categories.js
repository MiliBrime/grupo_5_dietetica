function toggleDropdown() {
    let dropdown= document.querySelector("#myDropdown")
    dropdown.classList.toggle("show");
    dropdown.addEventListener("click",function(e) {
      toggleDropdown()
    })

    let arrowIcon = document.getElementById("arrowIcon");
    arrowIcon.classList.toggle("rotate");
  }

  // Cierra el menú si el usuario hace clic fuera de él.
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) { //si algo q toca no coincide con dropbtn que es categorias
      let contenidoDropdown = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < contenidoDropdown.length; i++) {
        let openDropdown = contenidoDropdown[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove("show");
          document.getElementById("arrowIcon").classList.toggle("rotate")
        }          
        }
      }
    }
  