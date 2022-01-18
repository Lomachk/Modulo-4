window.onload = () => {

// variables globales

    let i = 0;
    
    let instafakemain = document.getElementById("instafakemain");

// funciones principales

    const crearSlot = (arraay) => {

        instafakemain.innerHTML += `
        <div class="card pt-5">
        <div class="card-header bg-light">
          <h3 class="float-left pt-1">Feed</h3><button type="button" class="btn btn-link float-right pt-2" onClick="CerrarSesion()">Cerrar</button>
         </div>
         <div class="card-body" id="Feed">
          <img src="${arraay[0].download_url}" alt="error" width="500px">
          <p class="card-text pt-2">Autor: ${arraay[0].author}</p>
        </div>
         <a href="#" class="btn btn-primary col-6 self-align-center pt-2 m-auto" onClick="MoreMoreMore()" >Cargar más fotos</a>
         <br>          
        </div>
          `;
    
          return i++;
    };

    const getPhotos = async (jwt) => {

        try {

            const response = await fetch(`http://localhost:3000/api/photos?page=${i}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                })

            const { data } = await response.json();

            return data

        } catch (err) {

            console.error(`Error: ${err}`)

        }
    };

    const getMorePhotos = async (jwt) => {

        try {

            i++;

            const response = await fetch(`http://localhost:3000/api/photos?page=${i}`,

                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${jwt} `
                    }
                });

            const { data } = await response.json();

            if (response.status == 401) {

                throw new Error('Servicio no autorizado');

            }

            else if (data) {

                const feed = document.getElementById("Feed");

                feed.innerHTML += `
                         <div class="card-body" id="Feed">
                          <img src="${data[0].download_url}" alt="error" width="500px">
                         <p class="card-text pt-2">Autor: ${data[0].author}</p>
                        </div>
                          `;
                return i
            }

            return data;

        } catch (err) {

            localStorage.clear();
            console.error(`Error: ${err} `);
        }

    };

    const postData = async (email, password) => {

        try {

            const response = await fetch('http://localhost:3000/api/login',
                {
                    method: 'POST',
                    body: JSON.stringify({ email: email, password: password })
                })

            const { token } = await response.json();

            localStorage.setItem('jwt-token', token);

            return token

        } catch (err) {

            console.error(`Error: ${err}`)
        }
    };

// checkeo inicial

    const init = async () => {

        const token = localStorage.getItem('jwt-token');

        if (token) {

            const photos = await getPhotos(token);
            console.log("token guardado: " + photos);

            
            toggleForm();

            crearSlot(photos);

            return photos
        }
    };

    init();

// funciones Onclicks!!

    window.MoreMoreMore = () => {

        getMorePhotos(localStorage.getItem('jwt-token'))

    };

    window.CerrarSesion = () => {
        localStorage.clear();
        location.reload();
    }

    const toggleForm = () => {
        $("#js-form-wrapper").toggle()
        }
    

// Submit

    document.getElementById("js-form").addEventListener("submit", async () => {

        event.preventDefault();

        let email = document.getElementById("js-email").value;
        let password = document.getElementById("js-password").value;


        const JWT = await postData(email, password);
        console.log("token recibido: " + JWT);

        const photos = await getPhotos(JWT);
        console.log("posts: ");
        console.log(photos);

        toggleForm();

        crearSlot(photos);

    })

}


// Recuerda mantenerte hidratado y dar las gracias ! <3