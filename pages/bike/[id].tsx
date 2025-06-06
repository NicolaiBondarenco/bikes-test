import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import BikeForm from '@/components/BikeForm/BikeForm'
import Button from "@/components/Button/Button";

type Bike = {
	id: string;
	status: string;
	brand: string;
	user: string | null;
}

const BikeDetailPage = () => {
	const router = useRouter();
	const { id } = router.query;

	const [bike, setBike] = useState<Bike | null>(null);
	const [user, setUser] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (typeof id !== 'string') return;

		const fetchBike = async () => {
			try {
				const res = await fetch(`/api/bike/${id}`);
				if (!res.ok) throw new Error('Bike not found');
				const data = await res.json();
				setBike(data);
				setUser(data.user || '');
			} catch (error) {
				console.error(error);
				setBike(null);
			} finally {
				setLoading(false);
			}
		};

		fetchBike();
	}, [id]);


	const handleSubmit = async () => {
		if (!bike) return;

		setLoading(true)

		const newStatus = bike.status === 'Active' ? 'Inactive' : 'Active';
		const body = {
			status: newStatus,
			user: newStatus === 'Active' ? user : '',
		};

		await fetch(`/api/bike/${bike.id}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});

		router.reload();
	};

	if (loading) return <Layout title="Loading..."><p>Loading...</p></Layout>;
	if (!bike) return <Layout title="Error"><p>Bike not found</p></Layout>;

	return (
		<Layout title={`Bike #${bike.id}`} isLoading={!bike}>
			<p><strong>Brand:</strong> {bike.brand}</p>
			<p><strong>Status:</strong> {bike.status}</p>

			{bike.status === 'Active' ? (
				<>
					<p><strong>User:</strong> {bike.user}</p>
					<Button onClick={handleSubmit}>Set Inactive</Button>
				</>
			) : (
				<BikeForm
					initialUser={user}
					status={bike.status as 'Active' | 'Inactive'}
					onSubmit={async (userName: string) => {
						const newStatus = bike.status === 'Active' ? 'Inactive' : 'Active';

						await fetch(`/api/bike/${bike.id}`, {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({
								status: newStatus,
								user: newStatus === 'Active' ? userName : '',
							}),
						});

						router.reload();
					}}
				/>
			)}
		</Layout>
	);
}

export default BikeDetailPage;