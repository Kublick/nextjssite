import app from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config";
import "firebase/firestore";
import "firebase/storage";

class Fireabase {
	constructor() {
		if (!app.apps.length) {
			app.initializeApp(firebaseConfig);
		}
		this.auth = app.auth();
		this.db = app.firestore();
		this.storage = app.storage();
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

	//inicia sesion del usuario

	async login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password);
	}

	//cierra sesion del usuario

	async cerrarSesion() {
		await this.auth.signOut();
	}
}

const fireabase = new Fireabase();
export default fireabase;
