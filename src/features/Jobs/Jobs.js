/*global chrome*/
import { useEffect, useState } from 'react';
import { CircularProgress, Grid } from '@mui/material';
import ErrorDialog from './ErrorDialog';
import mixpanel from 'mixpanel-browser';
import { mixpanelConstants } from '../../utils/mixpanelConstants';
import JobsTable from './JobsTable';

const Jobs = () => {
  const [jobDetails, setJobDetails] = useState();
  const [isUserLogin, setIsUserLogin] = useState(true);
  const [isLoading, setIsLoading] = useState();
  const [noInternet, setNoInternet] = useState(false);

  const registerJobsMessageListeners = () => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.type === 'newJobs') setJobDetails(request?.newJobs);
      if (request.type === 'userLogged') setIsUserLogin(request?.isUserLogin);
      if (request.type === 'noInternet') setNoInternet(true);
    });
  };

  const sendRequestToFetchJobs = () => {
    chrome.runtime.sendMessage({ type: 'getJobDetails' }, (response) => {
      setJobDetails(response?.data);
      setIsLoading(false);
    });
  };

  const setUserLogin = async () => {
    const isLogin = await chrome.storage.local.get('isUserLogin');
    setIsUserLogin(isLogin?.isUserLogin);
  };

  const getJobsForFirstTime = () => {
    chrome.storage.local.get(['isFirstTime', 'isUserLogin'], (data) => {
      setIsLoading(true);
      if (data?.isFirstTime) {
        const timer = setTimeout(() => {
          sendRequestToFetchJobs()
          chrome.storage.local.set({ isFirstTime: false });
        }, 3000);
        return () => clearTimeout(timer);
      } else {
        sendRequestToFetchJobs();
      }
    });
  };

  useEffect(() => {
    getJobsForFirstTime();
    registerJobsMessageListeners();
    setUserLogin();
  }, []);

  const handleRequest = (key) => {
    mixpanel.track(mixpanelConstants?.JOB_CLICK, {
      job_link: `https://www.upwork.com/ab/proposals/job/${key}/apply/`,
    });
    window.open(
      `https://www.upwork.com/ab/proposals/job/${key}/apply/`,
      '_blank'
    );
    const updatedList = jobDetails.map((item) => {
      if (item?.ciphertext === key) {
        return { ...item, isRead: true };
      }
      return item;
    });

    setJobDetails(updatedList);
  };

  return (
    <>
      {noInternet ? (
        <ErrorDialog
          text={'No internet'}
          buttonText={'Login to Upwork'}
          navigationUrl={''}
          openWindowInNewTab={true}
        />
      ) : (
        <Grid sx={{ marginTop: '60px', height: 'calc(100vh - 180px)',
      }}>
          {isLoading ? (
            <CircularProgress
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
              }}
            />
          ) : (
            <>
              {!isUserLogin ? (
                <ErrorDialog
                  text={
                    "We can't fetch new jobs because you are logged out of Upwork"
                  }
                  buttonText={'Login to Upwork'}
                  navigationUrl={'https://www.upwork.com/'}
                  openWindowInNewTab={true}
                />
              ) : (
                !!jobDetails && (
                  <JobsTable items={jobDetails} handleRequest={handleRequest} />
                )
              )}
            </>
          )}
        </Grid>
      )}
    </>
  );
};

export default Jobs;
