export async function getHeroNamesAndImages(username, password) {
    const response = await fetch(`https://overfast-api.tekrop.fr/heroes?=`);
    const myJson = await response.json();
    return myJson;
}

export async function getHeroStats(battleTag, heroName, gamemode) {
    const response = await fetch(`https://overfast-api.tekrop.fr/players/${battleTag}/stats?gamemode=${gamemode}&hero=${heroName}`);
    const myJson = await response.json();
    return myJson;
}

export async function getHeroNameAndImage(heroName) {
    const response = await fetch(`https://overfast-api.tekrop.fr/heroes/${heroName}`);
    const myJson = await response.json();
    return myJson;
}

export async function getPlayerSummary(playerName) {
    const response = await fetch(`https://overfast-api.tekrop.fr/players/${playerName}/summary`);
    const myJson = await response.json();
    return myJson;
}

export async function getPlayerStatsSummary(playerName) {
    const response = await fetch(`https://overfast-api.tekrop.fr/players/${playerName}/stats/summary`);
    const myJson = await response.json();
    return myJson;
}