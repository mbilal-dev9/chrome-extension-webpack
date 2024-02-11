import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ErrorDialog = ({ text, navigationUrl, buttonText, openWindowInNewTab }) => (
	<Typography
		component={'div'}
		style={{
			height: 'calc(100vh - 190px)',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'column',
		}}
	>
		<Typography component={'div'}>
			<img src='caution.png' alt='twitter user' />
		</Typography>
		<Typography
			component={'div'}
			style={{
				fontWeight: 500,
				fontSize: '1rem',
				maxWidth: '30rem',
				alignItems: 'center',
				justifyContent: 'center',
				textAlign: 'center',
				marginTop: '1rem',
				marginBottom: '1rem',
			}}
		>
			{text}
		</Typography>
		<Link
			style={{
				backgroundColor: '#108A00',
				textAlign: 'center',
				borderRadius: '4px',
				padding: '1rem 1.8rem',
				textDecoration: 'none',
			}}
			to={navigationUrl}
			target={openWindowInNewTab ? '_blank' : ''}
		>
			<Typography component={'div'} style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 600 }}>
				{buttonText}
			</Typography>
		</Link>
	</Typography>
);

export default ErrorDialog;
