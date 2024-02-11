const COOKIES_URL = 'https://www.upwork.com';
const CREATE_JOBS_SCORE = `https://upworkpowertools.com/api/jobs/create`;
const REQUIRED_JOBS_URL = '/popup.html#/jobs';
const COMPLETE = 'complete';

// up-work api requests
const UPWORK_SECURITY_LOGIN = 'https://www.upwork.com/ab/account-security/login';
const UPWORK_BEST_MATCHES_ENDPOINT = (type) => `https://www.upwork.com/ab/find-work/api/feeds/${type}/`;
const FETCH_JOB_DETAILS = (key) => `https://www.upwork.com/job-details/jobdetails/api/job/${key}/summary`;

var requestOptions = {
	method: 'GET',
	headers: '',
	redirect: 'follow',
};

let headers;
let previousList = [];
let isUserLogin;
let loginState = true;

chrome.action.onClicked.addListener((tab) => {
	chrome.tabs.create({ url: chrome.runtime.getURL('popup.html#/jobs') });
});

const createHeader = (formattedCookie) => {
	return {
		cookie: `${formattedCookie}`,
		'x-requested-with': 'XMLHttpRequest',
		authority: 'www.upwork.com',
		accept: 'application/json, text/plain, */*',
		'sec-ch-ua-mobile': '?0',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'none',
	};
};

const cookieFormatter = (cookies) => {
	let formattedCookie = '';
	cookies.forEach((cookie) => {
		formattedCookie += `${cookie.name}=${cookie.value}; `;
	});
	return formattedCookie;
};

const getCookies = (url) => {
	return new Promise((resolve) => {
		chrome.cookies.getAll({ url }, (cookies) => {
			resolve(cookies);
		});
	});
};

const fetchCookies = async () => {
	const cookies = await getCookies(COOKIES_URL);
	if (cookies) {
		const formattedCookie = cookieFormatter(cookies);
		headers = createHeader(formattedCookie);
		requestOptions.headers = headers;
		chrome.storage.local.set({ cookieData: headers });
		return true;
	} else {
		return false;
	}
};

const changeJobsStatus = () => {
	previousList = previousList?.map((item) => {
		return {
			...item,
			isRead: true,
		};
	});
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type === 'openPopup') {
		chrome.tabs.create({ url: 'popup.html#/sign-in' });
	}
	if (message.type === 'getJobDetails') {
		sendResponse({ isUserLogin: isUserLogin, data: previousList });
		if (!previousList?.length) checkAndRunBackgroundService();
			changeJobsStatus();
	}
	return true;
});

const filterFetchedJobs = (jobs) => {
	return previousList.length > 0
		? jobs?.results?.filter((newObj) => {
				return !previousList.some((prevObj) => prevObj?.ciphertext === newObj?.ciphertext);
		  })
		: jobs?.results;
};

const fetchJobScores = async (jobs) => {
	try {
		const promises = jobs?.map(async (obj) => {
			const detailsResponse = await fetch(FETCH_JOB_DETAILS(obj?.ciphertext), requestOptions);
			const details = await detailsResponse.json();

			const scoreResponse = await fetch(CREATE_JOBS_SCORE, {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(details),
			});

			const scoreData = await scoreResponse.json();

			obj.customer_score = scoreData?.customer_score;
			obj.location_score = scoreData?.location_score;
			obj.isRead = false;

			return obj;
		});

		const updatedJobs = await Promise.all(promises);
		return updatedJobs;
	} catch (err) {
		console.log('The error is:', err);
		throw err;
	}
};

const sendNewJobsToUser = () => {
	chrome.runtime.sendMessage({
		type: 'newJobs',
		newJobs: previousList,
		isUserLogin: isUserLogin,
	});
	changeJobsStatus();
}

const deliverFetchedJobsToView = () => {
	chrome.tabs.query({}, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.includes(REQUIRED_JOBS_URL)) {
				sendNewJobsToUser();
			}
		});
	});
};

const sendUserLoggedMessage = (isLogin) => {
	chrome.tabs.query({}, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.includes(REQUIRED_JOBS_URL)) {
				chrome.runtime.sendMessage({
					type: 'userLogged',
					isUserLogin: isLogin,
				});
			}
		});
	});
};

const sendNoInternetMessage = () => {
	chrome.tabs.query({}, function (tabs) {
		tabs.forEach(function (tab) {
			if (tab.url.includes(REQUIRED_JOBS_URL)) {
				chrome.runtime.sendMessage({
					type: 'noInternet',
				});
			}
		});
	});
};

const fetchJobsData = async () => {
	try {
		const response = await fetch('https://www.upwork.com/ab/find-work/api/feeds/saved-searches', requestOptions);
		if (!response.ok) throw new Error(response?.status);

		const fetchedJobs = await response.json();
	
		const filteredJobsList = filterFetchedJobs(fetchedJobs);
		const jobsWithScores = await fetchJobScores(filteredJobsList);
		
		if (!!jobsWithScores?.length) {
      if (!!previousList?.length) {
        previousList = [...jobsWithScores, ...previousList];
        deliverFetchedJobsToView();
      }
      else if (!loginState) {
        previousList = [...jobsWithScores, ...previousList];
				deliverFetchedJobsToView();
				loginState = true;
      }
			else {
				previousList = [...jobsWithScores, ...previousList];
			}
    }

		chrome.storage.local.set({ isUserLogin: true });
		sendUserLoggedMessage(true);

		runBackgroundAfterOneMinuteDelay();
	} catch (error) {
		console.log('the error is: ', error);
		if (error.message === '401') {
			loginState = false;
			sendUserLoggedMessage(false);
			chrome.storage.local.set({ isUserLogin: false });
			isUserLogin = false;
		}
		runBackgroundAfterOneMinuteDelay();
		deliverFetchedJobsToView();

	}
};

const fetchLoginAuth = async () => {
	try {
		const response = await fetch(UPWORK_SECURITY_LOGIN, {
			headers: headers,
		});
		return response;

	} catch (error) {
		// if (error.message === 'Failed to fetch') {
		// 	sendNoInternetMessage();
		// }
		runBackgroundAfterOneMinuteDelay();
	}
};

const runUpworkEndPoints = async () => {
	const result = await fetchLoginAuth();
	if (result?.ok) {
		fetchJobsData();
	} else {
		runBackgroundAfterOneMinuteDelay();
	}
};

chrome.alarms.onAlarm.addListener(async (alarm) => {
	if (alarm.name === 'call_upwork_jobs') {
		checkAndRunBackgroundService();
	}
});

const runBackgroundAfterOneMinuteDelay = () => {
	chrome.alarms.create('call_upwork_jobs', { delayInMinutes: 1 });
};

const checkAndRunBackgroundService = async () => {
	const areCookiesFetched = await fetchCookies();
	areCookiesFetched && runUpworkEndPoints();
};

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.local.set({ isFirstTime: true });
	checkAndRunBackgroundService();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.type === 'getCredits') chrome.storage.local.set({ userCredits: request?.remainingCredits });
});

chrome.runtime.onStartup.addListener(function() {
  chrome.storage.local.set({ isFirstTime: true });
	checkAndRunBackgroundService();
});
