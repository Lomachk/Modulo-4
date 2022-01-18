window.onload = () => {

    const getInfoTabla = async (jwt) => {

        try {

            const response = await fetch(`http://localhost:3000/api/total`,
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
    


const getInfoPais = async (jwt) => {

    try {

        const response = await fetch(`http://localhost:3000/api/countries/${pais}`,
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

        const estadisticas = await getInfoTabla(token);
        console.log("token guardado: ");
        console.log(estadisticas);

        
        return estadisticas
    }
};

// init();




document.getElementById("js-iniciar-wrapper").addEventListener("click", async () => {

    event.preventDefault();

    let email = "Shanna@melissa.tv"  //despues en un modal del boton iniciar sesion, transformar toda esta funcion
    let pass = "secret"

    let JWT = await postData(email, pass);

    let estadisticas = await getInfoTabla(JWT);

    console.log(estadisticas);
// despues hcer una fncion especial para la tabla

// funcion selector

let top10000muerte = () => {
    //casos activos es 3% del total para este ejercicio

    let datapoints = [];

    estadisticas.forEach(element => {
    
        if ((element.confirmed * 0.03) >= 10000) {
            let yData = element.deaths
            let locData = element.location
            datapoints.push( { y: yData, label: locData } )
            
        } 
        
    });

    return datapoints.reverse()
};

let top10000confirmados = () => {
    //casos activos es 3% del total para este ejercicio
    
       let datapoints = [];
   
       estadisticas.forEach(element => {
       
           if ((element.confirmed * 0.03) >= 10000) {
               let yData = element.confirmed
               let locData = element.location
               datapoints.push( { y: yData, label: locData } )
               
           } 
           
       });
   
       return datapoints.reverse()
   };

let top10000casos = () => {
 //casos activos es 3% del total para este ejercicio
    let datapoints = [];

    estadisticas.forEach(element => {

     let casosconfirmados = element.confirmed * 0.03

        if (casosconfirmados >= 10000) {
            let yData = (element.confirmed * 0.03).toFixed(0)
            let locData = element.location
            datapoints.push( { y: yData, label: locData } )
            
        } 
        
    });

    console.log("datanormal: ")
    console.log(datapoints)

    let selecc10 = (x) => {
        let corteDe10 = []
    for (let i = 0; i < 10; i++) {
        corteDe10.push(x[i]) ;         
    };
    return corteDe10
    };

    let  reision = selecc10(datapoints)
    console.log("seleccion")
    console.log(reision)

    let datarev = reision.reverse()  //hay q darlos vuelta por el diseño de la tabla  ¡¡¡ ME DIO FLOJERA BUSCAR OTRAAAAAA!!!!!
    console.log("datarev: ")
    console.log(datarev) 

    

    

    return reision
};

let top10000recuperados = () => {
    //casos recuperados es 50% del total para este ejercicio
       let datapoints = [];
   
       estadisticas.forEach(element => {
       
           if ((element.confirmed * 0.03) >= 10000) {
               let yData = element.confirmed * 0.5
               let locData = element.location
               datapoints.push( { y: yData, label: locData } )
               
           } 
           
       });
   
       return datapoints.reverse()
   };

//    console.log("casos: ")
   console.log(top10000casos());
//    console.log(top10000casos().sort());
// console.log(top10000muerte());

    
    var chart = new CanvasJS.Chart("tabla", {
        animationEnabled: true,
        title:{
            text: "Paises Covid19"
        },
        axisY: {
            title: "Estadísticas",
            includeZero: true
        },
        legend: {
            cursor:"pointer",
            itemclick : toggleDataSeries
        },
        toolTip: {
            shared: true,
            content: toolTipFormatter
        },
        data: [{
            type: "bar",
            showInLegend: true,
            name: "Casos activos",
            color: "purple",
            dataPoints: top10000casos()
        },
        // {
        //     type: "bar",
        //     showInLegend: true,
        //     name: "Casos confirmados",
        //     color: "orange",
        //     dataPoints: { y: "weo", label: "sadasd"}
            // dataPoints: top10000confirmados()
        // }
        // {
        //     type: "bar",
        //     showInLegend: true,
        //     name: "Muertes Confirmadas",
        //     color: "red",
        //     dataPoints:  top10000muerte()
            
        // },
        // {
        //     type: "bar",
        //     showInLegend: true,
        //     name: "recuperados",
        //     color: "aqua",
        //     dataPoints: top10000recuperados()
        // }
    ]
    }); 
    
    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
    }
        
        function toolTipFormatter(e) {
            var str = "";
            var str2 ;
            for (var i = 0; i < e.entries.length; i++){
                var str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\">" + e.entries[i].dataSeries.name + "</span>: <strong>"+  e.entries[i].dataPoint.y + "</strong> <br/>" ;
                str = str.concat(str1);
            }
            str2 = "<strong>" + e.entries[0].dataPoint.label + "</strong> <br/>";
            return (str2.concat(str));
        }
        
        //fin tabla


chart.render();

});


// crear funciones para
// generar generar tabla 
// popup de mas informacion 
// modal con la info personalizada 
// cerrar sesion 
// iniciar sesion -> link con postdata en Submit 

//agregar a la tabla ina id por cada pais con el nombre de caa pais

//variables necesarias
//una que identifique a los paises


}