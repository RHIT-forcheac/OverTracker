export async function getHeroNamesAndImages(username, password) {
    const response = await fetch(`https://overfast-api.tekrop.fr/heroes?=`);
    const myJson = await response.json();
    console.log(myJson);
    return myJson;
}