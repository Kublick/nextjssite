export default function validarCrearCuenta(valores) {
	let errores = {};

	//validar nombre del usuario

	if (!valores.nombre) {
		errores.nombre = "el nombre es obligatorio";
	}

	if (!valores.email) {
		errores.email = "El email es obligatorio";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
		errores.email = "Email no valido";
	}

	if (!valores.password) {
		errores.password = "El password es obligatorio";
	} else if (valores.password.length < 6) {
		errores.password = "El email debe tener minimo 6 caraceres";
	}

	return errores;
}
