import React from 'react';

import './CoinDescription.css';
export default function CoinDescription(props) {
	return (
		<p
			dangerouslySetInnerHTML={{ __html: props.description }}
			className="description"
		></p>
	);
}
