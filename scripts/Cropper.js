<script>
  window.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('inputImage');
    const previewContainer = document.getElementById('previewContainer');
    let cropper;

    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();
        image.src = reader.result;
        image.onload = () => {
          // Limpia cualquier instancia anterior de Cropper
          if (cropper) {
            cropper.destroy();
          }
          // Crea una nueva instancia de Cropper
          cropper = new Cropper(image, {
            aspectRatio: 1, // Proporción de aspecto deseada (opcional)
            viewMode: 2, // Modo de vista (opcional)
            crop: (event) => {
              // Evento que se dispara cada vez que se recorta la imagen
              const canvas = cropper.getCroppedCanvas();
              previewContainer.innerHTML = ''; // Limpia el contenedor de previsualización
              previewContainer.appendChild(canvas); // Agrega la imagen recortada al contenedor de previsualización
            }
          });
        };
      };

      if (file) {
        reader.readAsDataURL(file); // Lee el archivo como una URL de datos
      }
    });
  });
</script>