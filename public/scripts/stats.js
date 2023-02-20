var rhit = rhit || {};

import {
  getHeroStats,
  getHeroNameAndImage,
} from "./apiFunctions.js"

const urlParams = new URLSearchParams(window.location.search);
rhit.currentHero = urlParams.get("currentHero");
rhit.playerTag = null;

rhit.setHeroInfo = async function (heroName) {
  const heroDataJson = await getHeroNameAndImage(rhit.currentHero);
  document.querySelector("#hero-type").innerHTML = heroDataJson.role;
  document.querySelector("#cardPhoto").src = heroDataJson.portrait;
  document.querySelector("#hero-name").innerHTML = heroDataJson.name;
}

rhit.setHeroStats = async function (heroStatsJson) {

  //General Hero Stats
  let heroGeneralStats; // = heroStatsJson[4].stats;
  if (heroStatsJson != null) {
    for (let i = 0; i < heroStatsJson.length; i++) {
      if (heroStatsJson[i].category == 'combat') {
        heroGeneralStats = heroStatsJson[i].stats;
      }
    }
  }

  let heroGeneralStatsList = document.querySelector("#basicStats");
  let heroGeneralTitle = document.createElement("li");
  heroGeneralTitle.className = "list-group-item active";
  heroGeneralTitle.appendChild(document.createTextNode(`General Stats`));
  heroGeneralStatsList.appendChild(heroGeneralTitle);
  if (heroGeneralStats != null) {
    for (let i = 0; i < heroGeneralStats.length; i++) {
      let statName = heroGeneralStats[i].label;
      let statValue = heroGeneralStats[i].value;
      let heroGenStat = document.createElement("li");
      heroGenStat.className = "list-group-item";
      heroGenStat.appendChild(document.createTextNode(`${statName}: ${statValue}`));
      heroGeneralStatsList.appendChild(heroGenStat);
    }
  }

  //Specific heroStats
  if (heroStatsJson != null) {
    const heroSpecificStats = heroStatsJson[0].stats;
    let heroSpecificStatsList = document.querySelector("#specificStatsList");
    let heroSpecTitle = document.createElement("li");
    heroSpecTitle.className = "list-group-item active";
    heroSpecTitle.appendChild(document.createTextNode(`Hero Specific Stats`));
    heroSpecificStatsList.appendChild(heroSpecTitle);
    for (let i = 0; i < heroSpecificStats.length; i++) {
      let statName = heroSpecificStats[i].label;
      let statValue = heroSpecificStats[i].value;
      let heroSpecStat = document.createElement("li");
      heroSpecStat.className = "list-group-item";
      heroSpecStat.appendChild(document.createTextNode(`${statName}: ${statValue}`));
      heroSpecificStatsList.appendChild(heroSpecStat);
    }
  }
}

rhit.populateHeroPage = async function () {
  rhit.setHeroInfo(rhit.currentHero);
  const heroStatsJson = await getHeroStats(rhit.playerTag, rhit.currentHero, "competitive");
  if (heroStatsJson == null) {
    console.log("data is null?");
    document.querySelector("#heroNullAlert").style.display = "inline-block";
  } else {
    console.log("set display to none");
    document.querySelector("#heroNullAlert").style.display = "none";
    console.log(document.querySelector("#heroNullAlert").display);
    rhit.setHeroStats(heroStatsJson[rhit.currentHero]);
  }
}

export function initializeStatPage(playerTag) {
  rhit.playerTag = playerTag;
  console.log(playerTag);
  rhit.populateHeroPage();
}