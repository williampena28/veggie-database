console.log('js file connected');

let containerElement = document.getElementById('container')

const getVeggieData = async () =>
{
    let data = await fetch('/veggie/:veggieName');
    data.json().then((parsedData) =>
    {
        console.log(parsedData);

        parsedData.forEach((object) =>
        {
            let pTag = document.createElement("p"); // <p></p>
            pTag.textContent = object.name; // <p>apple</p>
            if (object.readyToEat !== true) {
                pTag.style.color = "red"
            } else {
                pTag.style.color = "green"
            }
            containerElement.appendChild(pTag);
        })
    })
}

getVeggieData();