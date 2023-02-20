var rhit = rhit || {};

import {
    getPlayerSummary,
    getPlayerStatsSummary,
} from "./apiFunctions.js"

rhit.currentPlayer = "Onslaught-12333";

rhit.setPlayerInfo = async function(playerSumJson){
    document.querySelector("#playerName").innerHTML = rhit.currentPlayer;
    document.querySelector("#playerPortrait").src = playerSumJson.avatar;
    document.querySelector("#playerEndorsement").src = playerSumJson.endorsement.frame;
    document.querySelector("#playerTitle").innerHTML = playerSumJson.title;
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

rhit.populateHomePage = async function() {
  const playerSumJson = await getPlayerSummary(rhit.currentPlayer);
  rhit.setPlayerInfo(playerSumJson);
  const playerStatsSumJson = await getPlayerStatsSummary(rhit.currentPlayer);
  rhit.setTimePlayedAndWinPerc(playerStatsSumJson);
}

export function initializeHomePage() {
  rhit.populateHomePage();
}