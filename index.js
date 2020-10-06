'use strict';

const appId = "b4955748";
const appKey = "465177a917ad855574dcacd25dca179a";
const baseURL = "https://api.edamam.com/search";

//returns starting HTML when called
function holdIndexHTML() {
    return `
    <p>Welcome to Hungry but Lazy!</p>
    <p>This site aims to help you find recipes when you're super hungry and don't feel like putting in a lot of effort.</p>
    <p>To get started, use the form below to name an ingredient you know you definitely have in your kitchen and a max number of ingredients.</p>
    <div class="i-parameters">
        <p>Choose your parameters!</p>
        <form id="i-form">
            <input type="text" id="i-def-ingr" name="def-ingredient" required><label for="def-ingredient"> is an ingredient I definitely have.</label><br>
            <input type="number" id="i-ingr-num" name="ingredients" required><label for="ingredients"> is the number of ingredients I'm willing to use.</label><br>
            <input type="submit" value="Let's eat!">
            <p id="js-error-message"></p>
        </form>
    </div>`
}

//render starting HTML, whether at page load or when directed from recipe page
function renderIndex(hideRecipes) {
    console.log("renderIndex ran")
    $(".everything").empty();
    //if coming from recipe page (true), add .hidden back to hide list of recipes
    if (hideRecipes) $("#i-recipes").addClass("hidden");
    $(".everything").append(holdIndexHTML());
}

function formatQueryParams(params) {
    console.log('formatQueryParams ran');
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

//Get those recipes on the page
function displayRecipes(responseJson) {
    //if 0 recipes are returned, run the unhappyResult function end the
    //function then and there
    if (responseJson.count === 0) {
        unhappyResult();
        return;
    }
    console.log(responseJson);
    //if there are results, remove them
    $('#i-recipes-list').empty();
    //iterate through recipes array and put the appropriate strings in the
    //appropriate places
    for (let i = 0; i < responseJson.hits.length; i++) {
        $('#i-recipes-list').append(`<li class="i-recipe-group">
        <div class="recipe-item">
            <h3 class="i-my-recipe">${responseJson.hits[i].recipe.label}</h3>
            <h4 class="i-ingrs-num">${responseJson.hits[i].recipe.ingredientLines.length} ingredients</h4>
            <ol class="ingr-list-${i} i-my-ingrs">${
                //make the ingredients look nice
                responseJson.hits[i].recipe.ingredientLines.map(item =>
                    `<li>${item}</li>`).join("")}</ol>
            <form class="i-lets-make-it">
                <input type="submit" value="Let's make it!"/>
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


//Taking the input values, create the API url, fetch that url, then format
//the response in JSON
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

//if improper inputs are given, display the following HTML
function unhappyResult() {
    $('#i-recipes-list').empty();
    $('.i-recipes-found').html(`No recipes found. Try a different ingredient or adjust the number of ingredients you want to use.`)
    $('#i-recipes').removeClass('hidden');
}

//When "Let's eat!" button is clicked, ...
function watchLetsEat() {
    $('.everything').on("submit", "#i-form", event => {
        event.preventDefault();
        console.log('watchIndexForm ran');
        //...take the values from the "ingredient I have" input...
        const defIngr = $('#i-def-ingr').val();
        //...and the "number of ingredients I'll use" input...
        const ingrNum = $('#i-ingr-num').val();
        console.log(ingrNum)
        //access Edamam API to get recipes
        getRecipes(defIngr, ingrNum);
        })
}

//When the "Let's make it" button is clicked, replace parameters box with recipe
//information, as stored in holdRecipeHTML function
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
        //whenever this button is clicked, send us to top of page
        location = "#";
    })
}

//This is the HTML that creates the appropriate recipe page
function holdRecipeHTML(src, title, num, link) {
    const html= `<div class="jr-group">
            <div class="jr-recipe-img">
                <img src="${src}" alt="recipe image">
            </div>
            <div>
                <h2>${title}</h2>
                <span>${num} ingredients</span>
                <form class="new-params">
                    <input type="submit" value="Set different parameters">
                </form>
                <form>
                    <input type="submit" formaction="#i-recipes" value="Choose different recipe"t>
                </form>
        </div>
    </div>
    <section>
        <div class="jr-recipe-box">
            <iframe 
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                id="jr-recipe"
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

//when this button is clicked, make the page look like it did on page load
function watchNewParams() {
    $(".everything").on("submit", ".new-params", event => {
        event.preventDefault();
        renderIndex(true);
    })
}

function onPageLoad() {
    renderIndex(false);
    watchLetsEat();
    watchLetsMakeIt();
    watchNewParams();
}

//When the page loads, run the above functions
$(onPageLoad)




