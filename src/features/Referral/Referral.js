import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Grid,
} from '@mui/material';
import ErrorDialog from '../Jobs/ErrorDialog';
import SvgCopySvg from '../../../src/assets/svgs/components/copy-svg';

const Referral = () => {
  const [open, setOpen] = useState(false);
  const [showReferral, setShowReferral] = useState();
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const accessToken = localStorage.getItem('accessToken');
  const referralCode = localStorage.getItem('referralCode');

  useEffect(() => {
    if (!!accessToken) {
      setShowReferral(true);
      setShowErrorMessage(false);
    } else {
      setShowReferral(false);
      setShowErrorMessage(true);
    }
  }, []);

  const handleCopy = () => {
    var copyText = document.getElementById('referralCodeText');
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return showReferral ? (
    <Grid sx={{ padding: '0 60px' }}>
      <Grid sx={{ marginTop: '50px' }}>
        <Grid sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Typography
            variant="h1"
            color="initial"
            sx={{ fontSize: '30px', fontWeight: '700', lineHeight: '23px' }}
          >
            Referral
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontSize: '14px', fontWeight: '400', lineHeight: '21px' }}
          >
            Share your referral code with your friends and get 5 free credits on every sign up.
          </Typography>
        </Grid>

        <TextField
          variant="outlined"
          value={referralCode}
          id="referralCodeText"
          label="Referral Code"
          sx={(theme) => ({
            borderColor: theme.palette.universalWhite.main,
            marginTop: '24px',
            width: '436px',
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleCopy}>
                  <SvgCopySvg />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'down',
          horizontal: 'center',
        }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Referral Code is Copied
        </Alert>
      </Snackbar>
    </Grid>
  ) : showErrorMessage && (
    <ErrorDialog
      text={'Please Login in order to view referral code'}
      buttonText={'Login'}
      navigationUrl={'/sign-in'}
      openWindowInNewTab={false}
    />
  );
};

export default Referral;
