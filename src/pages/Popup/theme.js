import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: {
			main: '#000000',
			dark: '#141414',
		},
		success: {
			main: '#2CB129',
			dark: '#287027',
		},
		universalWhite: {
			main: '#ffffff',
		},
		sideBar: {
			main: '#232323',
		},
		tableColor: {
			main: '#C6C6C6',
			light: 'rgba(0, 0, 0, 0.12)',
		},
		JobsTableColor: {
			extraLight: 'rgba(45, 203, 68, 0.25)',
			light: 'rgba(45, 203, 68, 0.5)',
			main: 'rgba(45, 203, 68, 0.75)',
			dark: '#2DCB44;',
			danger: 'rgba(255, 0, 0, 0.11)',
			secondary: 'rgba(193, 193, 193, 0.15) !important',
		},
		linkColor: {
			main: '#FE6E35',
		},
	},
});

export default theme;
