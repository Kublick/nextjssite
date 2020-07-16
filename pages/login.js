import React, { useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Router from "next/router";
import Layout from "../components/layout/layout";
import {
	Formulario,
	Campo,
	InputSubmit,
	Error,
} from "../components/ui/Formulario";
import firebase from "../firebase";

// validaciones
import useValidation from "../hooks/useValidation";
import validarIniciarSesion from "../validacion/validarIniciarSesion";

const STATE_INICIAL = {
	email: "",
	password: "",
};

export default function Login() {
	const [error, guardarError] = useState(false);

	const {
		valores,
		errores,
		submitForm,
		handleSubmit,
		handleChange,
		handleBlur,
	} = useValidation(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

	const { email, password } = valores;

	async function iniciarSesion() {
		try {
			const usuario = await firebase.login(email, password);
			console.log(usuario);
			Router.push("/");
		} catch (error) {
			console.error("Hubo un error al authenticar al usuario", error.message);
			guardarError(error.message);
		}
	}

	return (
		<div>
			<Layout>
				<>
					<h1
						css={css`
							text-align: center;
							margin-top: 5rem;
						`}
					>
						Iniciar Sesion
					</h1>
					<Formulario onSubmit={handleSubmit} noValidate>
						<Campo>
							<label htmlFor='email'>Email</label>
							<input
								type='text'
								id='email'
								placeholder='Tu Email'
								name='email'
								value={email}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</Campo>
						{errores.email && <Error>{errores.email}</Error>}
						<Campo>
							<label htmlFor='email'>Password</label>
							<input
								type='password'
								id='password'
								placeholder='Tu Password'
								name='password'
								value={password}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</Campo>
						{errores.password && <Error>{errores.password}</Error>}
						{error && <Error>{error}</Error>}
						<InputSubmit type='submit' value='Iniciar Sesion' />
					</Formulario>
				</>
			</Layout>
		</div>
	);
}
