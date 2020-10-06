'use strict';

const appId = "b4955748";
const appKey = "465177a917ad855574dcacd25dca179a";
const baseURL = "https://api.edamam.com/search";

//User stories

//I want to find recipes based on number of ingredients and time

function holdIndexHTML() {
    return `
    <p>Welcome to Hungry but Lazy!</p>
    <p>This site aims to help you find recipes when you're super hungry and don't feel like putting in a lot of effort.</p>
    <p>To get started, use the form below to name an ingredient you know you definitely have in your kitchen and a max number of ingredients.</p>
    <div class="i-parameters">
        <p>Choose your parameters!</p>
        <form id="i-form">
            <input type="text" id="i-def-ingr" name="def-ingredient"><label for="def-ingredient"> is an ingredient I definitely have.</label><br>
            <input type="number" id="i-ingr-num" name="ingredients"><label for="ingredients"> is the number of ingredients I'm willing to use.</label><br>
            <input type="submit" value="Let's eat!">
            <p id="js-error-message"></p>
        </form>
    </div>`
}

function renderIndex() {
    $(".everything").empty();
    $(".everything").append(holdIndexHTML());
}

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

function displayRecipes(responseJson) {
    console.log(responseJson);
    //if there are results, remove them
    $('#i-recipes-list').empty();
    //iterate through recipes array
    for (let i = 0; i < responseJson.hits.length; i++) {
        // formatIngredients(responseJson, i);
        $('#i-recipes-list').append(`<li class="i-recipe-group">
        <div class="recipe-item">
            <h3 class="i-my-recipe">${responseJson.hits[i].recipe.label}</h3>
            <h4 class="i-ingrs-num">${responseJson.hits[i].recipe.ingredientLines.length} ingredients</h4>
            <ol class="ingr-list-${i} i-my-ingrs">${
                responseJson.hits[i].recipe.ingredientLines.map(item =>
                    `<li>${item}</li>`).join("")}</ol>
            <form class="i-lets-make-it">
                <a href="#top-of-page"><input type="submit" value="Let's make it!"/></a>
                <input type="hidden" name="title" value="${responseJson.hits[i].recipe.label}">
                <input type="hidden" name="ingredients" value="${responseJson.hits[i].recipe.ingredientLines}">
                <input type="hidden" name="src" value="${responseJson.hits[i].recipe.image}">
                <input type="hidden" name="num" value="${responseJson.hits[i].recipe.ingredientLines.length}">
                <input type="hidden" name="link" value="${responseJson.hits[i].recipe.url}">
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
function watchLetsEat() {
    $('#i-form').submit(event => {
        event.preventDefault();
        console.log('watchIndexForm ran');
        const defIngr = $('#i-def-ingr').val();
        const ingrNum = $('#i-ingr-num').val();
    //make both fields required or else account for not having an ingredient num value
        if (defIngr.length === 0 || ingrNum === 0) {
            unhappyResult();
        } else {
            getRecipes(defIngr, ingrNum);
        }
    })
}

function watchLetsMakeIt() {
    $('#i-recipes').on('submit', event => {
        event.preventDefault();
        console.log('watchLetsMakeIt ran');
        $(".everything").empty();
        let title = $(event.target).closest(".i-lets-make-it").find('input[name="title"]').val();
        let src = $(event.target).closest(".i-lets-make-it").find('input[name="src"]').val();
        let num = $(event.target).closest(".i-lets-make-it").find('input[name="num"]').val();
        let link = $(event.target).closest(".i-lets-make-it").find('input[name="link"]').val();
        holdRecipeHTML(src, title, num, link);
    })
}

// function populateJRPage() {
//     // const [title, ingredients, src, num, link] = decodeURIComponent(window.location.search.substr(1)
//     //         .replaceAll("+", " "))
//     //         .split('&')
//     //         .map(part => part.split("=")[1])
//     // $('.jr-recipe-title').html(`${title}`);
//     // $('.jr-ingr-num').html(`${num} ingredients`);
//     // $('.jr-recipe-img').html(`<img src="${src}" alt="recipe image">`);
//     // $('.jr-recipe-box').append(`<iframe id="jr-recipe"
//     // title="Your recipe"
//     // width="100%"
//     // height="800px"
//     // src="${link}"></iframe>`)
//     let title = $(this).closest("form").find("input[name=title]").val();
//     let src = $("input[name=src]").val();
//     let num = $("input[name=num]").val();
//     let link = $("input[name=link]").val();
//     holdRecipeHTML(src, title, num, link);
// }

function holdRecipeHTML(src, title, num, link) {
    const html= `<div class="jr-group">
            <div class="jr-recipe-img">
                <img src="${src}" alt="recipe image">
            </div>
            <div>
                <h2>${title}</h2>
                <span>${num} ingredients</span>
                <button href="#i-recipes">Choose new recipe</button>
                <button class="new-params">Set different parameters</button>
        </div>
    </div>
    <section>
        <div class="jr-recipe-box">
            <iframe id="jr-recipe"
                title="Your recipe"
                width="100%"
                height="800px"
                src="${link}">
            </iframe>
        </div>
    </section>`
    $('.everything').empty();
    $(".everything").append(html);
}


function watchNewParams() {
    $(".everything").on("submit", ".new-params", event => {
        renderIndex();
    })
}

function onPageLoad() {
    renderIndex();
    watchLetsEat();
    watchLetsMakeIt();
}

$(onPageLoad)




