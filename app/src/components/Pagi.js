import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";

import { Pagination } from "semantic-ui-react";

export default function Pagi() {
	const [activePage, setActivePage] = useState(1);
	const onChange = (e, pageInfo) => {
		setActivePage(pageInfo.activePage);
	};
	return (
		<div>
			<Pagination activePage={activePage} onPageChange={onChange} totalPages={619} ellipsisItem={null} />
		</div>
	);
}
