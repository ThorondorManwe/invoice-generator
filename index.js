const washButton = document.getElementById("wash-car");
const mowButton = document.getElementById("mow-lawn");
const pullWeedsButton = document.getElementById("pull-weeds");

const taskDiv = document.getElementById("task");
const totalDiv = document.getElementById("total");
const totalPriceDiv = document.getElementById("cero");
const weAccept = document.getElementById("we-accept");

const invoiceButton = document.getElementById("invoice-button");

let sumaPrecio = 0;
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
function quitServicesOnArray(elemento, price, id, priceId) {
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
        // resta el precio del total que se imprime en el DOM y quita el parrafo we accept cuando no hay items
        sumaPrecio -= price;
        totalPriceDiv.textContent = `$${sumaPrecio}`;
        if(sumaPrecio === 0) {
            weAccept.textContent = "";
        }
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
            let servicePriceDiv = document.createElement('div');
            let priceDiv = document.createElement('div');
            let servicePar = document.createElement('p');
            let serviceInArray = servicesArray[i]["service"];
            let priceInArray = servicesArray[i]["price"];
            //const deleteButton = `<button onclick="quitServicesOnArray({service: ${service}, price: ${price}})">Remove</button>`;
            const serviceNoSpace = serviceInArray.replace(/\s+/g, '');
            const priceDivId = `delete${serviceNoSpace}`; 
            const deleteButton = document.createElement("p");
            let pricePar = document.createElement('p');

            

            // Le pone una clase al div para poder seleccionarlo despues y elminarlo
            serviceDiv.setAttribute("id", serviceNoSpace);

            // Llena el botón con texto y el onclick
            deleteButton.textContent = "Remove";
            deleteButton.classList.add('deleteService');
            //deleteButton.onclick = quitServicesOnArray(serviceInArray);
            //deleteButton.setAttribute("id", `remove${serviceNoSpace}`);
            //deleteButton.setAttribute("onclick", quitServicesOnArray(serviceNoSpace));
            deleteButton.addEventListener('click', function() {
                quitServicesOnArray(serviceInArray, priceInArray, serviceNoSpace, priceDivId);
            });
            
            // Llena el parrafo con el servicio
            servicePar.textContent = serviceInArray;
            incluidoEnDom.push(serviceInArray);

            serviceDiv.appendChild(servicePar);
            serviceDiv.appendChild(deleteButton);
            serviceDiv.classList.add('service-div');

            servicePriceDiv.appendChild(serviceDiv);
            servicePriceDiv.classList.add("servicePrice");

            // Llena el div
            taskDiv.appendChild(servicePriceDiv);
            console.log(`Incluído en el DOM: ${incluidoEnDom}`);

            // También mete el precio en el DOM
            
            pricePar.textContent = `$${priceInArray}`;
            priceDiv.appendChild(pricePar);
            priceDiv.classList.add('price-div');
            servicePriceDiv.setAttribute("id", priceDivId);
            servicePriceDiv.appendChild(priceDiv);

            // Llena el total primero en cero y después actualiza el valor conforme vaya sumando
            sumaPrecio += priceInArray;
            totalPriceDiv.textContent = `$${sumaPrecio}`;

            // Llena el párrafo we-accept
            weAccept.textContent = "We accept cash, credit card, or PayPal";
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

invoiceButton.addEventListener('click', function() {
    sumaPrecio = 0;
    // limpia los arrays de datos
    while (servicesArray.length > 0) {
        servicesArray.pop();
    }
    
    while (incluidoEnDom.length > 0) {
        incluidoEnDom.pop();
    }
    console.log(servicesArray);
    console.log(sumaPrecio);

    // Limpia el DOM de elementos
    totalPriceDiv.textContent = `$${sumaPrecio}`;
    const serviceDivs = document.querySelectorAll('.service-div');
    const priceDivs = document.querySelectorAll('.price-div');

    serviceDivs.forEach(div => {
        div.remove();
    });

    priceDivs.forEach(diver => {
        diver.remove();
    });
    
    weAccept.textContent = "";
    printTask();
    
   console.log("Print from button");
});

totalPriceDiv.textContent = `$${sumaPrecio}`;

console.log(taskDiv);