console.log("js file connected");

//Fruit submit button
let submitFruitButton = document.getElementById('submit-fruit-button');

submitFruitButton.addEventListener('click', async () => {
    // send a request to Express 
    // result is the response from the server
    // get element
    // let nameElement = document.getElementById('name-input')
    // // get value of element
    // let nameString = nameElement.value;

    let nameString = document.getElementById('name-fruit-input').value;
    let colorString = document.getElementById('color-fruit-input').value;
    let ageNumber = +document.getElementById('age-fruit-input').value;
    // using ternary operator here - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    let readyBool = document.getElementById('ready-fruit-bool').value === "true" ? true : false;

    // packing all our data in an object
    // same as 
    // nameString: nameString
    const fruit = {
        nameString,
        colorString,
        ageNumber,
        readyBool
    }


    let response = await fetch('http://localhost:5000/create_fruit', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        // to send JSON data over HTTP
        body: JSON.stringify(fruit)
    })
    let uploadStatusTag = document.getElementById('upload-fruit-status');
    console.log(response.status);
    if (response.status === 200) {
        console.log(response);
        console.log("fruit upload complete!!!");
        uploadStatusTag.textContent = "Fruit Upload Completed!";
        uploadStatusTag.style.color = "green";

    } else {
        console.log(response);
        console.log("fruit upload failed");
        console.log;
        uploadStatusTag.textContent = "Fruit Upload Failed!";
        uploadStatusTag.style.color = "red";

    }

    // axios({
    //     method: "post",
    //     url: "'http://localhost:5000/create_fruit'",
    //     body: fruit
    // })

})

//Veggie submit button
let submitVeggieButton = document.getElementById('submit-veggie-button');

submitVeggieButton.addEventListener('click', async () =>
{
    let nameString = document.getElementById('name-veggie-input').value;
    let colorString = document.getElementById('color-veggie-input').value;
    let ageNumber = +document.getElementById('age-veggie-input').value;
    let readyBool = document.getElementById('ready-veggie-bool').value === "true" ? true : false;

    const veggie = {
        nameString,
        colorString,
        ageNumber,
        readyBool
    }

    let response = await fetch('http://localhost:5000/create_veggie', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        // to send JSON data over HTTP
        body: JSON.stringify(veggie)
    })

    let uploadStatusTag = document.getElementById('upload-veggie-status');
    console.log(response.status);
    if (response.status === 200) {
        console.log(response);
        console.log("veggie upload complete!!!");
        uploadStatusTag.textContent = "Veggie Upload Completed!";
        uploadStatusTag.style.color = "green";

    } else {
        console.log(response);
        console.log("veggie upload failed");
        console.log;
        uploadStatusTag.textContent = "Veggie Upload Failed!";
        uploadStatusTag.style.color = "red";
    }

})

//Delete bad data button
let deleteButton = document.getElementById('delete');

deleteButton.addEventListener('click', async () => {
   let response = await fetch('http://localhost:5000/delete_nameless_data', {
        method: "delete",
    });
    // console.log(response);

    let parsedData = await response.json()
    console.log(parsedData);
});

let displayPageButton = document.getElementById('display-page-button');

displayPageButton.addEventListener('click', () => 
{
    // change HTML files (from index to display_food.html)
    window.location.href = "./display_fruit"
})

displayVeggiesButton = document.getElementById('display-veggie-button');

displayVeggiesButton.addEventListener('click', () => 
{
    // change HTML files (from index to display_food.html)
    window.location.href = "./display_veggie"
})

let displaySingleVeggieButton = document.getElementById('single-veggie-page');
displaySingleVeggieButton.addEventListener('click', () =>
{
    window.location.href = './show_single_veggie'
})