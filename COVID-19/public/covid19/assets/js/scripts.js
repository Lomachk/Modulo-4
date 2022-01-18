import { postData } from './AuthProcess.js';
import { getInfoTabla, getInfoPais } from './InfoRetrival.js';
import nuevaChart from './Tabla/Tabla.js';
import { crearDataset, paisesMod, selecc10 } from "./Tabla/InputsTablas.js";
import botonVerMas from './vermas.js';
import { completarAlRey } from './InicioSesion.js';
import { switchBotonSesion, togglePresentacion, toggleTableCard } from "./Tugliglugli.js";


window.CerrarSesion = () => {
    localStorage.clear();
    location.reload();
};


window.onload = () => {



    let indexGlobal = 0;

     
    // checkeo inicial

    const init = async () => {

        const token = localStorage.getItem('jwt-token');

        if (token) {

            const estadisticas = await getInfoTabla(token);
            console.log(estadisticas);
            console.log("info pais")
            let inpai = await getInfoPais(token, "Argentina");
            console.log(inpai)

            nuevaChart(estadisticas, indexGlobal);

            toggleTableCard();
            switchBotonSesion();
            togglePresentacion();

            document.getElementById("vermasrequest").innerHTML = "";

            return estadisticas
        }
    };

    init();


    //Botones

    //vermas

    document.getElementById("vermas").addEventListener("click", async () => {

        event.preventDefault();

        let estadisticas = await getInfoTabla(localStorage.getItem('jwt-token'))

        botonVerMas(estadisticas, indexGlobal);

    });


    //iniciar sesion  -> recive los permisos, crea una tabla, agrega botones de pagina  modulares de mas info
    document.getElementById("js-iniciar-wrapper").addEventListener("click", async () => {

        event.preventDefault();

        let JWT = inicioSesion();

        let estadisticas = await getInfoTabla(JWT);

        nuevaChart(estadisticas, indexGlobal);

        indexGlobal += 10;
        
        document.getElementById("vermasrequest").innerHTML = "";

        switchBotonSesion();

    });

    document.getElementById("previo").addEventListener("click", async () => {

        event.preventDefault();
        
        indexGlobal -= 10;

        let estadisticas = await getInfoTabla(localStorage.getItem('jwt-token'))

        let chartStatus = Chart.getChart("tablapro");
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }

        nuevaChart(estadisticas, indexGlobal);


        document.getElementById("vermasrequest").innerHTML = "";

        if (indexGlobal < 0) { indexGlobal = 0 }

    });

    document.getElementById("siguiente").addEventListener("click", async () => {

        event.preventDefault();
        
        indexGlobal += 10;

        let estadisticas = await getInfoTabla(localStorage.getItem('jwt-token'));

        let chartStatus = Chart.getChart("tablapro");
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }

        nuevaChart(estadisticas, indexGlobal);
        
        document.getElementById("vermasrequest").innerHTML = "";

    });

    document.getElementById("llenardatosForm").addEventListener("click", () => {

    completarAlRey();

    });

    document.getElementById("btnInicioSesion").addEventListener("click", async () => {
    
        let mail = document.getElementById("email1").value;
        let pass = document.getElementById("password1").value;

        const token = await postData(mail, pass);

        let estadisticas = await getInfoTabla(token);

        switchBotonSesion();
        toggleTableCard();
        togglePresentacion();
        
        document.getElementById("vermasrequest").innerHTML = "";

        nuevaChart(estadisticas, indexGlobal);

        

    });

};

//->esta informacion es muy importante, reservada solo para los reyes del mundo, ingresa con tu usuario para comprobar que eres de la realiza
//no te acuerdas tu usuario? tranketa, yo lo relleno por tí mi rey
//se le puede agregar un numero random a los creadores de los datos faltantes para q se vea mas real
// crear funciones para
// generar generar tabla
// popup de mas informacion
// modal con la info personalizada
// cerrar sesion
// iniciar sesion -> link con postdata en Submit

//agregar a la tabla ina id por cada pais con el nombre de caa pais

//variables necesarias
//una que identifique a los paises

