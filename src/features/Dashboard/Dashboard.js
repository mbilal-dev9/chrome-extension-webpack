import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useDashboard } from './hooks/useDashboard';
import { Box, Grid } from '@mui/material';

const Dashboard = () => {
	const { isLoading, fetchUserMetaData, metaData } = useDashboard();

	useEffect(() => {
		fetchUserMetaData();
	}, []);

	return (
		<Box
			sx={(theme) => ({
				fontFamily:"Roboto, sans-serif",
				padding: '36px 60px',
				h1: { fontSize: '30px', fontWeight: 700, lineHeight: '23px', marginBottom: '30px' },
				h2: { fontSize: '18px', fontWeight: 600, lineHeight: '23px', marginBottom: '12px' },
				h3: { fontSize: '18px', fontWeight: 600, lineHeight: '23px', marginBottom: '12px' },
				a: {
					color: theme.palette.linkColor.main,
					fontSize: '14px',
					fontWeight: 500,
					lineHeight: '21px',
				},
				hr: {
					margin: '30px 0',
					'@media screen and (max-width: 1280px)': {
						margin: '10px 0',
					},
				},
				height: 'calc(100vh - 190px)',
				overflowY: 'scroll',
			})}
		>
			{!isLoading && <ReactMarkdown children={metaData?.home_content} remarkPlugins={[remarkGfm]} />}
			{/* <ConnectionError /> */}
		</Box>
	);
};

export default Dashboard;
