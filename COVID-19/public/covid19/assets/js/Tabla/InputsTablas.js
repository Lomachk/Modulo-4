import { postData } from '../AuthProcess.js';
import { getInfoTabla, getInfoPais } from '../InfoRetrival.js';

// let JWT = inicioSesion();    //despues hay que sacarlo del local storage, iniciosesion es por ahroa noams

// let estadisticas = getInfoTabla(JWT);

//Este js trabaja los datos autorizados para que sean leidos de forma óptima para crear las tablas
//casos activos es 12% del total de casos confirmados para este ejercicio
//casos recuperados es 50% del total de casos confirmados para este ejercicio


// psos
// crear variabel de objeto vacía donde llegará el array de 10 weas que puede leer bien una gráfica
// comprobar que hayan sobre 10000 casos (if)
// guardar en una variable "y" el unmero y en "label" el pais
// devolver la variable lista para q lea la wea
// seleccionar 10 casos en orden (necesitamos una variable i global)
// dar vuelta el orden porque la tabla es mas webiaa q la cocnheuasubashdbjagajfga
// devolver el array listo para cada caso

//son 4 casos, se puede simplificar?????

// devolver objeto con esto q se llame dataset


let crearDataset = async (stats, indexGlobal, requesto) => {

    let dataset = [];
    let setpaises = [];
    let setconfirmados = [];
    let setmuertos = [];
    let setactivos = [];
    let setrecuperados = [];


    stats.forEach(element => {

        let casosactivos = element.confirmed * 0.12;

        if (casosactivos >= 10000) {

            setpaises.push(element.location);
            setconfirmados.push(element.confirmed);
            setmuertos.push(element.deaths);
            setactivos.push(element.confirmed * 0.12);
            setrecuperados.push(element.confirmed * 0.5);

        };

    });

    let seleccionPais = selecc10(setpaises, indexGlobal);
    let seleccionConfirmados = selecc10(setconfirmados, indexGlobal);
    let seleccionMuertos = selecc10(setmuertos, indexGlobal);
    let seleccionActivos = selecc10(setactivos, indexGlobal);
    let seleccionRecuperados = selecc10(setrecuperados, indexGlobal);


    dataset.push({
        label: 'Casos Activos',
        data: seleccionActivos,
        borderColor: "rgb(142, 115, 115)",
        backgroundColor: "rgb(122, 115, 82)",
    },
        {
            label: 'Casos Confirmados',
            data: seleccionConfirmados,
            borderColor: "rgb(88, 255, 200)",
            backgroundColor: "rgb(211, 255, 88)",
        },
        {
            label: 'Decesos',
            data: seleccionMuertos,
            borderColor: "rgb(243, 111, 221)",
            backgroundColor: "rgb(220, 23, 23)",
        },
        {
            label: 'Recuperados',
            data: seleccionRecuperados,
            borderColor: "rgb(94, 194, 238)",
            backgroundColor: "rgb(49, 105, 219)",
        }
    );

    switch (requesto) {
        case "pais":
            return seleccionPais
            break;

        default:
            return dataset
            break;
    };

}


let selecc10 = (arri, indexGlobal) => {
    let corteDe10 = [];
    for (let i = 0; i < 10; i++) {
        corteDe10.push(arri[i + indexGlobal]);
    };
    return corteDe10
};


let paisesMod = async (stats, indexGlobal) => {

    let setpaises = [];
    let setconfirmados = [];
    let setmuertos = [];
    let setactivos = [];
    let setrecuperados = [];

    stats.forEach(element => {

        let casosactivos = element.confirmed * 0.12;

        if (casosactivos >= 10000) {

            setpaises.push(element.location);
            setconfirmados.push(element.confirmed);
            setmuertos.push(element.deaths);
            setactivos.push((element.confirmed * 0.12).toFixed(0));
            setrecuperados.push((element.confirmed * 0.5).toFixed(0));

        };

    });

    let seleccionPais = selecc10(setpaises, indexGlobal);
    let seleccionConfirmados = selecc10(setconfirmados, indexGlobal);
    let seleccionMuertos = selecc10(setmuertos, indexGlobal);
    let seleccionActivos = selecc10(setactivos, indexGlobal);
    let seleccionRecuperados = selecc10(setrecuperados, indexGlobal);

    return {seleccionPais, seleccionConfirmados, seleccionMuertos, seleccionActivos, seleccionRecuperados}

}

export { crearDataset, paisesMod, selecc10 }

//mostrar el largo camino del index globlal podria ser entretenido