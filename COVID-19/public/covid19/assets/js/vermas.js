import { postData } from './AuthProcess.js';
import { getInfoTabla, getInfoPais } from './InfoRetrival.js';
import nuevaChart from './Tabla/Tabla.js';
import { crearDataset, paisesMod, selecc10 } from "./Tabla/InputsTablas.js";

let SeccionVerMas = async (estadisticas, indexGlobal) => {  //SE QUEDO LLAMANDO ASI PERO SE LE PUEDE CAMBIAR PARA CLARIDAD

    let vermastest = document.getElementById("vermasrequest").innerHTML

    if (vermastest === "") {


        let datosmod = await paisesMod(estadisticas, indexGlobal);  // en este tienes que asegurarte que "estadisticas" sea un llamado a la api /Countrys/asdasd
        console.log("datos para lista de paises:")  //borrar esto luego de terminado el trabajo
        console.log(datosmod)                       //probablemente tendrás ue cambiar la dirección de los datos, como --> datosmod.seleccionPais[i]  qe esta mas abajo

        let crearListaIzquierda = (datosmod, indexGlobal) => {

            let muchotexto = "";

            for (let i = 0; i < 10; i++) {

                 muchotexto += `
                    
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${datosmod.seleccionPais[i]}
                    <span><button type="button" class="btn btn-link border-0" data-toggle="modal" data-target="#Modal${datosmod.seleccionPais[i]}">
                     Ver Más
                    </button></span>
                    </li>
                   

                    <!-- Modal del pais -->

                    <div class="modal fade" id="Modal${datosmod.seleccionPais[i]}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog">
                             <div class="modal-content">
                                 <div class="modal-header">
                                     <h5 class="modal-title" id="idEjModal${datosmod.seleccionPais[i]}">Modificar a gusto</h5>
                                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                         <span aria-hidden="true">&times;</span>
                                     </button>
                                 </div>
                                 <div class="modal-body">
                                     <h6> Info del pais Modal${datosmod.seleccionPais[i]}</h6>
                                     <p>Casos activos: ${datosmod.seleccionActivos[i]}</p>
                                     <p>Casos activos: ${datosmod.seleccionConfirmados[i]}</p>
                                     <p>Casos activos: ${datosmod.seleccionMuertos[i]}</p>
                                     <p>Casos activos: ${datosmod.seleccionRecuperados[i]}</p>
                                     
                                    <span> Grafikoko</span>
                                 </div>
                                 <div class="modal-footer">
                                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                 </div>
                             </div>
                        </div>
                    </div>
                    
                 
                 `;

            };

            return muchotexto
        };

        let modvermas = document.getElementById("vermasrequest");

        modvermas.innerHTML = "";

        modvermas.innerHTML +=  `${crearListaIzquierda(datosmod, indexGlobal)} `
        
        

    } else {

        document.getElementById("vermasrequest").innerHTML = ""

    }
};

export default SeccionVerMas;