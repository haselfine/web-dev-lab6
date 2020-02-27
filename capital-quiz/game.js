let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')
let playAgainButton = document.querySelector('#play-again-button')

resultTextElement.innerHTML = ''

//when the page loads, select an element at random from the countriesAndCodes array
function getRandomCountry(){
    let randomNumber = Math.floor(Math.random() * Math.floor(countriesAndCodes.length))
    let randomCountry = countriesAndCodes[randomNumber]
    console.log(randomNumber)
    return randomCountry
}

randomCountry = getRandomCountry()

// display the country's name in the randomCountryElement 
randomCountryElement.innerHTML = randomCountry.name

// add a click event handler to the submitButton
submitButton.addEventListener('click', function(){
    //read the text from the userAnswerElement
    let userAnswer = userAnswerElement.value 
    console.log(randomCountry['alpha-2'])
    getWorldBankResponse(randomCountry['alpha-2'], userAnswer)
})

function getWorldBankResponse(countryAbbr, userAnswer){
    let url = `https://api.worldbank.org/v2/country/${countryAbbr}?format=json`
    
    //Use fetch() to make a call to the World Bank API with the two-letter country code
    fetch(url)
        .then( res => res.json() )
        .then( worldBankResponse => {
            console.log(worldBankResponse)
            let capitalRes = worldBankResponse[1][0].capitalCity // If the API call was successful, extract the capital city from the World Bank API response.

            if(capitalRes.toLowerCase() === userAnswer.toLowerCase()){ //Compare it to the user's answer.
                resultTextElement.innerHTML = `Correct! The capital of ${randomCountry.name} is ${capitalRes}.` //display an appropriate message in the resultTextElement to tell the user if they are right
            } else {
                resultTextElement.innerHTML = `Sorry. The capital of ${randomCountry.name} is not ${userAnswer}; it is ${capitalRes}.`
            }
        })
        .catch( err => { //Verify no errors were encountered in the API call. If an error occurs, display an alert message.
            console.log(err)
            alert("Something went wrong in retrieving the correct answer.")
        })
}

playAgainButton.addEventListener('click', function(){ //connect the play again button
    userAnswerElement.value = '' //Clear the user's answer
    resultTextElement.innerHTML = ''
    randomCountry = getRandomCountry() //select a new random country
    randomCountryElement.innerHTML = randomCountry.name //display the country's name
})