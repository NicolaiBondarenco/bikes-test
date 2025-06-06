import Link from 'next/link';
import React, {memo} from 'react';

import styles from "./BikeLink.module.scss"

type BikeLinkProps = {
	id: number | string;
}

const BikeLink = memo<BikeLinkProps>(({ id }) => {
	return (
		<Link
			href={`/bike/${id}`}
			className={styles.bikeLink}
		>
			{id}
		</Link>
	);
})

BikeLink.displayName = "BikeLink";

export default BikeLink;
