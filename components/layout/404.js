/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";

const Error404 = () => {
	return (
		<div>
			<h1
				css={css`
					margin-top: 5rem;
					text-align: center;
				`}
			>
				Producto No Existente
			</h1>
		</div>
	);
};

export default Error404;
