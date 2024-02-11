import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import * as Sentry from '@sentry/react';
import mixpanel from 'mixpanel-browser';

mixpanel.init(process.env.REACT_APP_MIX_PANEL_PROJECT_ID);

Sentry.init({
	dsn: process.env.REACT_APP_SENTRY_DSN,
	integrations: [
		new Sentry.BrowserTracing({
			tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
		}),
		new Sentry.Replay(),
	],
	tracesSampleRate: 1.0,
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

