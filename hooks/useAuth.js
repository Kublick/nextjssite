import React, { useState, useEffect } from "react";
import firebase from "../firebase";

function useAuth() {
	const [usuarioAuth, guardarUsuarioAuth] = useState(null);

	useEffect(() => {
		const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
			if (user) {
				guardarUsuarioAuth(user);
			} else {
				guardarUsuarioAuth(null);
			}
		});
	}, []);

	return usuarioAuth;
}

export default useAuth;
