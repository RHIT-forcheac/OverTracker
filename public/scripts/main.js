var rhit = rhit || {};

import {
	initializeGalleryPage,
} from "./heroGallery.js"

// rhit.getHeroData = async function(){
// 	const heroesJson = await getHeroNamesAndImages();
// }

rhit.main = function () {
	console.log("Ready");
	initializeGalleryPage();
	//this.getHeroData();
};
//console.log("js working");
rhit.main();
