import { postData } from './AuthProcess.js';
import { getInfoTabla, getInfoPais } from './InfoRetrival.js';
import nuevaChart from './Tabla/Tabla.js';
import { crearDataset, paisesMod, selecc10 } from "./Tabla/InputsTablas.js";
import { SeccionVerMas } from './VerMas/vermas.js';




const completarAlRey = () => {

    document.getElementById("email1").value = "Shanna@melissa.tv";
    document.getElementById("password1").value = "secret";

};

export { completarAlRey }