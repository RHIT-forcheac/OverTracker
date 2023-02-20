var rhit = rhit || {};

import {
    getPlayerSummary,
    getPlayerStatsSummary,
} from "./apiFunctions.js"

const urlParams = new URLSearchParams(window.location.search);
rhit.currentPlayer = "Onslaught-12333";

rhit.setPlayerInfo = async function(playerSumJson){
    document.querySelector("#playerName").innerHTML = rhit.currentPlayer;
    document.querySelector("#playerPortrait").src = playerSumJson.avatar;
    document.querySelector("#playerEndorsement").src = playerSumJson.endorsement.frame;
    document.querySelector("#playerTitle").innerHTML = playerSumJson.title;

    // document.querySelector("#tankRank").innerHTML = playerSumJson.competitive.pc.tank.division;
}

rhit.setTimePlayedAndWinPerc = async function(playerStatsSumJson) {
  let tankHrs = Math.floor(playerStatsSumJson.roles.tank.time_played/360);
  let dpsHrs = Math.floor(playerStatsSumJson.roles.damage.time_played/360);
  let suppHrs = Math.floor(playerStatsSumJson.roles.support.time_played/360);


  document.querySelector("#timePlayedTotal").innerHTML = `${Math.floor(playerStatsSumJson.general.time_played/360)} HRS`;
  document.querySelector("#timePlayedTank").innerHTML = `${'0000'.substr(String(tankHrs).length ) + tankHrs} HRS`;
  document.querySelector("#timePlayedDPS").innerHTML = `${'0000'.substr(String(dpsHrs).length ) + dpsHrs} HRS`;
  document.querySelector("#timePlayedSupp").innerHTML = `${'0000'.substr(String(suppHrs).length ) + suppHrs} HRS`;

  document.querySelector("#tankPerc").innerHTML = `${Math.floor(playerStatsSumJson.roles.tank.winrate)}%`;
  document.querySelector("#dpsPerc").innerHTML = `${Math.floor(playerStatsSumJson.roles.damage.winrate)}%`;
  document.querySelector("#suppPerc").innerHTML = `${Math.floor(playerStatsSumJson.roles.support.winrate)}%`;
}

// rhit.setPlayerRoleStats = async function () {

// }

rhit.setHeroStats = async function(heroStatsJson) {

    // //General Hero Stats
    // let heroGeneralStats; // = heroStatsJson[4].stats;
    // for (let i = 0; i < heroStatsJson.length; i++) {
    //   if (heroStatsJson[i].category == 'combat') {
    //     heroGeneralStats = heroStatsJson[i].stats;
    //   }
    // }
    // let heroGeneralStatsList = document.querySelector("#basicStats");
    // let heroGeneralTitle = document.createElement("li");
    // heroGeneralTitle.className = "list-group-item active";
    // heroGeneralTitle.appendChild(document.createTextNode(`General Stats`));
    // heroGeneralStatsList.appendChild(heroGeneralTitle);
    // for (let i = 0; i < heroGeneralStats.length; i++) {
    //   let statName = heroGeneralStats[i].label;
    //   let statValue = heroGeneralStats[i].value;
    //   let heroGenStat = document.createElement("li");
    //   heroGenStat.className = "list-group-item";
    //   heroGenStat.appendChild(document.createTextNode(`${statName}: ${statValue}`));
    //   heroGeneralStatsList.appendChild(heroGenStat);
    // }

    // //Specific heroStats
    // const heroSpecificStats = heroStatsJson[0].stats;
    // let heroSpecificStatsList = document.querySelector("#specificStatsList");
    // let heroSpecTitle = document.createElement("li");
    // heroSpecTitle.className = "list-group-item active";
    // heroSpecTitle.appendChild(document.createTextNode(`Hero Specific Stats`));
    // heroSpecificStatsList.appendChild(heroSpecTitle);
    // for (let i = 0; i < heroSpecificStats.length; i++) {
    //   let statName = heroSpecificStats[i].label;
    //   let statValue = heroSpecificStats[i].value;
    //   let heroSpecStat = document.createElement("li");
    //   heroSpecStat.className = "list-group-item";
    //   heroSpecStat.appendChild(document.createTextNode(`${statName}: ${statValue}`));
    //   heroSpecificStatsList.appendChild(heroSpecStat);
    // }
}

rhit.populateHomePage = async function() {
  //TODO: add handler for null meaning hero has not been played
  const playerSumJson = await getPlayerSummary(rhit.currentPlayer);
  rhit.setPlayerInfo(playerSumJson);
  const playerStatsSumJson = await getPlayerStatsSummary(rhit.currentPlayer);
  rhit.setTimePlayedAndWinPerc(playerStatsSumJson);
    //rhit.setHeroStats(heroStatsJson[rhit.currentHero]);
}

export function initializeHomePage() {
  rhit.populateHomePage();
}