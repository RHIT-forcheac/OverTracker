var rhit = rhit || {};
rhit.fbAuthManager = null;
rhit.fbUserManager = null;
rhit.FB_COLLECTION_USERS = "Users";
rhit.FB_KEY_BATTLETAG = "battleTag";
rhit.FB_KEY_NAME = "name";
rhit.FB_KEY_PHOTO_URL = "photoUrl";

// import {
// 	initializeGalleryPage,
// } from "./heroGallery.js"
// const {initializeGalleryPage} = require('./heroGallery.js');

// rhit.getHeroData = async function(){
// 	const heroesJson = await getHeroNamesAndImages();
// }

rhit.SideNavController = class {
	constructor() {
		const menuProfilePageItem = document.querySelector("#menuGoToProfilePage");
		if (menuProfilePageItem) {
			menuProfilePageItem.addEventListener("click", (event) => {
				window.location.href = "/profile.html";
			});
		}
		const menuSignOutItem = document.querySelector("#menuSignOut");
		if (menuSignOutItem) {
			menuSignOutItem.addEventListener("click", (event) => {
				rhit.fbAuthManager.signOut();
			});
		}
	}
};

rhit.TagPageController = class {
	constructor() {
		console.log("TagController Created!");
		document.querySelector("#submitTag").onclick = (event) => {
			console.log("button working!");
			const tag = document.querySelector("#inputTag").value;
			rhit.fbUserManager.updateTag(tag).then(() => {
				window.location.href = "/homeScreen.html";
			});
		}
		rhit.fbUserManager.beginListening(rhit.fbAuthManager.uid, this.updateView.bind(this));
	}

	updateView() {
		if(rhit.fbUserManager.tag) {
			document.querySelector("#inputTag").value = rhit.fbUserManager.tag;
		}
	}
};

rhit.FbAuthManager = class {
	constructor() {
		this._user = null;
		this._name = "";
		this._photoUrl = "";
	}

	beginListening(changeListener) {
		firebase.auth().onAuthStateChanged((user) => {
			this._user = user;
			changeListener();
		});
	}

	signIn() {
		console.log("Sign in");
		Rosefire.signIn("e1e20514-f4a6-453b-824d-2d0e022d3776", (err, rfUser) => {
			if (err) {
				console.log("Rosefire error!", err);
				return;
			}
			console.log("Rosefire success!", rfUser);
			this._name = rfUser.name;
			firebase.auth().signInWithCustomToken(rfUser.token).catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				if (errorCode == 'auth/invalid-custom-token') {
					alert('The token you provided is not valid');
				} else {
					console.error("Custom auth error", errorCode, errorMessage);
				}
			});
		});
	}

	signOut() {
		firebase.auth().signOut().catch((error) => {
			console.log("Error");
		});
	}

	startFirebaseUI = function () {

		var uiConfig = {
			signInSuccessUrl: '/',
			signInOptions: [
				firebase.auth.GoogleAuthProvider.PROVIDER_ID,
				firebase.auth.EmailAuthProvider.PROVIDER_ID,
				firebase.auth.PhoneAuthProvider.PROVIDER_ID,
				firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
			],
		};

		const ui = new firebaseui.auth.AuthUI(firebase.auth());
		ui.start('#firebaseui-auth-container', uiConfig);
	}

	get isSignedIn() {
		return !!this._user;
	}

	get uid() {
		return this._user.uid;
	}

	get name() {
		return this._name || this._user.displayName;
	}

	get photoUrl() {
		return this._photoUrl || this._user.photoURL;
	}
};

rhit.FbUserManager = class {
	constructor() {
		this._collectoinRef = firebase.firestore().collection(rhit.FB_COLLECTION_USERS);
		this._document = null;
	}

	addNewUserMaybe(uid, name, photoUrl) {
		const userRef = this._collectoinRef.doc(uid);
		return userRef.get().then((doc) => {
			if (doc.exists) {
				console.log("User Already Exist: ", doc.data());
				return false;
			} else {
				console.log("Create this user!");
				return userRef.set({
					[rhit.FB_KEY_NAME]: name,
					[rhit.FB_KEY_PHOTO_URL]: photoUrl,
				}).then(function () {
					console.log("Successfully Written!");
					return true;
				}).catch(function (error) {
					console.error("Error writing  doc:", error);
				});
			}
		}).catch(function (error) {
			console.log("Error getting document: ", error);
		});
	}

	beginListening(uid, changeListener) {
		const userRef = this._collectoinRef.doc(uid);
		this._unsubscribe = userRef.onSnapshot((doc) => {
			if (doc.exists) {
				console.log("Document data:", doc.data());
				this._document = doc;
				changeListener();
			} else {
				console.log("No User!");
			}
		});
	}

	stopListening() {
		this._unsubscribe();
	}

	get isListening() {
		return !!this._unsubscribe;
	}

	updatePhotoUrl(photoUrl) {
		const userRef = this._collectoinRef.doc(rhit.fbAuthManager.uid);
		userRef.update({
			[rhit.FB_KEY_PHOTO_URL]: photoUrl,
		}).then(() => {
			console.log("Photo successfully updated!");
		}).catch(function (error) {
			console.error("Error updating document: ", error);
		});
	}

	updateName(name) {
		const userRef = this._collectoinRef.doc(rhit.fbAuthManager.uid);
		return userRef.update({
			[rhit.FB_KEY_NAME]: name,
		}).then(() => {
			console.log("Name successfully updated!");
		}).catch(function (error) {
			console.error("Error updating document: ", error);
		});
	}

	updateTag(tag) {
		const userRef = this._collectoinRef.doc(rhit.fbAuthManager.uid);
		return userRef.update({
			[rhit.FB_KEY_BATTLETAG]: tag,
		}).then(() => {
			console.log("BattleTag successfully updated!");
		}).catch(function (error) {
			console.error("Error updating document: ", error);
		});
	}

	get name() { return this._document.get(rhit.FB_KEY_NAME); }

	get tag() {return this._document.get(rhit.FB_KEY_BATTLETAG); }

	get photoUrl() { return this._document.get(rhit.FB_KEY_PHOTO_URL); }
};

rhit.LoginPageController = class {
	constructor() {
		document.querySelector("#rosefireButton").onclick = (event) => {
			rhit.fbAuthManager.signIn();
		};
		rhit.fbAuthManager.startFirebaseUI();
	}
};

rhit.checkForRedirects = function () {
	if (document.querySelector("#loginPage") && rhit.fbAuthManager.isSignedIn) {
		window.location.href = "/tag.html";
	}
	if (!document.querySelector("#loginPage") && !rhit.fbAuthManager.isSignedIn) {
		window.location.href = "/";
	}
	// if (document.querySelector("#tagPage") && rhit.TagManager.isSetUp) {
	// 	window.location.href = "/homeScreen.html";
	// }
	// if (document.querySelector("#tagPage") && !rhit.TagManager.isSetUp) {
	// 	window.location.href = "/";
	// }
};

rhit.initializePage = function () {
	if (document.querySelector("#loginPage")) {
		console.log("You are on the login page.");
		new rhit.LoginPageController();
	}
	else if (document.querySelector("#mainPage")) {
		console.log("You are on the gallery page.");
		initializeGalleryPage();
	}
	else if (document.querySelector("#tagPage")) {
		console.log("You are on the battleTag page.");
		new rhit.TagPageController();
	}
};

rhit.createUserObjectIfNeeded = function () {
	return new Promise((resolve, reject) => {
		//check if a User might be new
		if (!rhit.fbAuthManager.isSignedIn) {
			resolve(false);
			return;
		}
		if (!document.querySelector("#loginPage")) {
			resolve(false);
			return;
		}
		//Call addNewUserMaybe
		rhit.fbUserManager.addNewUserMaybe(
			rhit.fbAuthManager.uid,
			rhit.fbAuthManager.name,
			rhit.fbAuthManager.photoUrl,
		).then((isUserNew) => {
			resolve(isUserNew);
		});
	});
};

rhit.main = function () {
	console.log("Ready");
	rhit.fbAuthManager = new rhit.FbAuthManager();
	rhit.fbUserManager = new rhit.FbUserManager();
	rhit.fbAuthManager.beginListening(() => {
		console.log("Is signed In: ", rhit.fbAuthManager.isSignedIn);
		rhit.createUserObjectIfNeeded().then((isUserNew) => {
			if (isUserNew) {
				window.location.href = "/tag.html";
				return;
			}
			rhit.checkForRedirects();
			new rhit.SideNavController();
			rhit.initializePage();
		});
	});

	//this.getHeroData();
};
//console.log("js working");
rhit.main();
