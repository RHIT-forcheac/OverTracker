var rhit = rhit || {};

import {
	getHeroNamesAndImages,
} from "./apiFunctions.js"

rhit.getHeroData = async function(){
	const heroesJson = await getHeroNamesAndImages();
    return heroesJson;
}

rhit.sortHeroDataByRole = function(heroJson) {
    const tankHeroes = [];
    const dpsHeroes = [];
    const supportHeroes = [];
    for (let i = 0; i < heroJson.length; i++){
        if (heroJson[i].role == 'tank'){
            tankHeroes.push(heroJson[i]);
        }
        else if (heroJson[i].role == 'support'){
            supportHeroes.push(heroJson[i]);
        }
        else {
            dpsHeroes.push(heroJson[i]);
        }
    }
    const heroes = [tankHeroes, dpsHeroes, supportHeroes];
    return heroes;
}

rhit.createHeroCard = function(currentHero) {
    const newCol = document.createElement("div");
    newCol.className = "col";

    const newButton = document.createElement("button")
    newButton.type = "button";

    newButton.className = "cardButton";

    newButton.onclick = (event) => {
        console.log("Hero Button Clicked");
        console.log(`Navigating to ../heroPage.html?hero=${currentHero.name}`);
        //window.location.href = `../heroPage.html?hero=${currentHero.name}`;
    };

    const newCard = document.createElement("div");
    newCard.className = "card";
    const newHeroPortrait = document.createElement("img");
    newHeroPortrait.src = currentHero.portrait;
    newHeroPortrait.alt = currentHero.name + "Image"
    const newNameDiv = document.createElement("div");
    const newHeroName = document.createElement("h2");
    newHeroName.id = currentHero.name + "Title";
    newHeroName.className = "card-title heroCardTitle";
    newHeroName.innerText = currentHero.name;

    newNameDiv.appendChild(newHeroName);
    newCard.appendChild(newHeroPortrait);
    newCard.appendChild(newNameDiv);
    newButton.appendChild(newCard)
    newCol.appendChild(newButton);
    return newCol;
}

rhit.addHeroesToSection = function(roleSection, heroSectionJson) {
    let countInRows = 0;
    if (roleSection == "dps"){
        countInRows = 5;
    }
    else {
        countInRows = 3;
    }
    let numOfRows = Math.ceil(heroSectionJson.length/countInRows);
    const currentSection = document.getElementById(roleSection + "Col");
    for (let j = 0; j < numOfRows; j++){
        const newRow = document.createElement("div");
        newRow.className = "row";
        for (let i = 0; i < countInRows; i ++){
            if (heroSectionJson[i]){
                const newHeroCol = rhit.createHeroCard(heroSectionJson[i]);
                newRow.appendChild(newHeroCol);
            }
        }
        currentSection.appendChild(newRow);
        heroSectionJson.splice(0, countInRows);
    }
}

rhit.populateHeroGallery = async function() {
    const heroJson = await rhit.getHeroData();
    console.log(heroJson);
    const heroesByRole = rhit.sortHeroDataByRole(heroJson);
    console.log(heroesByRole);
    rhit.addHeroesToSection("tank", heroesByRole[0]);
    rhit.addHeroesToSection("dps", heroesByRole[1]);
    rhit.addHeroesToSection("support", heroesByRole[2]);
}

export function initializeGalleryPage() {
    rhit.populateHeroGallery();
}