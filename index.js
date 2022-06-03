const washButton = document.getElementById("wash-car");
const mowButton = document.getElementById("mow-lawn");
const pullWeedsButton = document.getElementById("pull-weeds");

const taskDiv = document.getElementById("task");

//const washTask = document.getElementById("wash-task");
//const mowTask = document.getElementById("wash-task");
/* Hay que hacerlo con la creación de elementos en el Dom, como se vio en el cirso y en Odin así es más dinámico */

// Imprime el servicio en el invoice
function printTask(task) {
    if(task === "wash") {
        let washPar = document.createElement('p'); 
        washPar.textContent = "This is the wash task";
        taskDiv.appendChild(washPar);
    } else if (task === "mow") {
        let mowPar = document.createElement('p');
        mowPar.textContent = "This is the mow task";
        taskDiv.appendChild(mowPar);
    } else if (task === "pullWeeds") {
        const pullWeedsPar = document.createElement('p');
        pullWeedsPar.textContent = "This is the pull weeds task";
        taskDiv.appendChild(pullWeedsPar);
    }
}

washButton.addEventListener('click', function() {
    printTask("wash");
});

mowButton.addEventListener('click', function() {
    printTask("mow");
});

pullWeedsButton.addEventListener('click', function() {
    printTask("pullWeeds");
});

console.log(taskDiv);