import app from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config";

class Fireabase {
	constructor() {
		if (!app.apps.length) {
			app.initializeApp(firebaseConfig);
		}
		this.auth = app.auth();
	}

	//registra un usuario

	async registrar(nombre, email, password) {
		const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(
			email,
			password
		);

		return await nuevoUsuario.user.updateProfile({
			displayName: nombre,
		});
	}
}

const fireabase = new Fireabase();
export default fireabase;
