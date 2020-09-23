const appId = "b4955748";
const appKey = "465177a917ad855574dcacd25dca179a";
const baseURL = "https://api.edamam.com/search";

let recipeHTML = `<li class="i-recipe-group">
    <div class="recipe-item">
        <h3>Recipe title</h3>
        <span>time minutes / number ingredients / cuisine</span>
        <p>Description</p>
    </div>
    <div class="square"></div>
</li>`;

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
        <li>INPUT > SUB</li>
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

//Use BonAPI to get recipes based on parameters
function getRecipes() {
    const params = {
        app_id: appId,
        app_key: appKey,
        q: "chicken",
        time: 60,
        ingr: 10,
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
        .then(responseJson => console.log(responseJson));
}



//When form on index page is submitted, do this
function watchIndexForm() {
}



//I want to create a list of substitutions

//I want to dynamically alter the recipe text with my substitutions

$(getRecipes)