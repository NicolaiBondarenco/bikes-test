import React, { memo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './Layout.module.scss';

type LayoutProps = {
	title?: string;
	children: React.ReactNode;
};

const Layout = memo<LayoutProps>(({ title = 'Bike App', children }) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content="Next.js Bike Manager with Google Sheets" />
			</Head>
			<header className={styles.header}>
				<h1 className={styles.title}>{title}</h1>
				<nav className={styles.nav}>
					<Link href="/" className={styles.link}>Home</Link>
					<Link href="/bikes" className={styles.link}>Bikes</Link>
				</nav>
			</header>
			<main className={styles.main}>{children}</main>
		</>
	);
});

Layout.displayName = 'Layout';

export default Layout;
