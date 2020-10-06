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
                <input action="#top-of-page" type="submit" value="Let's make it!"/>
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
        <div class="jr-item">
            <div class="jr-recipe-img">
                <img src="${src}" alt="recipe image">
            </div>
            <div>
                <h2>${title}</h2>
                <span>${num} ingredients</span>
            </div>
        </div>
        <section class="jr-breakouts"> 
            <div class="jr-sub-station">
                <h2>Sub station</h2>
                <p>Don't feel like going to the grocery store? Find some alternatives!</p>
                <iframe width="100%" height="400" src="https://bon-api.com/iframe/1"></iframe>
            </div>
            <div class="jr-recipe-ingredients">
                <h2>Sub log</h2>
                <form>
                    <label for="have-not">I'm swapping </label><input type="text" name="have-not" id="have-not">
                    <label for="have">for </label><input type="text" name="have" id="have">.
                    <input type="submit" class="add-sub" value="Add">
                </form>
                <ul id="jr-sub-log"></ul>
            </div>
        </section>
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

function watchSubLogSubmit() {
    $(".everything").on("submit", ".add-sub", function(event) {
        event.preventDefault();
        console.log('watchSubLogSubmit ran');
        // const haveNot = $("#have-not").val();
        // const have = $("#have").val();
        // console.log(haveNot);
        // console.log(have);
    })
}

function onPageLoad() {
    watchLetsEat();
    watchLetsMakeIt();
    watchSubLogSubmit();
}

$(onPageLoad)




