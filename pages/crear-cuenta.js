import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
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
import validarCrearCuenta from "../validacion/validarCrearCuenta";

export default function CrearCuenta() {
	const STATE_INICIAL = {
		nombre: "",
		email: "",
		password: "",
	};

	const {
		valores,
		errores,
		submitForm,
		handleSubmit,
		handleChange,
		handleBlur,
	} = useValidation(STATE_INICIAL, validarCrearCuenta, crearCuenta);

	const { nombre, email, password } = valores;

	async function crearCuenta() {
		try {
			await firebase.registrar(nombre, email, password);
		} catch (error) {
			console.error("Hubo un error al crear usuario", error.message);
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
						Crear Cuenta
					</h1>
					<Formulario onSubmit={handleSubmit} noValidate>
						<Campo>
							<label htmlFor='nombre'>Nombre</label>
							<input
								type='text'
								id='nombre'
								placeholder='Tu Nombre'
								name='nombre'
								value={nombre}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</Campo>
						{errores.nombre && <Error>{errores.nombre}</Error>}
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
						<InputSubmit type='submit' value='Crear Cuenta' />
					</Formulario>
				</>
			</Layout>
		</div>
	);
}