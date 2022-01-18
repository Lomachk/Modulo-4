import { postData } from './AuthProcess.js';
import { getInfoTabla, getInfoPais } from './InfoRetrival.js';
import nuevaChart from './Tabla/Tabla.js';
import { crearDataset, paisesMod, selecc10 } from "./Tabla/InputsTablas.js";

let botonVerMas = async (estadisticas, indexGlobal) => {

    let vermastest = document.getElementById("vermasrequest").innerHTML

        if (vermastest === "") {

            
            let datosmod = await paisesMod(estadisticas, indexGlobal);

            let crearListaIzquierda = (datosmod, indexGlobal) => {

                let muchotexto = "";

                for (let i = 0; i < 10; i++) {

                    if (i === 0) {

                        muchotexto += `<a class="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" 
                 href="#list${i + indexGlobal}" role="tab" aria-controls="home">${datosmod.seleccionPais[i]}</a>`;


                    } else {

                        muchotexto += `<a class="list-group-item list-group-item-action" id="list-home-list" data-toggle="list" 
                 href="#list${i + indexGlobal}" role="tab" aria-controls="home">${datosmod.seleccionPais[i]}</a>`;


                    };

                };

                return muchotexto
            };

            let crearListaDerecha = (datosmod, indexGlobal) => {

                let muchotexto = "";

                for (let i = 0; i < 10; i++) {

                    if (i === 0) {

                        muchotexto += `
                    <div class="tab-pane fade show active" id="list${i + indexGlobal}" role="tabpanel" aria-labelledby="list-${i + indexGlobal}-list">
                    <h6>${datosmod.seleccionPais[i]}</h6>
                    <p>Casos activos: ${datosmod.seleccionActivos[i]}</p>
                    <p>Casos activos: ${datosmod.seleccionConfirmados[i]}</p>
                    <p>Casos activos: ${datosmod.seleccionMuertos[i]}</p>
                    <p>Casos activos: ${datosmod.seleccionRecuperados[i]}</p>
                     </div> `;

                    } else {

                        muchotexto += `
                <div class="tab-pane fade" id="list${i + indexGlobal}" role="tabpanel" aria-labelledby="list-${i + indexGlobal}-list">
                <h6>${datosmod.seleccionPais[i]}</h6>
                <p>Casos activos: ${datosmod.seleccionActivos[i]}</p>
                <p>Casos activos: ${datosmod.seleccionConfirmados[i]}</p>
                <p>Casos activos: ${datosmod.seleccionMuertos[i]}</p>
                <p>Casos activos: ${datosmod.seleccionRecuperados[i]}</p>
                 </div> `;

                    };

                };

                return muchotexto
            };

            let modvermas = document.getElementById("vermasrequest");

            modvermas.innerHTML = "";

            modvermas.innerHTML += `<div class="row">
                 <div class="col-4">
                 <div class="list-group" id="list-tab" role="tablist">
                 ${crearListaIzquierda(datosmod, indexGlobal)}  
                 </div>
                 </div>
                 <div class="col-8">
                 <div class="tab-content" id="nav-tabContent">
                  ${crearListaDerecha(datosmod, indexGlobal)} 
                  </div>
                 </div>
                </div>
                `;



        } else {

            document.getElementById("vermasrequest").innerHTML = ""

        }
};

export default botonVerMas;