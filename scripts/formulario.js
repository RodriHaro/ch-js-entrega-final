const formularioContacto = document.getElementById("formularioContacto");

formularioContacto.addEventListener("submit", function(event) {
    event.preventDefault(); 

    // SweetAlert
    Swal.fire({
        icon: 'success',
        title: 'Muchas gracias por contactarnos',
        text: 'Nos pondremos en contacto contigo a la brevedad.',
        showConfirmButton: true,
        customClass: {
            title: 'swal2-title',
            content: 'swal2-content'
        }
    }).then(() => {
        // Limpiar los inputs del formulario
        formularioContacto.reset();
    });
});