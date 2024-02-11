const PERSONA_TEMPLATES_URL = 'https://upworkpowertools.com/api/proposals/get-personas';
const WRITE_PROPOSAL_URL = (personaId) => `https://upworkpowertools.com/api/proposals/write-proposal/${personaId}`;
const FETCH_CLIENT_REVIEWS = (key) => `https://www.upwork.com/job-details/jobdetails/api/job/${key}/details`;
const FETCH_JOB_DETAILS = (key) => `https://www.upwork.com/job-details/jobdetails/api/job/${key}/summary`;
const SAVE_PROPOSAL = (key) => `https://upworkpowertools.com/api/proposals/update-proposal-log/${key}`;

const proposalButton = document.createElement('button');
const saveProposalButton = document.createElement('button');
const loginButton = document.createElement('button');
const showErrorSpan = document.createElement('span');
const select = document.createElement('select');
const proposalDiv = document.createElement('div');
const loader = document.createElement('div');
const NewCreatedDiv = document.createElement('div');

const loginDiv = document.createElement('div');
const linkButton = document.createElement('a');

let loginElements = `
    <span>To write AI proposals, Login</span>
  `;

let dataDiv = `<div class="content-left" id='content-left'>
    <svg width="49" height="31" viewBox="0 0 49 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M46.5458 8.98425C44.5177 7.23096 42.0915 6.48226 39.4379 6.47278C31.5054 6.45383 23.5824 6.46331 15.65 6.46331C15.4036 6.46331 15.1572 6.48226 14.8349 6.50122C14.6454 8.07444 14.4559 9.62871 14.2568 11.3251C14.816 11.3251 15.2046 11.3251 15.6026 11.3251C23.3171 11.3251 31.0221 11.3157 38.7366 11.3346C40.3667 11.3346 41.9683 11.4957 43.2856 12.614C44.2144 13.4007 44.3471 14.5948 43.6173 15.5899C43.3425 15.9595 43.0392 16.3196 42.6791 16.6134C39.9781 18.8501 36.8032 18.7458 33.5809 18.4425C33.5336 18.4425 33.4956 18.3667 33.4483 18.3288C33.5999 17.002 33.7515 15.6941 33.9221 14.282C32.3773 14.282 30.9557 14.2536 29.5342 14.3105C29.3067 14.3199 28.9655 14.7275 28.9181 14.9928C28.7381 15.9311 28.6623 16.8978 28.5485 17.8455C28.1694 20.9919 27.7998 24.1289 27.4207 27.2753C27.326 28.0999 27.2217 28.9244 27.0985 29.9195C28.4632 29.9195 29.6384 29.9195 30.8136 29.9195C32.0077 29.9195 32.0646 29.8437 32.1973 28.6211C32.3773 26.9342 32.5953 25.2472 32.8133 23.4371C34.2728 23.4371 35.6375 23.456 37.0022 23.4371C40.5657 23.3897 43.769 22.3377 46.3942 19.8452C49.8155 16.6229 49.8723 11.8653 46.5458 8.98425Z" fill="#18DC14"/>
      <path d="M18.7585 18.1774C18.531 19.4852 18.4552 20.8879 17.9245 22.063C16.4081 25.418 12.8162 25.7876 9.96358 24.8873C8.86422 24.5366 8.17238 23.5699 8.14395 22.3189C8.12499 21.6081 8.13447 20.8879 8.22924 20.1771C8.48513 18.1774 8.75997 16.1777 9.03481 14.178H9.01585C9.17697 12.9459 9.34756 11.7044 9.51815 10.4155C10.6459 10.4155 11.7074 10.4155 12.9679 10.4155C11.4231 6.87101 9.96358 3.52554 8.41879 0C5.75568 3.50658 3.19682 6.86153 0.486328 10.425C1.9553 10.425 3.17787 10.425 4.4573 10.425C4.4573 10.7567 4.47625 10.9747 4.4573 11.1737C4.03082 14.5002 3.6233 17.8362 3.18734 21.1627H3.21578C2.92198 24.6314 5.08279 28.2517 8.26715 29.4837C10.1152 30.1945 11.9917 30.1092 13.8682 30.0145C17.2326 29.8439 19.7251 28.138 21.6206 25.4464C22.7579 23.8353 23.1938 21.9967 23.3834 20.0444C23.5634 18.1489 23.9236 16.263 24.2079 14.3296C22.4925 14.3296 20.9288 14.3296 19.2987 14.3296C19.1091 15.6564 18.9764 16.9264 18.7585 18.1774Z" fill="#18DC14"/>
    </svg>

    <div class="vertical-line"></div>
    <span class="loader" id="loader"></span>
  </div>`;

let loadedDiv = `<div class="features">
    <div class="locked-feature">
      <div class="locked-overlay">
        <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.97603 0C5.15753 0 5.33904 0 5.52397 0C5.74657 0.0376712 5.9726 0.0616438 6.1952 0.116438C7.99315 0.541096 9.29794 2.14726 9.32877 3.99658C9.33562 4.36644 9.33219 4.7363 9.33562 5.10274C9.33562 5.15068 9.33904 5.19863 9.34246 5.25C9.60959 5.25 9.85959 5.25 10.1096 5.25C10.4041 5.25 10.5034 5.34932 10.5034 5.64384C10.5034 8.0137 10.5034 10.3836 10.5034 12.7534C10.5034 13.5068 10.0068 14 9.25342 14C6.58904 14 3.92123 14 1.25685 14C0.496575 14 0 13.5068 0 12.7534C0 10.3836 0 8.0137 0 5.64384C0 5.34932 0.099315 5.25 0.393836 5.25C0.64726 5.25 0.900685 5.25 1.16781 5.25C1.16781 4.88014 1.17123 4.5274 1.16781 4.17123C1.16096 3.47603 1.30479 2.81507 1.63356 2.19863C2.18493 1.17466 3.01712 0.486301 4.13699 0.164384C4.40753 0.0856164 4.69521 0.0547945 4.97603 0ZM7.57877 5.24658C7.57877 4.82534 7.58562 4.41438 7.57877 4.00685C7.57192 3.50685 7.41096 3.05479 7.09931 2.66781C6.51027 1.93493 5.7363 1.61986 4.81164 1.80137C3.87671 1.98288 3.26712 2.56507 3.00342 3.48288C2.84247 4.05137 2.93836 4.64384 2.92466 5.2226C2.92466 5.22945 2.93493 5.2363 2.94521 5.24658C4.47945 5.24658 6.02055 5.24658 7.57877 5.24658ZM5.2363 11.6678C5.41781 11.6678 5.59931 11.6712 5.78425 11.6678C6.03082 11.661 6.14726 11.5205 6.11986 11.2774C6.06164 10.774 6.00685 10.274 5.95548 9.77055C5.95205 9.72945 5.9726 9.67123 6.00342 9.64384C6.31507 9.36644 6.44863 9.0274 6.40753 8.60959C6.34247 7.94521 5.63699 7.44521 4.98973 7.61986C4.5274 7.74315 4.2226 8.0411 4.11986 8.50342C4.02055 8.94521 4.15411 9.32877 4.49657 9.63699C4.53082 9.66781 4.55479 9.7363 4.55137 9.78425C4.5 10.2808 4.44521 10.7808 4.38699 11.2774C4.35959 11.524 4.47603 11.661 4.7226 11.6678C4.89041 11.6712 5.06507 11.6678 5.2363 11.6678Z" fill="#F0F0F0"/>
        </svg>
      </div>
      <img src="./unlocked.png" alt="Locked Feature" />
    </div>
  </div>`;

// new updated div
const mainDiv = document.createElement('div');

let jobDetail;
let headers;
let isLoggedIn = false;
let token;
let personaId;
let isDropDownAdded = false;
let isProposalButtonAdded = false;
let isFinalProposalButtonAdded = false;
let proposalLogId;
let proposalData;
let proposalText;
let collectorTextArea;
let collectorArea;
let loaderDiv;
let contentLeft;
let personaIcon;

const saveProposal = async (key) => {
	try {
		const response = await fetch(SAVE_PROPOSAL(key), {
			method: 'PUT',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user_final_text: proposalText }),
		});
		return response;
	} catch (error) {
		alert(`Something went wrong`);
	}
};

const fetchPersonas = async () => {
	const response = await fetch(PERSONA_TEMPLATES_URL, {
		headers: {
			authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});

	return response;
};

const getProposal = async () => {
	try {
		const response = await fetch(WRITE_PROPOSAL_URL(personaId), {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(jobDetail),
		});
		return response;
	} catch (error) {
		proposalButton.classList.remove('proposal-button--loading');
	}
};

const getHeaders = async () => {
	const cookie = await chrome.storage.local.get('cookieData');
	return cookie.cookieData;
};

const fetchClientReviews = async (key, headers) => {
	const response = fetch(FETCH_CLIENT_REVIEWS(key), {
		headers: headers,
	});
	return response;
};

const fetchJobDetails = async (key, headers) => {
	const response = fetch(FETCH_JOB_DETAILS(key), {
		headers: headers,
	});
	return response;
};

const showToast = (message) => {
	const toast = document.createElement('div');
	toast.classList.add('toast');
	toast.textContent = message;
	document.body.appendChild(toast);

	setTimeout(() => {
		toast.classList.add('show');
	}, 100);

	setTimeout(() => {
		toast.classList.remove('show');
		setTimeout(() => {
			toast.remove();
		}, 300);
	}, 3000);
};

const handleSendConnectsButton = () => {
	const sendConnectsButton = document.querySelector('div[data-v-00e19389] button.up-btn-primary');
	sendConnectsButton.addEventListener('click', async () => {
		if (proposalData) {
			const saveProposalResponse = await saveProposal(proposalLogId);
			if (saveProposalResponse?.ok) {
				showToast('Saved Successfully');
			}
		}
	});
};

linkButton.addEventListener('click', () => {
	chrome.runtime.sendMessage({ type: 'openPopup' });
});

const addLoginButtonDiv = (removeDiv) => {
	proposalButton.textContent = '⚡️ Write Proposal';
	proposalButton.disabled = true;
	loginDiv.innerHTML = loginElements;
	linkButton.textContent = 'here.';
	linkButton.style.cursor = 'pointer';
	linkButton.style.color = '#18DC14';
	loginDiv.classList.add('login-div');
	loginDiv.append(linkButton);
	loginDiv.id = `login-div-id`;
	removeDiv.remove();
	contentLeft.append(loginDiv);
}

proposalButton.addEventListener('click', () => {
	const image = document.createElement('img');
  image.src = personaIcon;
  image.alt = 'persona-Image';
	image.classList.add('avatar-button-size');
  const text = document.createTextNode('Typing.....');
  proposalButton.innerHTML = '';

  proposalButton.appendChild(image);
  proposalButton.appendChild(text);
	chrome.storage.local.get(['isLogIn', 'accessToken'], async (data) => {
		if (data?.isLogIn) {
			const proposalResponse = await getProposal();
			proposalData = await proposalResponse.json();
			if (proposalResponse?.ok) {
				proposalButton.textContent = '⚡️ Write Proposal';
				chrome.runtime.sendMessage({ type: 'getCredits', remainingCredits: proposalData?.remaining_credits });
				collectorTextArea.value = proposalData.proposal_text;
				proposalLogId = proposalData.proposal_log_id;
				collectorTextArea.dispatchEvent(new Event('input', { bubbles: true }));
				collectorTextArea.blur();
				collectorTextArea.focus();
			} else {
				if (proposalResponse?.status == 401) {
					chrome.storage.local.set({ isLogIn: false, accessToken: null });
					addLoginButtonDiv(NewCreatedDiv);

				} else {
					proposalButton.textContent = '⚡️ Write Proposal';
					showErrorSpan.classList.add('error-message');
					showErrorSpan.textContent = JSON.stringify(proposalData);
					collectorArea.append(showErrorSpan);
				}
			}
		}
	});
});

const debounce = (func, wait) => {
	let timeout;
	return (...args) => {
		const context = this;
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(context, args), wait);
	};
};

const extractKeyFromURL = (givenURL) => {
	const jobIdentifier = givenURL.match(/~[^/]+/);
	return jobIdentifier ? jobIdentifier[0] : null;
};

const addEventListenerOnPersonas = () => {
	const mainDiv = document.querySelector('.features');
	const childDiv = mainDiv.querySelectorAll('.unlocked-feature');
	let button = collectorArea.querySelector('.proposal-button');

	childDiv.forEach((mainDivSelector) => {
		mainDivSelector.addEventListener('click', () => {
			childDiv.forEach(function (child) {
				child.classList.remove('active');
			});

			if (!!mainDivSelector.classList.contains('active')) {
				mainDivSelector.classList.remove('active');
			} else {
				mainDivSelector.classList.add('active');
				const imageElement = mainDivSelector.querySelector('.avatar-size');
				personaIcon = imageElement.src;
				personaId = mainDivSelector.dataset.id;

				button.disabled = false;
			}
		});
	});
};

const addPowerToolDesign = (personasList) => {
	return new Promise((resolve) => {
		let createdString = personasList
			?.map((list) => {
				if (list?.can_write) {
					return `<div class="unlocked-feature" id=${list?.id}-image data-id=${list?.id}>
     <img src=${list?.profile_image} class='avatar-size' alt="Unlocked Feature" />
     <div class="feature-details-container">
       <div class="feature-details">
         <div class="feature-type">
           <h3>${list?.num_credits_per_usage} credit</h3>
           <p>Per Proposal</p>
         </div>
         <div></div>
         <div class="feature-description">
           <div class="persona">
             <div>
               <img src=${list?.profile_image} class='popup-image' alt="Persona" />
             </div>
             <div class="persona-detials">
               <h4>${list?.name}</h4>
               <p>
                 ${list?.description}
               </p>
             </div>
           </div>
           <div class="persona-skills">
             <p class="skill-name">Vocabulary</p>
             <div class="skills-list">
             ${[1, 2, 3]
								.map(
									(vocabularyList) =>
										`<div class="skill ${vocabularyList <= list?.vocabulary_score ? 'active' : ''}"></div>`
								)
								.join('')}
             </div>
           </div>
           <div class="persona-skills">
             <p class="skill-name">Skills</p>
             <div class="skills-list">
               ${[1, 2, 3]
									.map((skillList) => `<div class="skill ${skillList <= list?.skills_score ? 'active' : ''}"></div>`)
									.join('')}
              
             </div>
           </div>
           <div class="persona-skills">
             <p class="skill-name">Experience</p>
             <div class="skills-list">
             ${[1, 2, 3]
								.map(
									(experienceList) =>
										`<div class="skill ${experienceList <= list?.experience_score ? 'active' : ''}"></div>`
								)
								.join('')}
             </div>
           </div>
         </div>
       </div>
     </div>
    </div>`;
				} else {
					return `<div class="locked-feature">
            <div class="locked-overlay">
              <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.97603 0C5.15753 0 5.33904 0 5.52397 0C5.74657 0.0376712 5.9726 0.0616438 6.1952 0.116438C7.99315 0.541096 9.29794 2.14726 9.32877 3.99658C9.33562 4.36644 9.33219 4.7363 9.33562 5.10274C9.33562 5.15068 9.33904 5.19863 9.34246 5.25C9.60959 5.25 9.85959 5.25 10.1096 5.25C10.4041 5.25 10.5034 5.34932 10.5034 5.64384C10.5034 8.0137 10.5034 10.3836 10.5034 12.7534C10.5034 13.5068 10.0068 14 9.25342 14C6.58904 14 3.92123 14 1.25685 14C0.496575 14 0 13.5068 0 12.7534C0 10.3836 0 8.0137 0 5.64384C0 5.34932 0.099315 5.25 0.393836 5.25C0.64726 5.25 0.900685 5.25 1.16781 5.25C1.16781 4.88014 1.17123 4.5274 1.16781 4.17123C1.16096 3.47603 1.30479 2.81507 1.63356 2.19863C2.18493 1.17466 3.01712 0.486301 4.13699 0.164384C4.40753 0.0856164 4.69521 0.0547945 4.97603 0ZM7.57877 5.24658C7.57877 4.82534 7.58562 4.41438 7.57877 4.00685C7.57192 3.50685 7.41096 3.05479 7.09931 2.66781C6.51027 1.93493 5.7363 1.61986 4.81164 1.80137C3.87671 1.98288 3.26712 2.56507 3.00342 3.48288C2.84247 4.05137 2.93836 4.64384 2.92466 5.2226C2.92466 5.22945 2.93493 5.2363 2.94521 5.24658C4.47945 5.24658 6.02055 5.24658 7.57877 5.24658ZM5.2363 11.6678C5.41781 11.6678 5.59931 11.6712 5.78425 11.6678C6.03082 11.661 6.14726 11.5205 6.11986 11.2774C6.06164 10.774 6.00685 10.274 5.95548 9.77055C5.95205 9.72945 5.9726 9.67123 6.00342 9.64384C6.31507 9.36644 6.44863 9.0274 6.40753 8.60959C6.34247 7.94521 5.63699 7.44521 4.98973 7.61986C4.5274 7.74315 4.2226 8.0411 4.11986 8.50342C4.02055 8.94521 4.15411 9.32877 4.49657 9.63699C4.53082 9.66781 4.55479 9.7363 4.55137 9.78425C4.5 10.2808 4.44521 10.7808 4.38699 11.2774C4.35959 11.524 4.47603 11.661 4.7226 11.6678C4.89041 11.6712 5.06507 11.6678 5.2363 11.6678Z" fill="#F0F0F0"/>
              </svg>
            </div>
            <img src=${list?.profile_image} class='avatar-size' alt="Locked Feature" />
          </div>`;
				}
			})
			.join('');

		NewCreatedDiv.classList.add('features');
		NewCreatedDiv.innerHTML = createdString;

		loaderDiv.remove();
		contentLeft.append(NewCreatedDiv);

		resolve(true);
	});
};

const injectProposalDesign = async () => {
	const identifier = extractKeyFromURL(document.URL);
	loaderDiv = document.querySelector('#loader');
	contentLeft = document.querySelector('#content-left');
	headers = await getHeaders();
	chrome.storage.local.get(['isLogIn', 'accessToken'], async (data) => {
		isLoggedIn = data?.isLogIn;
		token = data?.accessToken;
		if (isLoggedIn) {
			const response = await fetchPersonas();
			const jobData = await fetchJobDetails(identifier, headers);
			const clientReviews = await fetchClientReviews(identifier, headers);

			if (response?.ok && jobData?.ok && clientReviews?.ok) {
				const personasList = await response.json();
				const jobDetailsData = await jobData.json();
				const clientReviewData = await clientReviews.json();
				jobDetail = {
					...jobDetailsData,
					reviews: clientReviewData?.workHistory,
				};
				isDropDownAdded = await addPowerToolDesign(personasList);
			} 
			else {
				addLoginButtonDiv(loaderDiv);
			}

		} else {
			  addLoginButtonDiv(loaderDiv);
		}
	});
};

const addLoader = debounce(() => {
	const identifier = extractKeyFromURL(document.URL);
	if (collectorArea && !collectorArea?.querySelector(`[id="${identifier}-main-div"]`)) {
		proposalButton.classList.add('content-right');
		proposalButton.classList.add('proposal-button');
		proposalButton.textContent = '⚡️ Write Proposal';
		proposalButton.disabled = true;
		mainDiv.id = `${identifier}-main-div`;
		mainDiv.innerHTML = dataDiv;
		mainDiv.classList.add('main-container');
		mainDiv.append(proposalButton);

		collectorArea.appendChild(mainDiv);
		if (!isDropDownAdded && !isProposalButtonAdded) {
			injectProposalDesign();
		}
	}
}, 200);

const handleMutations = async () => {
	const isUserLogin = chrome.storage.local.get('isUserLogin');
	if (!isUserLogin) return;

	collectorArea = document.querySelector('.cover-letter-area');
	const sendConnectsButton = document.querySelector('div[data-v-00e19389] button.up-btn-primary');
	const getFeaturesDiv = document.querySelector('.features');
	if (collectorArea) {
		collectorTextArea = document.querySelector('.cover-letter-area textarea');
		addLoader();
	}
	if (sendConnectsButton) {
		handleSendConnectsButton();
	}
	if (getFeaturesDiv) {
		addEventListenerOnPersonas();
		observer.disconnect();
	}
};

const observer = new MutationObserver(handleMutations);
observer.observe(document, { childList: true, subtree: true });
