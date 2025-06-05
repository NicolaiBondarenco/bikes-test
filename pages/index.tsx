import Layout from '@/components/Layout';
import Link from "next/link";
import {useState} from "react";

const HomePage = () => {
	const [loading, setLoading] = useState(false);

	if (loading) return <Layout title="Loading..."><p>Loading...</p></Layout>;

	return (
		<Layout title="Actiune">
			<Link href="/bikes"
			  onClick={() => setLoading(true)}
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
			>Statut bicicleta</Link>
		</Layout>
	);
}

export default HomePage;
