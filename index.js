'use strict';

const appId = "b4955748";
const appKey = "465177a917ad855574dcacd25dca179a";
const baseURL = "https://api.edamam.com/search";

let subBox2 = `<div>
    <p>No [input], huh?</p>
    <p>Choose your substitute</p>
    <form>
        <input type="radio" id="sub-food" name="sub-food"><label for="sub-food">sub</label>
        <input type="submit" value="Sub!">
    </form>
</div>`

let subBox3 = `<div class="subBox3">
    <p>My subs:</p>
    <ul>
        <li>INPUT > SUB</li>
    </ul>
    <p>Sub more?</p>
    <form>
        <label for="sub">I don't want </label><input type="text" id="sub" name="sub">
        <input type="submit" value="Sub!">
    </form>
    <input type="submit" value="Nope, I'm good!"">
</div>`

let subBox4 = `<div class="subBox4">
    <p>My subs:</p>
    <ul>
        <li>INPUT to SUB</li>
    </ul>
    <input type="submit" value="Sub into recipe">
    <input type="submit" value="Modify sub list">
</div>`

//User stories

//I want to find recipes based on number of ingredients and time

function formatQueryParams(params) {
    console.log('formatQueryParams ran');
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function formatIngredients(responseJson, i) {
    let ingrList = responseJson.hits[i].recipe.ingredientLines;
    for (let j = 0; j < responseJson.hits[i].recipe.ingredientLines.length; j++) {
        $(`.ingr-list-${j}`).append(`<li>work dammit</li>`);
        console.log()
    }
}

let destination = `/just-recipe.html`

function displayRecipes(responseJson) {
    console.log(responseJson);
    //if there are results, remove them
    $('#i-recipes-list').empty();
    //iterate through recipes array
    for (let i = 0; i < responseJson.hits.length; i++) {
        // formatIngredients(responseJson, i);
        $('#i-recipes-list').append(`<li class="i-recipe-group">
        <div class="recipe-item">
            <h3 class-"i-my-recipe">${responseJson.hits[i].recipe.label}</h3>
            <h4 class="i-ingrs-num">${responseJson.hits[i].recipe.ingredientLines.length} ingredients</h4>
            <ol class="ingr-list-${i} i-my-ingrs">${
                responseJson.hits[i].recipe.ingredientLines.map(item =>
                    `<li>${item}</li>`).join("")}</ol>
            <form action="/just-recipe.html" id="i-lets-make-it">
                <input type="hidden" name="title" value="${responseJson.hits[i].recipe.label}">
                <input type="hidden" name="ingredients" value="${responseJson.hits[i].recipe.ingredientLines}">
                <input type="hidden" name="src" value="${responseJson.hits[i].recipe.image}">
                <input type="hidden" name="num" value="${responseJson.hits[i].recipe.ingredientLines.length}">
                <input type="hidden" name="link" value="${responseJson.hits[i].recipe.url}">
                <input id="test" type="submit" value="Let's make it!"/>
            </form>
        </div>
        <div class="square"><img src="${responseJson.hits[i].recipe.image}" alt="recipe image"/></div>
    </li>`)};
    $('.i-recipes-found').html(`${responseJson.hits.length} recipes found!`)
    $('#i-recipes').removeClass('hidden');
}


//Use BonAPI to get recipes based on parameters
function getRecipes(defIngr, ingrNum) {
    const params = {
        app_id: appId,
        app_key: appKey,
        q: defIngr,
        ingr: ingrNum,
    }

    const queryString = formatQueryParams(params);

    const url = baseURL + '?' + queryString;

    console.log(url)

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayRecipes(responseJson));
}


function unhappyResult() {
    $('#i-recipes-list').empty();
    $('.i-recipes-found').html(`No recipes found. Try a different ingredient or adjust the number of ingredients you want to use.`)
    $('#i-recipes').removeClass('hidden');
}

//When form on index page is submitted, do this
function watchIndexForm() {
    $('#i-form').submit(event => {
        event.preventDefault();
        console.log('watchIndexForm ran');
        const defIngr = $('#i-def-ingr').val();
        const ingrNum = $('#i-ingr-num').val();
        if (defIngr.length === 0 || ingrNum === 0) {
            unhappyResult();
        } else {
            getRecipes(defIngr, ingrNum);
        }
    })
}

function watchLetsMakeIt() {
    $('#i-recipes').on('submit', event => {
        console.log('watchLetsMakeIt ran');
    })
}

function populateJRPage() {
    const [title, ingredients, src, num, link] = decodeURIComponent(window.location.search.substr(1)
            .replaceAll("+", " "))
            .split('&')
            .map(part => part.split("=")[1])
    const prettyIngr = ingredients.replaceAll(',');
    $('.jr-recipe-title').html(`${title}`);
    $('.jr-ingr-num').html(`${num} ingredients`);
    $('.jr-recipe-img').html(`<img src="${src}" alt="recipe image">`);
    $('.jr-recipe-box').append(`<iframe id="jr-recipe"
    title="Your recipe"
    width="100%"
    height="800px"
    src="${link}"></iframe>`)
}

//BonAPI stuff

function getSubs() {
    console.log('getSubs ran')
    let subUrl = "https://www.bon-api.com/api/v1/ingredient/alternatives/whole_cow_milk/";
    let token = "Token ec69b072c20a1d404b390bc1afa21f0b15b196d4";

    const options = {
        headers: new Headers({
            "Authorization": token})
    };

    fetch(subUrl, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => console.log(responseJson));
}

function watchSubSubmit() {
    $('.jr-sub-station').on('submit', event => {
        event.preventDefault();
        console.log('watchSubSubmit ran')
        let request = $('.jr-sub-request').val();
        getSubs();
    })
}



function onPageLoad() {
    watchIndexForm();
    watchLetsMakeIt();
    populateJRPage();
    watchSubSubmit();
}

$(onPageLoad)




