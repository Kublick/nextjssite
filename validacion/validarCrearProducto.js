export default function validarCrearCuenta(valores) {
	let errores = {};

	//validar nombre del usuario

	if (!valores.nombre) {
		errores.nombre = "el nombre es obligatorio";
	}

	if (!valores.empresa) {
		errores.empresa = "el nombre de empresa es obligatorio";
	}

	if (!valores.url) {
		errores.url = "La URL del producto es obligatorio";
	} else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
		errores.url = "La URL no es valida";
	}

	// validar descripcion
	if (!valores.descripcion)
		errores.descripcion = "Agrega una descripciom de tu producto";

	return errores;
}
