/*global chrome*/
import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { manageUpworkPages } from '../utils/constants';
import { Divider } from '@mui/material';

export default function ButtonAppBar() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [userCredits, setUserCredits] = useState();
	const accessToken = localStorage.getItem('accessToken');

	const [isLoggedIn, setIsLoggedIn] = useState();

	useEffect(() => {
		if (!!accessToken) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, [pathname]);

	const handleSignUp = () => {
		navigate('/sign-up');
	};

	const handleLogin = () => {
		navigate('/sign-in');
	};

	const handleLogout = async () => {
		await manageUpworkPages();
		localStorage.clear();
		chrome.storage.local.remove('isLogIn');
		chrome.storage.local.remove('accessToken');
		navigate('/home');
		window.location.reload(false);
	};

	const getUserCreditsFromChromeStorage = async () => {
		const data = await chrome.storage.local.get('userCredits');
		setUserCredits(data?.userCredits);
	};

	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		if (request.type === 'getCredits') setUserCredits(request?.remainingCredits);
	});

	useEffect(() => {
		getUserCreditsFromChromeStorage();
	}, []);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position='static'
				sx={(theme) => ({
					boxShadow: 'none',
				})}
			>
				<Toolbar
					sx={(theme) => ({
						display: 'flex',
						justifyContent: 'flex-end',
						backgroundColor: theme.palette.universalWhite.main,
						boxShadow: 'none',
						position: 'unset',
						gap: '24px',
						padding: '24px 60px !important',
					})}
				>
					<Button
						sx={(theme) => ({
							backgroundColor: theme.palette.universalWhite.main,
							color: theme.palette.primary.main,
							marginRight: '20px',
							borderRadius: '100px',
							fontSize: '14px',
							lineHeight: '20px',
							fontWeight: 500,
							padding: '10px 47px',
							border: '1px solid rgba(0, 0, 0, 0.27)',
							margin: 0,
							'&:hover': {
								backgroundColor: theme.palette.universalWhite.main,
								boxShadow: 'none',
							},
						})}
						onClick={!isLoggedIn ? handleSignUp : () => {}}
					>
						{isLoggedIn ? `${userCredits} credits` : 'Sign up and get 15 free credits'}
					</Button>
					<Button
						sx={(theme) => ({
							backgroundColor: theme.palette.success.main,
							color: '#ffffff',
							marginRight: '20px',
							borderRadius: '100px',
							fontSize: '14px',
							lineHeight: '20px',
							fontWeight: 500,
							padding: '10px 47px',
							margin: 0,
							'&:hover': {
								backgroundColor: theme.palette.success.main,
								boxShadow: 'none',
							},
						})}
						onClick={isLoggedIn ? handleLogout : handleLogin}
					>
						{isLoggedIn ? 'Logout' : 'Login'}
					</Button>
				</Toolbar>
			</AppBar>
			<Divider />
		</Box>
	);
}
