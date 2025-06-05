import React, {memo, useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';

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
			<header style={{ padding: '10px', background: '#f5f5f5', marginBottom: '10px' }}>
				<h1 style={{ margin: 0 }}>{title}</h1>
				<nav style={{ marginTop: '5px' }}>
					<Link href="/" style={{ marginRight: 10 }}>Home</Link>
					<Link href="/bikes">Bikes</Link>
				</nav>
			</header>
			<main style={{ padding: '10px' }}>{children}</main>
		</>
	);
})

Layout.displayName = 'Layout';

export default Layout;