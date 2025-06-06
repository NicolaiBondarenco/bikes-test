import Layout from '@/components/Layout/Layout';
import BikeLink from '@/components/BikeLink/BikeLink';
import { getBikesData } from "@/lib/getBikesData";
import { GetServerSideProps } from "next";
import {memo} from "react";

import styles from "./index.module.scss";

type Bike = {
	id: number;
	status: string;
	brand: string;
	user: string | null;
}

type BikesPageProps = {
	bikes: Bike[];
}

const BikesPage = memo<BikesPageProps>(({ bikes }) => {
	return (
		<Layout title="Bikes" isLoading={bikes.length <= 0}>
			<h2>Numărul bicicletei</h2>
			{bikes.length === 0 ? (
				<p>No bikes found.</p>
			) : (
				<div className={styles.bikesWrapper}>
					{bikes.map(bike => (
						<BikeLink key={bike.id} id={bike.id} />
					))}
				</div>
			)}
		</Layout>
	);
})

export const getServerSideProps: GetServerSideProps = async () => {
	try {
		const bikes = await getBikesData();
		if (!bikes.length) {
			return { notFound: true };
		}
		return { props: { bikes } };
	} catch (error) {
		console.error(error);
		return { notFound: true };
	}
};

BikesPage.displayName = 'BikesPage';

export default BikesPage;