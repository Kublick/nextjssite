import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import Error404 from "../../components/layout/404";
import Layout from "../../components/layout/layout";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import { Campo, InputSubmit } from "../../components/ui/Formulario";
import Boton from "../../components/ui/Boton";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const ContenedorProducto = styled.div`
	@media (min-width: 768px) {
		display: grid;
		grid-template-columns: 2fr 1fr;
		column-gap: 2rem;
	}
`;

const Producto = () => {
	//routing para obtener

	const router = useRouter();
	console.log(router);

	//state componente
	const [producto, guardarProducto] = useState({});
	const [error, guardarError] = useState(false);

	//context firebase
	const { firebase, usuario } = useContext(FirebaseContext);

	const {
		query: { id },
	} = router;

	useEffect(() => {
		if (id) {
			const obtenerProducto = async () => {
				const productoQuery = await firebase.db.collection("productos").doc(id);
				const producto = await productoQuery.get();
				if (producto.exists) {
					guardarProducto(producto.data());
				} else {
					guardarError(true);
				}
			};

			obtenerProducto();
		}
	}, [id, producto]);

	if (error) return <Error404 />;

	// if (Object.keys(producto.lenght === 0)) return "Cargando ...";

	const {
		comentarios,
		creado,
		descripcion,
		empresa,
		nombre,
		votos,
		url,
		urlimagen,
		creador,
		haVotado,
	} = producto;

	console.log(creador);

	const votarProducto = () => {
		console.log("wegotclick");
		if (!usuario) {
			return router.push("/login");
		}

		let nuevoTotal = votos + 1;

		if (haVotado.includes(usuario.uid)) return;

		//Guardar ID usuario

		const nuevoHaVotado = [...haVotado, usuario.uid];

		firebase.db
			.collection("productos")
			.doc(id)
			.update({ votos: nuevoTotal, haVotado: nuevoHaVotado });

		guardarProducto({
			...producto,
			votos: nuevoTotal,
		});
	};

	return (
		<Layout>
			<>
				{error && <Error404 />}

				<div className='contenedor'>
					<h1
						css={css`
							text-align: center;
							margin-top: 5rem;
						`}
					>
						{nombre}
					</h1>

					<ContenedorProducto>
						<div>
							<p>
								Publicado hace:
								{formatDistanceToNow(new Date(), { locale: es })}
								<p>{/* Por: {creador.nombre} de {empresa}{" "} */}</p>
								<img src={urlimagen} />
								<p>{descripcion}</p>
							</p>
							{usuario && (
								<>
									<h2>Agrega tu comentario</h2>
									<form>
										<Campo>
											<input type='text' name='mensaje' />
										</Campo>
										<InputSubmit type='submit' value='Agregar Comentario' />
									</form>
								</>
							)}
							<h2
								css={css`
									margin: 2rem 0;
								`}
							>
								Comentarios
							</h2>
							{/* {comentarios.map((comentario) => (
								<li>
									<p>Escrito por: {comentario.usuarioNombre}</p>
								</li>
							))} */}
						</div>
						<aside>
							<Boton target='_blank' bgColor='true' href={url}>
								Visitar URL
							</Boton>

							<div
								css={css`
									margin: 5rem;
								`}
							>
								<p
									css={css`
										text-align: center;
									`}
								>
									{votos} Votos
								</p>
								{usuario && <Boton onClick={votarProducto}>Votar</Boton>}
							</div>
						</aside>
					</ContenedorProducto>
				</div>
			</>
		</Layout>
	);
};

export default Producto;
