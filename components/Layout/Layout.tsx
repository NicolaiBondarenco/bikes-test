import React, { memo, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Layout.module.scss';

type LayoutProps = {
	title?: string;
	children: React.ReactNode;
	isLoading?: boolean;
};

const Layout = memo<LayoutProps>(({ isLoading = false, title = 'Bike App', children }) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const handleStart = () => setLoading(true);
		const handleComplete = () => setLoading(false);

		router.events.on('routeChangeStart', handleStart);
		router.events.on('routeChangeComplete', handleComplete);
		router.events.on('routeChangeError', handleComplete);

		return () => {
			router.events.off('routeChangeStart', handleStart);
			router.events.off('routeChangeComplete', handleComplete);
			router.events.off('routeChangeError', handleComplete);
		};
	}, [router]);

	const isPageLoading = loading || isLoading;

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content="Next.js Bike Manager with Google Sheets" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
			</Head>
			<header className={styles.header}>
				<h1 className={styles.title}>{isPageLoading ? 'Loading...' : title}</h1>
				<nav className={styles.nav}>
					<Link href="/" className={styles.link}>Home</Link>
					<Link href="/bikes" className={styles.link}>Bikes</Link>
				</nav>
			</header>
			<main className={styles.main}>
				{isPageLoading ? <p>Loading...</p> : children}
			</main>
		</>
	);
});

Layout.displayName = 'Layout';

export default Layout;
