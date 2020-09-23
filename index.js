let recipeHTML = `<li class="recipe-group">
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