'use strict';

const appId = "b4955748";
const appKey = "465177a917ad855574dcacd25dca179a";
const baseURL = "https://api.edamam.com/search";


//-----HOLD HTML FUNCTIONS-----

//returns starting HTML for Step One
function holdStepOneHTML() {
    console.log('holdStepOneHTML ran')
    return `<div class="parameters">
    <p>To get started, use this form to name an ingredient you think all your guests will definitely have in your kitchen and a max number of ingredients you want the recipe to have.</p>
    <form id="1-form">
        <input type="text" id="i-def-ingr" name="def-ingredient" required><label for="i-def-ingr"> is an ingredient we all have.</label><br>
        <input type="number" id="i-ingr-num" name="ingredients" required><label for="i-ingr-num"> is the max number of ingredients we want to use.</label><br>
        <input type="submit" value="Find a recipe!">
    </form>
</div>`
}

//returns HTML that creates recipe results
function holdRecipeHTML(src, title, num, link, ol) {
    const html= `<li class="i-recipe-group">
        <div class="recipe-item">
            <h3 class="i-my-recipe">${title}</h3>
            <h4 class="i-ingrs-num">${num} ingredients</h4>
            <ol class="ingr-list i-my-ingrs">${ol}</ol>
            <a href="${link}" target="_blank">Link to recipe page</a>
            <form class="see-all-again">
                <input type="submit" value="See all recipes again"/>
            </form>
            <form class="set-new-params">
            <input type="submit" value="Toggle parameters box"/>
        </form>
        </div>
        <div class="square"><img src="${src}" alt="recipe image"/></div>
    </li>`
    $('#1-recipes').toggleClass("hidden");
    $(".1-recipe-results").append(html);
}

//returns HTML for details form in Step Two
function holdDetailsFormHTML() {
    return `    <form id="details">
    <label for="details-date">Date: </label><input type="date" name="date" id="details-date" required><br>
    <label for="details-time">Time: </label><input type="time" name="time" id="details-time" required><br>
    <fieldset id="details-platform">
        <legend for="platform">Videochat platform: </legend>
        <input type="radio" name="platform" id="zoom" value="Zoom"><label for="zoom">Zoom</label><br>
        <input type="radio" name="platform" id="facebook" value="Facebook"><label for="facebook">Facebook</label><br>
        <input type="radio" name="platform" id="skype" value="Skype"><label for="skype">Skype</label><br>
        <input type="radio" name="platform" id="facetime" value="FaceTime"><label for="facetime">FaceTime</label><br>
        <input type="radio" name="platform" id="whatsapp" value="WhatsApp"><label for="whatsapp">WhatsApp</label><br>
        <input type="radio" name="platform" id="other"><label for="other">Other</label> <input type="text" class="other" value=" " required><br>
    </fieldset>
    <input type="submit" value="Submit">
</form>`
}

//returns HTML that comes up after details form on Step Two is submitted
function holdSetDetailsHTML(date, time, platform) {
    return `<p>Your party will be on ${date} at ${time} using ${platform}.</p>
    <form id="new-details">
        <input type="submit" value="Choose new details?">
    </form>`
}

//-----RENDER FUNCTIONS-----

//adds starting step one HTML where it belongs
function renderStepOne() {
    $("#step-one").append(holdStepOneHTML())
}

//adds details form on Step Two to the page
function renderDetailsForm() {
    $(".event-details").append(holdDetailsFormHTML());
}

//-----EDAMAM API FUNCTIONS-----

//formats query params in a way that the API can actually use
function formatQueryParams(params) {
    console.log('formatQueryParams ran');
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

//Get those recipes on the page
function displayRecipes(responseJson) {
    console.log('displayRecipes ran')
    //if 0 recipes are returned, run the unhappyResult function end the
    //function then and there
    if (responseJson.count === 0) {
        unhappyResult();
        return;
    }
    console.log(responseJson);
    //if there are results, remove them
    $('#1-recipes-list').empty();
    //iterate through recipes array and put the appropriate strings in the
    //appropriate places
    for (let i = 0; i < responseJson.hits.length; i++) {
        $('#1-recipes-list').append(`<li class="i-recipe-group">
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
    $('.1-recipes-found').html(`${responseJson.hits.length} recipes found!`)
    $('#1-recipes').removeClass('hidden');
}

//Taking the input values, create the API url, fetch that url, then format
//the response in JSON
function getRecipes(defIngr, ingrNum) {
    console.log('getRecipes ran')
    const params = {
        app_id: appId,
        app_key: appKey,
        q: defIngr,
        ingr: ingrNum,
    }

    const queryString = formatQueryParams(params);

    const url = baseURL + '?' + queryString;

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
    $('#1-recipes-list').empty();
    $('.1-recipes-found').html(`No recipes found. Try a different ingredient or adjust the number of ingredients you want to use.`)
    $('#1-recipes').removeClass('hidden');
}


//-----BUTTON FUNCTIONS-----

//When "Find a recipe!" button is clicked, take input values and feed them to API
function watchFindARecipe() {
    $('#step-one').on("submit", "#1-form", event => {
        event.preventDefault();
        console.log('watchIndexForm ran');
        const defIngr = $('#i-def-ingr').val();
        const ingrNum = $('#i-ingr-num').val();
        getRecipes(defIngr, ingrNum);
        })
}

//When the "Let's make it" button is clicked, replace parameters box with recipe
//information, as stored in holdRecipeHTML function, and adjust Step Three info
function watchLetsMakeIt() {
    $('#1-recipes').on('submit', event => {
        event.preventDefault();
        console.log('watchLetsMakeIt ran');
        $(".1-recipe-results").removeClass("hidden");
        $(".1-recipe-results").empty();
        $(".parameters").addClass("hidden");
        let title = $(event.target).closest(".i-lets-make-it").find('input[name="title"]').val();
        let src = $(event.target).closest(".i-lets-make-it").find('input[name="src"]').val();
        let num = $(event.target).closest(".i-lets-make-it").find('input[name="num"]').val();
        let link = $(event.target).closest(".i-lets-make-it").find('input[name="link"]').val();
        let ol = $(event.target).closest(".recipe-item").find(".i-my-ingrs").html();
        console.log(ol);
        holdRecipeHTML(src, title, num, link, ol);
        $(".your-recipe").append(`<a href="${link}">${link}</a>`)
        $(".to-eat").empty();
        $(".to-eat").append(title);
        $(".to-use").empty();
        $(".to-use").append(`<a href="${link}">${link}</a>`);
        $(".to-have").empty();
        $(".to-have").append(ol);
        //whenever this button is clicked, send us to top of page
        location = "#";
    })
}


//when clicked, replaces single recipe with all recipes called from watchFindARecipe
function watchSeeAll() {
    $(".1-recipe-results").on("submit", ".see-all-again", event => {
        event.preventDefault();
        $('#1-recipes').toggleClass("hidden");
        $(".1-recipe-results").toggleClass("hidden");
    })
}

//when clicked, toggles box where users can input ingredient and number of ingredients
function watchSetNewParams() {
    $(".1-recipe-results").on("submit", ".set-new-params", event => {
        event.preventDefault();
        $(".parameters").toggleClass("hidden");
    })
}

//uses Submit on Step 2 to populate details on Step Three
function handleDetailsSubmit() {
    $(".event-details").on("submit", "#details", event => {
        event.preventDefault();
        let date = $("#details-date").val();
        let time = $("#details-time").val();
        let platform = $("input:checked").val();
        if ($("input[id=other]").is(":checked")) {
            platform = $(".other").val();
        }
        $(".event-details").empty();
        $(".event-details").append(holdSetDetailsHTML(date, time, platform));
        $(".3-time").empty();
        $(".3-time").append(time);
        $(".3-date").empty();
        $(".3-date").append(date);
        $(".to-meet").empty();
        $(".to-meet").append(platform);
    })
}

//brings back details form if it has already been submitted
function handleNewDetailsSubmit() {
    $(".event-details").on("submit", "#new-details", event => {
        event.preventDefault();
        $(".event-details").empty();
        renderDetailsForm();
    })}

function onPageLoad() {
    renderStepOne();
    watchFindARecipe();
    watchLetsMakeIt();
    watchSeeAll();
    watchSetNewParams();
    renderDetailsForm();
    handleDetailsSubmit();
    handleNewDetailsSubmit();
}

//When the page loads, run the above functions
$(onPageLoad)




