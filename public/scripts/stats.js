var rhit = rhit || {};

import {
    getHeroStats,
    getHeroNameAndImage,
} from "./apiFunctions.js"

const chart = window.chart;

const urlParams = new URLSearchParams(window.location.search);
rhit.currentHero = urlParams.get("currentHero");

rhit.setHeroInfo = async function(heroName){
    const heroDataJson = await getHeroNameAndImage(rhit.currentHero);
    //console.log(heroDataJson.portrait);
    document.querySelector("#hero-type").innerHTML = heroDataJson.role;
    document.querySelector("#cardPhoto").src = heroDataJson.portrait;
    document.querySelector("#hero-name").innerHTML = heroDataJson.name;
    //console.log(heroDataJson);
}

// rhit.createHeroStatsChart() = async function() {
//     document.querySelector("#killsStat").innerHTML += 
// }

rhit.setHeroStats = async function(heroStatsJson) {
    console.log(heroStatsJson);
    console.log(heroStatsJson[3].stats[1].value);
    document.querySelector("#assistsStat").innerHTML += heroStatsJson[5].stats[4].value;
    document.querySelector("#deathsStat").innerHTML += heroStatsJson[4].stats[0].value;
    let gamesPlayed = heroStatsJson[3].stats[1].value
    let gamesLost = heroStatsJson[3].stats[2].value
    let gamesWon = gamesPlayed - gamesLost;
    const ctx = document.getElementById('#wlChart');
    new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Win', 'Lose'],
          datasets: [{
            data: [gamesWon, gamesLost],
            backgroundColor: ['#2f4b7c', '#f95d6a']
          }]
        },
        options: {
          plugins: {
            legend: {
              position: 'bottom',
              title: {
                display: true,
              },
              labels: {
                color: '#FFFFFF'
              }
            },
            responsive: true
          }
        }
      });
    document.querySelector("#wlChart").innerHTML = wlChart;
}

rhit.populateHeroPage = async function() {
    //rhit.currentHero = rhit.currentHero.toLowerCase().replace("%20", "-").replace(".", "");
    rhit.setHeroInfo(rhit.currentHero);
    const heroStatsJson = await getHeroStats("Onslaught-12333", rhit.currentHero, "competitive");
    rhit.setHeroStats(heroStatsJson[rhit.currentHero]);
    // console.log("Hero stats");
    // console.log(heroStatsJson);
}

export function initializeStatPage() {
    rhit.populateHeroPage();
}