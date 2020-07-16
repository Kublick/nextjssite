import App from "next/app";
import firebase, { FirebaseContext } from "../firebase";
import useAuth from "../hooks/useAuth";

const MyApp = (props) => {
	const { Component, pageProps } = props;
	const usuario = useAuth();
	console.log(usuario);

	return (
		<FirebaseContext.Provider
			value={{
				firebase,
				usuario,
			}}
		>
			<Component {...pageProps} />
		</FirebaseContext.Provider>
	);
};

export default MyApp;
