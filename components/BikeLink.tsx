import Link from 'next/link';
import React, {memo} from 'react';

type BikeLinkProps = {
	id: number | string;
}

const BikeLink = memo<BikeLinkProps>(({ id }) => {
	return (
		<Link
			href={`/bike/${id}`}
			style={{
				display: 'block',
				padding: '10px',
				textAlign: 'center',
				backgroundColor: '#eee',
				border: '1px solid #ccc',
				borderRadius: '5px',
				textDecoration: 'none',
				color: '#000',
				cursor: 'pointer',
			}}
		>
			{id}
		</Link>
	);
})

BikeLink.displayName = "BikeLink";

export default BikeLink;
