import Layout from '@/components/Layout/Layout';
import Link from "next/link";
import {useState} from "react";

import styles from "./index.module.scss";

const HomePage = () => {
	const [loading, setLoading] = useState(false);

	if (loading) return <Layout title="Loading..."><p>Loading...</p></Layout>;

	return (
		<Layout title="Actiune">
			<Link href="/bikes"
			  onClick={() => setLoading(true)}
			  className={styles.link}
			>Statut bicicleta</Link>
		</Layout>
	);
}

export default HomePage;
