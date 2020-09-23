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

let recipeBox = `<iframe id="jr-recipe"
title="Your recipe"
width="100%"
height="800px"
src="https://www.seriouseats.com/recipes/2014/01/simple-orange-carrot-ginger-juice-recipe.html"></iframe>`

//User stories

//I want to find recipes based on number of ingredients and time

function formatQueryParams(params) {
    console.log('formatQueryParams ran');
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function displayRecipes(responseJson) {
    console.log(responseJson);
    //if there are results, remove them
    $('#i-recipes-list').empty();
    //iterate through recipes array
    for (let i = 0; i < responseJson.hits.length; i++) {
        $('#i-recipes-list').append(`<li class="i-recipe-group">
        <div class="recipe-item">
            <h3>${responseJson.hits[i].recipe.label}</h3>
            <span>${responseJson.hits[i].recipe.totalTime} minutes / ${responseJson.hits[i].recipe.ingredientLines.length} ingredients</span>
            <p>${responseJson.hits[i].recipe.ingredientLines}</p>
        </div>
        <div class="square"><img src="${responseJson.hits[i].recipe.image}" alt="recipe image"/></div>
    </li>`)};
    $('#i-recipes').removeClass('hidden');
}

//Use BonAPI to get recipes based on parameters
function getRecipes(defIngr, ingrNum, timeNum) {
    const params = {
        app_id: appId,
        app_key: appKey,
        q: defIngr,
        time: ingrNum,
        ingr: timeNum,
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


//When form on index page is submitted, do this
function watchIndexForm() {
    $('#i-form').submit(event => {
        event.preventDefault();
        console.log('watchIndexForm ran');
        const defIngr = $('#i-def-ingr').val();
        const ingrNum = $('#i-ingr-num').val();
        const timeNum = $('#i-time-num').val();
        getRecipes(defIngr, ingrNum, timeNum);
    })
}



//I want to create a list of substitutions

//I want to dynamically alter the recipe text with my substitutions

$(watchIndexForm)






