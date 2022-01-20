import chartmodData from "./chartmod.js";


const modalVerMas = (pais, activos, recuperados, confirmados, muertes, i) => {

  let contenidomodal = document.getElementById(`Modal${pais}`);
  //poner una tabla para poder sacar los datos
  contenidomodal.innerHTML = `
                <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                    <h5 class="modal-title" id="idEjModal${pais}">Modificar a gusto</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
             </div>
              <div class="modal-body">
              <div class="text-center">
              <h6 id="Modpais${i}">${pais}</h6>
              <table class="table pl-5 border-0">
               <tbody>
                  <tr>
                    <th scope="row" class="float-left border-0">Activos</th>
                    <td class="float-right border-0" id="Modactivos${i}">${activos}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="float-left border-0">Recuperados</th>
                    <td class="float-right border-0" id="Modrecuperados${i}">${recuperados}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="float-left border-0">Confirmados</th>
                   <td class="float-right border-0" id="Modconfirmados${i}">${confirmados}</td>
                 </tr>
                  <tr>
                    <th scope="row" class="float-left border-0">Muertes</th>
                    <td class="float-right border-0" id="Modmuertes${i}">${muertes}</td>
                  </tr>
               </tbody>
             </table>
             </div>
                   <div>
                     <canvas id="ChartModalGen"></canvas>
                   </div>
             </div>
             <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
            </div>`;



};


export default modalVerMas