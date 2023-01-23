let containerElement = document.getElementById('container')

let displayVeggieButton = document.getElementById('button');

let nameString = document.getElementById('nameInput');

let displayName = document.getElementById('display');

displayVeggieButton.addEventListener('click', async () =>
{
    let response = await fetch(`http://localhost:5000/veggie/${nameString.value}`);
    response.json().then((parsedData) =>
    {
        console.log(parsedData);

        displayName.textContent = parsedData.name;
        if (parsedData.readyToEat !== true) {
            displayName.style.color = "red"
        } else {
            displayName.style.color = "green"
        }
    })

})