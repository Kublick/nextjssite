import React, { useState, useEffect } from "react";

const useValidation = (stateInicial, validar, fn) => {
	const [valores, guardarValores] = useState(stateInicial);
	const [errores, guardarErrores] = useState({});
	const [submitForm, guardarSubmitForm] = useState(false);

	useEffect(() => {
		if (submitForm) {
			const noErrores = Object.keys(errores).length === 0;

			if (noErrores) {
				fn(); //funcion que se ejecuta en el componente
			}
			guardarSubmitForm(false);
		}
	}, []);

	// funcion que se ejecuta conforme el usuario escribe algo
	const handleChange = (e) => {
		guardarValores({
			...valores,
			[e.target.name]: e.target.value,
		});
	};

	// funcion para submit

	const handleSubmit = (e) => {
		e.preventDefault();
		const erroresValidacion = validar(valores);
		guardarErorres(erroresValidacion);
		guardarSubmitForm(true);
	};

	return {
		valores,
		errores,
		submitForm,
		handleSubmit,
		handleChange,
	};
};

export default useValidation;
