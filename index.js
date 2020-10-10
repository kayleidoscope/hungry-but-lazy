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
        <input type="text" id="i-def-ingr" name="def-ingredient" required value="cheese"<label for="i-def-ingr"> is an ingredient we all have.</label><br>
        <input type="number" id="i-ingr-num" name="ingredients" required min="1" value="3"><label for="i-ingr-num"> is the max number of ingredients we want to use.</label><br>
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
    <label for="time-zone">Time zone: (optional) </label><select name="time-zones" id="time-zone">
        <option timeZoneId="0" gmtAdjustment="N/A" value="--"></option>
        <option timeZoneId="1" gmtAdjustment="GMT-12:00" useDaylightTime="0" value="-12">(GMT-12:00) International Date Line West</option>
        <option timeZoneId="2" gmtAdjustment="GMT-11:00" useDaylightTime="0" value="-11">(GMT-11:00) Midway Island, Samoa</option>
        <option timeZoneId="3" gmtAdjustment="GMT-10:00" useDaylightTime="0" value="-10">(GMT-10:00) Hawaii</option>
        <option timeZoneId="4" gmtAdjustment="GMT-09:00" useDaylightTime="1" value="-9">(GMT-09:00) Alaska</option>
        <option timeZoneId="5" gmtAdjustment="GMT-08:00" useDaylightTime="1" value="-8">(GMT-08:00) Pacific Time (US & Canada)</option>
        <option timeZoneId="6" gmtAdjustment="GMT-08:00" useDaylightTime="1" value="-8">(GMT-08:00) Tijuana, Baja California</option>
        <option timeZoneId="7" gmtAdjustment="GMT-07:00" useDaylightTime="0" value="-7">(GMT-07:00) Arizona</option>
        <option timeZoneId="8" gmtAdjustment="GMT-07:00" useDaylightTime="1" value="-7">(GMT-07:00) Chihuahua, La Paz, Mazatlan</option>
        <option timeZoneId="9" gmtAdjustment="GMT-07:00" useDaylightTime="1" value="-7">(GMT-07:00) Mountain Time (US & Canada)</option>
        <option timeZoneId="10" gmtAdjustment="GMT-06:00" useDaylightTime="0" value="-6">(GMT-06:00) Central America</option>
        <option timeZoneId="11" gmtAdjustment="GMT-06:00" useDaylightTime="1" value="-6">(GMT-06:00) Central Time (US & Canada)</option>
        <option timeZoneId="12" gmtAdjustment="GMT-06:00" useDaylightTime="1" value="-6">(GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
        <option timeZoneId="13" gmtAdjustment="GMT-06:00" useDaylightTime="0" value="-6">(GMT-06:00) Saskatchewan</option>
        <option timeZoneId="14" gmtAdjustment="GMT-05:00" useDaylightTime="0" value="-5">(GMT-05:00) Bogota, Lima, Quito, Rio Branco</option>
        <option timeZoneId="15" gmtAdjustment="GMT-05:00" useDaylightTime="1" value="-5">(GMT-05:00) Eastern Time (US & Canada)</option>
        <option timeZoneId="16" gmtAdjustment="GMT-05:00" useDaylightTime="1" value="-5">(GMT-05:00) Indiana (East)</option>
        <option timeZoneId="17" gmtAdjustment="GMT-04:00" useDaylightTime="1" value="-4">(GMT-04:00) Atlantic Time (Canada)</option>
        <option timeZoneId="18" gmtAdjustment="GMT-04:00" useDaylightTime="0" value="-4">(GMT-04:00) Caracas, La Paz</option>
        <option timeZoneId="19" gmtAdjustment="GMT-04:00" useDaylightTime="0" value="-4">(GMT-04:00) Manaus</option>
        <option timeZoneId="20" gmtAdjustment="GMT-04:00" useDaylightTime="1" value="-4">(GMT-04:00) Santiago</option>
        <option timeZoneId="21" gmtAdjustment="GMT-03:30" useDaylightTime="1" value="-3.5">(GMT-03:30) Newfoundland</option>
        <option timeZoneId="22" gmtAdjustment="GMT-03:00" useDaylightTime="1" value="-3">(GMT-03:00) Brasilia</option>
        <option timeZoneId="23" gmtAdjustment="GMT-03:00" useDaylightTime="0" value="-3">(GMT-03:00) Buenos Aires, Georgetown</option>
        <option timeZoneId="24" gmtAdjustment="GMT-03:00" useDaylightTime="1" value="-3">(GMT-03:00) Greenland</option>
        <option timeZoneId="25" gmtAdjustment="GMT-03:00" useDaylightTime="1" value="-3">(GMT-03:00) Montevideo</option>
        <option timeZoneId="26" gmtAdjustment="GMT-02:00" useDaylightTime="1" value="-2">(GMT-02:00) Mid-Atlantic</option>
        <option timeZoneId="27" gmtAdjustment="GMT-01:00" useDaylightTime="0" value="-1">(GMT-01:00) Cape Verde Is.</option>
        <option timeZoneId="28" gmtAdjustment="GMT-01:00" useDaylightTime="1" value="-1">(GMT-01:00) Azores</option>
        <option timeZoneId="29" gmtAdjustment="GMT+00:00" useDaylightTime="0" value="0">(GMT+00:00) Casablanca, Monrovia, Reykjavik</option>
        <option timeZoneId="30" gmtAdjustment="GMT+00:00" useDaylightTime="1" value="0">(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</option>
        <option timeZoneId="31" gmtAdjustment="GMT+01:00" useDaylightTime="1" value="1">(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
        <option timeZoneId="32" gmtAdjustment="GMT+01:00" useDaylightTime="1" value="1">(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
        <option timeZoneId="33" gmtAdjustment="GMT+01:00" useDaylightTime="1" value="1">(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
        <option timeZoneId="34" gmtAdjustment="GMT+01:00" useDaylightTime="1" value="1">(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
        <option timeZoneId="35" gmtAdjustment="GMT+01:00" useDaylightTime="1" value="1">(GMT+01:00) West Central Africa</option>
        <option timeZoneId="36" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Amman</option>
        <option timeZoneId="37" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Athens, Bucharest, Istanbul</option>
        <option timeZoneId="38" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Beirut</option>
        <option timeZoneId="39" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Cairo</option>
        <option timeZoneId="40" gmtAdjustment="GMT+02:00" useDaylightTime="0" value="2">(GMT+02:00) Harare, Pretoria</option>
        <option timeZoneId="41" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
        <option timeZoneId="42" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Jerusalem</option>
        <option timeZoneId="43" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Minsk</option>
        <option timeZoneId="44" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Windhoek</option>
        <option timeZoneId="45" gmtAdjustment="GMT+03:00" useDaylightTime="0" value="3">(GMT+03:00) Kuwait, Riyadh, Baghdad</option>
        <option timeZoneId="46" gmtAdjustment="GMT+03:00" useDaylightTime="1" value="3">(GMT+03:00) Moscow, St. Petersburg, Volgograd</option>
        <option timeZoneId="47" gmtAdjustment="GMT+03:00" useDaylightTime="0" value="3">(GMT+03:00) Nairobi</option>
        <option timeZoneId="48" gmtAdjustment="GMT+03:00" useDaylightTime="0" value="3">(GMT+03:00) Tbilisi</option>
        <option timeZoneId="49" gmtAdjustment="GMT+03:30" useDaylightTime="1" value="3.5">(GMT+03:30) Tehran</option>
        <option timeZoneId="50" gmtAdjustment="GMT+04:00" useDaylightTime="0" value="4">(GMT+04:00) Abu Dhabi, Muscat</option>
        <option timeZoneId="51" gmtAdjustment="GMT+04:00" useDaylightTime="1" value="4">(GMT+04:00) Baku</option>
        <option timeZoneId="52" gmtAdjustment="GMT+04:00" useDaylightTime="1" value="4">(GMT+04:00) Yerevan</option>
        <option timeZoneId="53" gmtAdjustment="GMT+04:30" useDaylightTime="0" value="4.5">(GMT+04:30) Kabul</option>
        <option timeZoneId="54" gmtAdjustment="GMT+05:00" useDaylightTime="1" value="5">(GMT+05:00) Yekaterinburg</option>
        <option timeZoneId="55" gmtAdjustment="GMT+05:00" useDaylightTime="0" value="5">(GMT+05:00) Islamabad, Karachi, Tashkent</option>
        <option timeZoneId="56" gmtAdjustment="GMT+05:30" useDaylightTime="0" value="5.5">(GMT+05:30) Sri Jayawardenapura</option>
        <option timeZoneId="57" gmtAdjustment="GMT+05:30" useDaylightTime="0" value="5.5">(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
        <option timeZoneId="58" gmtAdjustment="GMT+05:45" useDaylightTime="0" value="5.75">(GMT+05:45) Kathmandu</option>
        <option timeZoneId="59" gmtAdjustment="GMT+06:00" useDaylightTime="1" value="6">(GMT+06:00) Almaty, Novosibirsk</option>
        <option timeZoneId="60" gmtAdjustment="GMT+06:00" useDaylightTime="0" value="6">(GMT+06:00) Astana, Dhaka</option>
        <option timeZoneId="61" gmtAdjustment="GMT+06:30" useDaylightTime="0" value="6.5">(GMT+06:30) Yangon (Rangoon)</option>
        <option timeZoneId="62" gmtAdjustment="GMT+07:00" useDaylightTime="0" value="7">(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
        <option timeZoneId="63" gmtAdjustment="GMT+07:00" useDaylightTime="1" value="7">(GMT+07:00) Krasnoyarsk</option>
        <option timeZoneId="64" gmtAdjustment="GMT+08:00" useDaylightTime="0" value="8">(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
        <option timeZoneId="65" gmtAdjustment="GMT+08:00" useDaylightTime="0" value="8">(GMT+08:00) Kuala Lumpur, Singapore</option>
        <option timeZoneId="66" gmtAdjustment="GMT+08:00" useDaylightTime="0" value="8">(GMT+08:00) Irkutsk, Ulaan Bataar</option>
        <option timeZoneId="67" gmtAdjustment="GMT+08:00" useDaylightTime="0" value="8">(GMT+08:00) Perth</option>
        <option timeZoneId="68" gmtAdjustment="GMT+08:00" useDaylightTime="0" value="8">(GMT+08:00) Taipei</option>
        <option timeZoneId="69" gmtAdjustment="GMT+09:00" useDaylightTime="0" value="9">(GMT+09:00) Osaka, Sapporo, Tokyo</option>
        <option timeZoneId="70" gmtAdjustment="GMT+09:00" useDaylightTime="0" value="9">(GMT+09:00) Seoul</option>
        <option timeZoneId="71" gmtAdjustment="GMT+09:00" useDaylightTime="1" value="9">(GMT+09:00) Yakutsk</option>
        <option timeZoneId="72" gmtAdjustment="GMT+09:30" useDaylightTime="0" value="9.5">(GMT+09:30) Adelaide</option>
        <option timeZoneId="73" gmtAdjustment="GMT+09:30" useDaylightTime="0" value="9.5">(GMT+09:30) Darwin</option>
        <option timeZoneId="74" gmtAdjustment="GMT+10:00" useDaylightTime="0" value="10">(GMT+10:00) Brisbane</option>
        <option timeZoneId="75" gmtAdjustment="GMT+10:00" useDaylightTime="1" value="10">(GMT+10:00) Canberra, Melbourne, Sydney</option>
        <option timeZoneId="76" gmtAdjustment="GMT+10:00" useDaylightTime="1" value="10">(GMT+10:00) Hobart</option>
        <option timeZoneId="77" gmtAdjustment="GMT+10:00" useDaylightTime="0" value="10">(GMT+10:00) Guam, Port Moresby</option>
        <option timeZoneId="78" gmtAdjustment="GMT+10:00" useDaylightTime="1" value="10">(GMT+10:00) Vladivostok</option>
        <option timeZoneId="79" gmtAdjustment="GMT+11:00" useDaylightTime="1" value="11">(GMT+11:00) Magadan, Solomon Is., New Caledonia</option>
        <option timeZoneId="80" gmtAdjustment="GMT+12:00" useDaylightTime="1" value="12">(GMT+12:00) Auckland, Wellington</option>
        <option timeZoneId="81" gmtAdjustment="GMT+12:00" useDaylightTime="0" value="12">(GMT+12:00) Fiji, Kamchatka, Marshall Is.</option>
        <option timeZoneId="82" gmtAdjustment="GMT+13:00" useDaylightTime="0" value="13">(GMT+13:00) Nuku'alofa</option>
    </select>
    <fieldset id="details-platform">
        <legend for="platform">Videochat platform: </legend>
        <input type="radio" name="platform" id="zoom" value="Zoom" required><label for="zoom">Zoom</label><br>
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
    return `<p class="party-sentence">Your party will be on ${date} at ${time} using ${platform}.</p>
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

//-----MISC. FUNCTIONS-----

function handleTimeZone(timeZone, timeZoneName) {
    if (timeZone === "--") {
        console.log("No time zone entered.")
        return;
    } else {
        console.log("Time zone entered.")
        return ` (time zone: ${timeZoneName})`;
    }
}

function formatTimeNicer(time) {
    const splitTime = time.split(':');
    const hour = splitTime[0];
    const min = splitTime[1];
    if (hour > 12) {
        console.log('1')
        return `${hour - 12}:${min} PM`;
    } else if (hour == 0) {
        console.log('5')
        return `12:${min} AM`
    } else if (hour == 12) {
        console.log('2')
        return `12:${min} PM`;
    } else if (hour < 12) {
        console.log('3')
        let parsedHour = parseInt(hour)
        return `${parsedHour}:${min} AM`;
    }
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
        $(".to-use").append(`<a href="${link}" target="_blank">${link}</a>`);
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
        let timeZone = $("#time-zone").val();
        let timeZoneName = $("#time-zone option:selected").text();
        if ($("input[id=other]").is(":checked")) {
            platform = $(".other").val();
        }
        $(".event-details").empty();
        $(".event-details").append(holdSetDetailsHTML(date, formatTimeNicer(time), platform));
        $(".3-time").empty();
        $(".3-time").append(formatTimeNicer(time));
        $(".3-date").empty();
        $(".3-date").append(date);
        $(".to-meet").empty();
        $(".to-meet").append(platform);
        $(".party-sentence").append(handleTimeZone(timeZone, timeZoneName));
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




