const washButton = document.getElementById("wash-car");
const mowButton = document.getElementById("mow-lawn");
const pullWeedsButton = document.getElementById("pull-weeds");

const taskDiv = document.getElementById("task");
const totalDiv = document.getElementById("total");

const servicesObject = [
    {
        "service": "Wash Car",
        "price": 10,
    },
    {
        "service": "Mow Lawn",
        "price": 20,
    },
    {
        "service": "Pull Weeds",
        "price": 30,
    },
]

const servicesArray = [];
let incluidoEnDom = [];

// Mete servicios en el array
function putServicesOnArray(serviceFromButton, priceFromButton) {
    const elementToPush = {service: serviceFromButton, price: priceFromButton};
    // Verifica si el elemento existe en el array
    const found = servicesArray.some(el => el.service === elementToPush.service);
    if(!found) {
        servicesArray.push(elementToPush);
        console.log(servicesArray);
        printTask();
    }
}

// Saca servicios en el array
function quitServicesOnArray(elemento, id, priceId) {
    // Primero necesito saber el index del elemento en el array
    const myIndex = servicesArray.findIndex(object => {
        return object.service === elemento;
    });
    //console.log(myIndex);
    const elementService = document.getElementById(id);
    const elementPrice = document.getElementById(priceId);

    const indexOfServiceInArray2 = incluidoEnDom.indexOf(elemento);
    
    if (myIndex !== -1) {
        servicesArray.splice(myIndex, 1);
        incluidoEnDom.splice(indexOfServiceInArray2, 1);
        // Elimina el div por el ID
        elementService.remove();
        elementPrice.remove();
        printTask();
    }
    
    console.log(servicesArray);
}

// Saca los servicios del DOM

// Toma los servicios en el array y los mete en el DOM
// Imprime el servicio en el invoice
function printTask() {

    for(let i = 0; i < servicesArray.length; i++) {
        //console.log(servicesArray[i]);
        //console.log(servicesArray[i]["service"]);
        //console.log(servicesArray[i]["price"]);
        // Verifica si el servicio está en el DOM
        const foundInDom = incluidoEnDom.includes(servicesArray[i]["service"]);
        if(!foundInDom) {
            let serviceDiv = document.createElement('div');
            let priceDiv = document.createElement('div');
            let servicePar = document.createElement('p');
            let serviceInArray = servicesArray[i]["service"];
            let priceInArray = servicesArray[i]["price"];
            //const deleteButton = `<button onclick="quitServicesOnArray({service: ${service}, price: ${price}})">Remove</button>`;
            const serviceNoSpace = serviceInArray.replace(/\s+/g, '');
            const priceDivId = `delete${serviceNoSpace}`; 
            const deleteButton = document.createElement("button");

            // Le pone una clase al div para poder seleccionarlo despues y elminarlo
            serviceDiv.setAttribute("id", serviceNoSpace);

            // Llena el botón con texto y el onclick
            deleteButton.textContent = "Remove";
            //deleteButton.onclick = quitServicesOnArray(serviceInArray);
            //deleteButton.setAttribute("id", `remove${serviceNoSpace}`);
            //deleteButton.setAttribute("onclick", quitServicesOnArray(serviceNoSpace));
            deleteButton.addEventListener('click', function() {
                quitServicesOnArray(serviceInArray, serviceNoSpace, priceDivId);
            });
            
            // Llena el parrafo con el servicio
            servicePar.textContent = serviceInArray;
            incluidoEnDom.push(serviceInArray);
            serviceDiv.appendChild(servicePar);
            serviceDiv.appendChild(deleteButton);

            // Llena el div
            taskDiv.appendChild(serviceDiv);
            console.log(`Incluído en el DOM: ${incluidoEnDom}`);

            // También mete el precio en el DOM
            let pricePar = document.createElement('p');
            pricePar.textContent = `$${priceInArray}`;
            priceDiv.setAttribute("id", priceDivId);
            priceDiv.appendChild(pricePar);
            totalDiv.appendChild(priceDiv);
        }
    }
}

washButton.addEventListener('click', function() {
    putServicesOnArray("Wash Car", 10);
    
});

mowButton.addEventListener('click', function() {
    putServicesOnArray("Mow Lawn", 20);
});

pullWeedsButton.addEventListener('click', function() {
    putServicesOnArray("Pull Weeds", 30);
});



console.log(taskDiv);