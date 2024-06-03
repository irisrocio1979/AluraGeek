const url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=15"; // Reemplaza DEMO_KEY por tu API Key personal

async function listaImagenes() {
    try {
        let fetchImagen = await fetch(url);
        let datosImagenes = await fetchImagen.json();

        console.log(datosImagenes);

        const card = document.querySelector("[data-ul]");

        datosImagenes.forEach(elemento => {
            const contenido = `
            <li class="card">
                <img class="card__image" src="${elemento.url}" alt="imagen">
                <h3 class="card__title">${elemento.title}</h3>
            </li>
            `;
            card.innerHTML += contenido;
        });
    } catch (error) {
        console.log(error);
    }
}

listaImagenes();

// Función para cargar productos desde un archivo JSON
async function cargarProductos() {
    try {
        let response = await fetch('Productos/productos.json');
        let productos = await response.json();

        console.log(productos);

        const card = document.querySelector("[data-ul]");

        productos.forEach(producto => {
            const contenido = `
            <li class="card">
                <img class="card__image" src="${producto.url}" alt="imagen">
                <h3 class="card__title">${producto.title}</h3>
                <p class="card__price">$${producto.price.toFixed(2)}</p>
            </li>
            `;
            card.innerHTML += contenido;
        });
    } catch (error) {
        console.log(error);
    }
}

cargarProductos();



// Función para inicializar el cropper
function inicializarCropper(imagen, cropperOptions) {
    const cropper = new Cropper(imagen, cropperOptions);
    return cropper;
}

document.querySelector('[data-formulario]').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const precio = document.querySelector('#precio').value;
    const imagenUrl = document.querySelector('#imagen').value;

    if (!imagenUrl) {
        alert('Por favor, ingresa la URL de la imagen.');
        return;
    }

    const card = document.querySelector("[data-ul]");

    // Crear un nuevo elemento de imagen para cargar la imagen y luego inicializar el cropper
    const nuevaImagen = new Image();
    nuevaImagen.src = imagenUrl;
    nuevaImagen.onload = function() {
        // Mostrar la imagen en el área de previsualización
        const vistaPrevia = document.getElementById('vistaPreviaImagen');
        vistaPrevia.innerHTML = '';
        vistaPrevia.appendChild(nuevaImagen);

        const cropperOptions = {
            aspectRatio: 1, // Proporción de aspecto para mantener (puedes ajustarlo según tus necesidades)
            viewMode: 2, // Modo de vista, aquí usamos 2 para ajustar la imagen dentro del contenedor sin recortarla
        };

        const cropper = inicializarCropper(nuevaImagen, cropperOptions);

        // Mostrar el botón de confirmación
        const confirmarBoton = document.getElementById('confirmar');
        confirmarBoton.classList.remove('d-none');
       
        // Escuchar el evento de clic en el botón de confirmación
        confirmarBoton.addEventListener('click', function() {
            // Obtener la imagen recortada como base64
            const imagenRecortada = cropper.getCroppedCanvas().toDataURL();
            const nuevoProducto = `
            <li class="card">
                <img class="card__image" src="${imagenRecortada}" alt="imagen">
                <h3 class="card__title">${nombre}</h3>
                <p class="card__price">$${precio}</p>
            </li>
            `;
            card.innerHTML += nuevoProducto;

            // Limpiar el formulario después de agregar el producto
            document.querySelector('[data-formulario]').reset();
            // Limpiar el área de previsualización
            vistaPrevia.innerHTML = '';
            confirmarBoton.classList.add('d-none');

            // Mostrar mensaje de éxito
            alert('Producto agregado con éxito.');
        }, { once: true }); // Usa { once: true } para asegurarte de que el evento se ejecute solo una vez
    };
});

// then y catch
/* function listaImagenes(){
    fetch(url)
    .then( response => response.json())
    .then( datosImagenes => {
        console.log(datosImagenes)

        const card = document.querySelector("[data-ul]")

        datosImagenes.forEach( elemento => {
            const contenido =`<li class="card">
            <img class="card__image" src="${elemento.url}" alt="imagen">
            <h3 class="card__title">${elemento.title}</h3>
        </li>
            `
            card.innerHTML = card.innerHTML + contenido
        })
    })
    .catch( error => console.log(error))
}

listaImagenes() */


/*
imagenes

https://th.bing.com/th/id/R.9b0ba5902f311cd2c9ae74b346697fd5?rik=93puoUUnrg24hw&riu=http%3a%2f%2fmisiontokyo.com%2fwp-content%2fuploads%2f2018%2f09%2fDoraemon-2017.jpg&ehk=1%2fvHV6B5C%2bQEd6a1VZaLOJoxNvhZDjYAf3TraC4ZR00%3d&risl=&pid=ImgRaw&r=0

https://th.bing.com/th/id/OIF.30ZyWQUrHrnhE8qIjKhbkA?rs=1&pid=ImgDetMain

https://th.bing.com/th/id/R.0e9990f0ac297c119a4e7ecf150b208f?rik=bJgYAGnH3hTqsA&riu=http%3a%2f%2fmarcusgohmarcusgoh.com%2fwp%2fwp-content%2fuploads%2f2017%2f05%2fDoraemon-Poster.jpg&ehk=LHLztiLnaK35o8Aj5CHF5Fql%2fkDjAEXSj5Ez%2fYdu%2fNM%3d&risl=&pid=ImgRaw&r=0
*/