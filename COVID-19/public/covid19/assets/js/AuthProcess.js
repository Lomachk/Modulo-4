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


// const inicioSesion = async () => {  //dsps aqui agregar email y pass como variables recibibles desde el submit

//     let email = "Shanna@melissa.tv"  //despues en un modal del boton iniciar sesion, transformar toda esta funcion
//     let pass = "secret"

//     let JWT = await postData(email, pass);

//     return JWT

// }

export { postData }



