import { postData, inicioSesion } from '../AuthProcess.js';
import { getInfoTabla, getInfoPais } from '../InfoRetrival.js';

let JWT = inicioSesion();    //despues hay que sacarlo del local storage, iniciosesion es por ahroa noams

let estadisticas = getInfoTabla(JWT);

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


let crearInput = async (stats, tipo, indexGlobal) => {   // tipo de dato requerido: death, confirmed, active, recovered

    let datapoints = [];

      stats.forEach(element => {

           let casosconfirmados = element.confirmed * 0.12;
           let locData = element.location;
           let yData;

          switch (tipo) {
              case ("death"):
                  yData = element.deaths;
                   break;
              case ("confirmed"):
                  yData = element.confirmed;
                  break;
              case ("active"):
                  yData = (element.confirmed * 0.12).toFixed(0);
                  break;
              case ("recovered"):
                 yData = (element.confirmed * 0.5).toFixed(0);
                 break;
             default: console.log("falta registrar el tipo de dato requerido o no es valido (usar death, confirmed, active o recovered");
                 break;
         }

         if (casosconfirmados >= 10000) {

             datapoints.push({ y: yData, label: locData });

            };

     });
     
    return selecc10(datapoints, indexGlobal);
    

};

let selecc10 = (arri, indexGlobal) => {
    let corteDe10 = [];
    for (let i = 0; i < 10; i++) {
        corteDe10.push(arri[i + indexGlobal]);
    };
    return corteDe10.reverse()
};


export default crearInput

//mostrar el largo camino del index globlal podria ser entretenido