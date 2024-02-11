/*global chrome*/

import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import Skills from '../features/Skills/Skills';
import ButtonAppBar from '../common/ButtonAppBar';
import Dashboard from '../features/Dashboard/Dashboard';
import Jobs from '../features/Jobs/Jobs';
import SignIn from '../features/SignIn/SignIn';
import SignUp from '../features/SignUp/SignUp';
import Referral from '../features/Referral/Referral';
import Credits from '../features/Credits/Credits';
import SvgUpworkSvg from '../assets/svgs/components/upwork-svg';
import { Divider, Grid, Icon } from '@mui/material';
import SvgChartSvg from '../assets/svgs/components/chart-svg';
import SvgJobsSvg from '../assets/svgs/components/jobs-svg';
import SvgDocumentSvg from '../assets/svgs/components/document-svg';
import SvgChatSvg from '../assets/svgs/components/chat-svg';
import SvgWalletSvg from '../assets/svgs/components/wallet-svg';

const getMenuItems = () => {
	return [
		{ id: 1, link: '/home', name: 'home', title: 'Home', icon: <SvgChartSvg /> },
		{ id: 2, link: '/jobs', name: 'jobs', title: 'Jobs', icon: <SvgJobsSvg /> },
		{ id: 3, link: '/skills', name: 'skills', title: 'My Skills', icon: <SvgDocumentSvg /> },
		{ id: 4, link: '/referral', name: 'referral', title: 'Referral', icon: <SvgChatSvg /> },
		{ id: 5, link: '/credits', name: 'credits', title: 'Get Free Credits', icon: <SvgWalletSvg /> },
	];
};
const styles = {
	sidebarRoot: {
		minWidth: '240px',
	},
	sidebarContainer: {
		backgroundColor: '#232323',
	},
};

export const Routing = () => {
	const menuItems = getMenuItems();
	const [activeTab, setActiveTab] = useState();

	const getCurrentTab = () => {
		return new Promise((resolve) => {
			chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
				resolve(tabs);
			});
		});
	}

	const checkActiveTab = async () => {
		const tabs = await getCurrentTab();
		setActiveTab(tabs[0].url?.split('/').pop());
	};

	useEffect(() => {
		const handleTabUpdate = (_tabId, _changeInfo, tab) => {
			if (!tab?.url) return;
			const tabName = tab.url?.split('/').pop();
			if (!tabName) return;
			const tabObject = menuItems?.find((menuItem) => menuItem?.name === tabName);
			if (!tabObject) return;
			setActiveTab(tab.url?.split('/').pop());
		};
		const handleTabActivated = ({ tabId }) => {
			chrome.tabs.get(tabId, (tab) => {
				if (!tab?.url) return;
				const tabName = tab.url?.split('/').pop();
				if (!tabName) return;
				const tabObject = menuItems?.find((menuItem) => menuItem?.name === tabName);
				if (!tabObject) return;
				if (tabName) {
					setActiveTab(tabName);
					chrome.storage.local.set({ activeTab: tabName });
				}
			});
		};

		chrome.tabs.onUpdated.addListener(handleTabUpdate);
		return () => {
			chrome.tabs.onUpdated.removeListener(handleTabUpdate);
		};
	}, []);

	useEffect(() => {
		if (activeTab) return;
		checkActiveTab();
	}, [activeTab]);

	return (
		<div>
			<div style={{ display: 'flex', height: '100vh' }}>
				<Sidebar
				className='responsive'
					rootStyles={{
						[`.${sidebarClasses.container}`]: {
							backgroundColor: '#232323',
						},
					}}
				>
					<Grid 
						sx={{ 
							display:'flex',
							justifyContent:'center',
							padding: '40px 0 24px',
							'@media screen and (min-width: 1280px)': {
								padding:'36px 0 20px',
							},  
						}}>
						<SvgUpworkSvg 
						/>
					</Grid>
					<Divider
						sx={(theme) => ({
							backgroundColor: theme.palette.universalWhite.main,
							margin:'0 20px'
						})}
					/>

					<Menu
						style={{
							margin: '44px 20px 0',
						}}
						menuItemStyles={{
							button: ({ active }) => {
								return {
									color: active ? '#ffffff' : '#A7A7A7',
									backgroundColor: active ? 'rgba(210, 211, 218, 0.4)' : '#232323',
									borderRadius: '5px',
									'&:hover': {
										backgroundColor: active ? 'rgba(210, 211, 218, 0.4)' : '#232323',
									},
								};
							},
							label: ({ active }) => {
								return {
									display: 'flex',
									alignItems: 'center',
									gap: '12px',
									fontSize: '12px',
									lineHeight: '12px',
									fontWeight: 500,
									letterSpacing: '0.5px',
									
								};
							},
							buttonHover: () => {
								return {
									backgroundColor: 'transparent',
								};
							},
						}}
					>
						{menuItems?.map((menuItem) => (
							<MenuItem
								key={menuItem?.id}
								active={menuItem?.name === activeTab}
								component={<Link to={menuItem?.link} />}
							>
								{menuItem?.icon}
								{menuItem?.title}
							</MenuItem>
						))}
					</Menu>
				</Sidebar>

				<div style={{ width: '100%' }}>
					<ButtonAppBar />
					<Routes>
						<Route path={'/home'} element={<Dashboard />} />
						<Route path={'/skills'} element={<Skills />} />
						<Route path={'/jobs'} element={<Jobs />} />
						<Route path={'/sign-in'} element={<SignIn />} />
						<Route path={'/sign-up'} element={<SignUp />} />
						<Route path={'/referral'} element={<Referral />} />
						<Route path={'/credits'} element={<Credits />} />
					</Routes>
				</div>
			</div>
		</div>
	);
};
