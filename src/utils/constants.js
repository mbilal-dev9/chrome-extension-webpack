/*global chrome*/
const UPWORK_URL = 'https://www.upwork.com/ab/proposals/job/*';
export const UNAUTHORIZED = 401;
export const SCORE_TITLE = 'This measure is computed from several factors including the total number of jobs completed, the count of active jobs, hire rate, feedback score, and the total amount spent.'


// export const manageUpworkPages = async () => {
// 	const tabs = await new Promise((resolve) => {
// 		chrome.tabs.query({ url: UPWORK_URL }, (tabs) => {
// 			resolve(tabs);
// 		});
// 	});
// 	for (let tab of tabs) {
// 		await new Promise((resolve) => {
// 			chrome.tabs.reload(tab?.id, { bypassCache: true }, () => {
// 				resolve();
// 			});
// 		});
// 	}
// };

const getProposalTabsList = async () => {
  return await chrome.tabs.query({ url: UPWORK_URL });
};

const reloadProposalTabs = async (proposalTabs) => {
  await Promise.all(proposalTabs.map(tab => {
    return new Promise((resolve) => {
      chrome.tabs.reload(tab.id, () => resolve());
    });
  }));
};

export const manageUpworkPages = () => {
  return new Promise(async (resolve) => {
    chrome.tabs.query({}, async (tabs) => {
      const proposalTabs = await getProposalTabsList();
      if (tabs[0].url.includes('upwork.com')) {
        chrome.tabs.reload();
        if (proposalTabs[0]?.id) {
          await reloadProposalTabs(proposalTabs);
        }
      } else {
        if (proposalTabs[0]?.id) {
          await reloadProposalTabs(proposalTabs);
        }
      }
      resolve();
    });
  });
};
