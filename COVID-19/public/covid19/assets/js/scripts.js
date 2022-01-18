import { postData } from './AuthProcess.js';
import { getInfoTabla, getInfoPais } from './InfoRetrival.js';
import nuevaChart from './Tabla/Tabla.js';
import { crearDataset, paisesMod, selecc10 } from "./Tabla/InputsTablas.js";
import SeccionVerMas from './vermas.js';
import { completarAlRey } from './InicioSesion.js';
import { switchBotonSesion, togglePresentacion, toggleTableCard } from "./Tugliglugli.js";
import paginaActual from './PaginaActual.js';


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

            nuevaChart(estadisticas, indexGlobal);


            toggleTableCard();
            switchBotonSesion();
            togglePresentacion();

            document.getElementById("paginaactual").innerHTML = `Página ${paginaActual(indexGlobal)}`

            document.getElementById("vermasrequest").innerHTML = "";  //tiene que limpiare para hacer una nueva con la funcion

            SeccionVerMas(estadisticas, indexGlobal);

            return estadisticas
        }
    };

    init();


    //iniciar sesion, anterior, siguiente

    document.getElementById("btnInicioSesion").addEventListener("click", async () => {

        let mail = document.getElementById("email1").value;
        let pass = document.getElementById("password1").value;

        const token = await postData(mail, pass);

        let estadisticas = await getInfoTabla(token); //estadisticas son los datos de la api

        switchBotonSesion();
        toggleTableCard();
        togglePresentacion();

        nuevaChart(estadisticas, indexGlobal);

        document.getElementById("paginaactual").innerHTML = `Página ${paginaActual(indexGlobal)}`

        document.getElementById("vermasrequest").innerHTML = "";  //tiene que limpiare para hacer una nueva con la funcion
        SeccionVerMas(estadisticas, indexGlobal);



    });


    document.getElementById("previo").addEventListener("click", async () => {

        event.preventDefault();

        indexGlobal -= 10;

        if (indexGlobal < 0) {
            indexGlobal = 0;
        }

        else {

            let estadisticas = await getInfoTabla(localStorage.getItem('jwt-token'))

            let chartStatus = Chart.getChart("tablapro");
            if (chartStatus != undefined) {
                chartStatus.destroy();
            }

            nuevaChart(estadisticas, indexGlobal);

            document.getElementById("paginaactual").innerHTML = `Página ${paginaActual(indexGlobal)}`

            document.getElementById("vermasrequest").innerHTML = "";  //tiene que limpiare para hacer una nueva con la funcion

            SeccionVerMas(estadisticas, indexGlobal);

        };

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

        document.getElementById("paginaactual").innerHTML = `Página ${paginaActual(indexGlobal)}`

        document.getElementById("vermasrequest").innerHTML = "";  //tiene que limpiare para hacer una nueva con la funcion
        SeccionVerMas(estadisticas, indexGlobal);

    });


    //otros

    document.getElementById("llenardatosForm").addEventListener("click", () => {

        completarAlRey();

    });
};


