import axios from 'axios';

// kritieke vragen
// 1. valuta check werkt niet bij minder dan 2? Teller werkt niet bij 1 valuta
// 2. pagina verversen/resultaat opschonen 2de keer zoeken?


let fieldValue = '';

// html locaties
const imageWrapper = document.getElementById('image-wrapper')
const nameAndFlag = document.getElementById('name-and-flag')
const searchContainer = document.getElementById('search-container')
const inputForm = document.getElementById("user-search-bar")

// event listeners
inputForm.addEventListener('keyup', dataField)
// inputForm.addEventListener('keyup', cleanCheck)

const countryError = document.createElement("P");


// function cleanCheck(e) {
//     if (e.target.value === '') {
//         countryError.textContent = '';
//         searchContainer.textContent = '';
//         nameAndFlag.textContent = '';
//         imageWrapper.removeAttribute('class')
//         searchContainer.removeAttribute('class')
//     }
// }

function dataField(e) {
    fieldValue = e.target.value;
}

console.log(fieldValue)

const submitSearch = document.getElementById('submit-form');
submitSearch.addEventListener("submit", handleSubmit);
function handleSubmit(e){
    e.preventDefault()
    getCountries(fieldValue);

    inputForm.value = '';
    console.log(e)
}

// fieldValue.map(() => {
//     console.log(fieldValue)
// })

// submitSearch.addEventListener("submit", refresh)
//
// function refresh (e) {
//     if ( e === 2 ) {
//         location.reload();
//     }
// }

const getCountries = async ( searchString ) => {

    imageWrapper.textContent = '';
    // nameAndFlag.textContent = '';
    searchContainer.textContent = '';
    inputForm.textContent = '';

    try {
    const response = await axios.get(`https://restcountries.com/v2/name/${searchString}`);

    console.log(response)


        //functies die content injecteren op de webpagina
        const countryName= document.createElement("h2")
        countryName.textContent = response.data[0].name
        nameAndFlag.appendChild(countryName);

        const countryInfo = document.createElement('p')
        const {name, subregion, population} = response.data[0]
        countryInfo.textContent = `${name} is situated in ${subregion}. It has a population of ${population} people.`
        searchContainer.setAttribute('class','search-container-js')
        searchContainer.appendChild(countryInfo)

        const countryFlag = document.createElement('img')
        countryFlag.setAttribute('src',response.data[0].flag)
        countryFlag.setAttribute('class','flag-image')
        imageWrapper.appendChild(countryFlag)

        const { capital } = response.data[0]
        const { name:currencyName } = response.data[0].currencies[0]
        const { name:currencyName2 } = response.data[0].currencies[1]


        const currencyCheck = (numberOfCurrencies) => {
            if (numberOfCurrencies === 1 ) {
                const countryValuta = document.createElement('p')
                countryValuta.textContent = `The capital is ${ capital} and you can pay in ${currencyName}`
                searchContainer.appendChild(countryValuta)
            } else {
                const countryValuta = document.createElement('p')
                countryValuta.textContent = `The capital is ${ capital} and you can pay in ${currencyName} and in ${currencyName2}`
                searchContainer.appendChild(countryValuta)

                console.log(response.data[0].currencies.length)
            }
        }
        currencyCheck(response.data[0].currencies.length)



        const countryLanguage = document.createElement('p')
        const {name:languageName} = response.data[0].languages[0]
        countryLanguage.textContent = `They speak ${languageName} `
        searchContainer.appendChild(countryLanguage)




    } catch ( e ) {

        countryError.textContent = `${searchString} is not a country! Please try again!`;
        document.getElementById("country-info").appendChild(countryError);
        // countryError.setAttribute('class', 'errorWarning')

    }
}



// getCountries(fieldValue)
//


