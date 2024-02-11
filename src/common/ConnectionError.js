import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
// import SvgConnectionLostSvg from '../../src/pages/assets/svgs/components/connection-lost-svg';
import { Box } from '@mui/system';

function ConnectionError() {
  return (
    <Grid
      className="connection-error"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '40px',
        height: '100%',
      }}
    >
      <SvgConnectionLostSvg />
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{ fontSize: '32px', fontWeight: '500', lineHeight: '20px' }}
        >
          Connection Lost
        </Typography>
        <Typography
          sx={{ fontSize: '20px', fontWeight: '400', lineHeight: '20px' }}
        >
          You don’t have internet connection
        </Typography>
      </Grid>
      <Button
        sx={(theme) => ({
          backgroundColor: theme.palette.success.main,
          color: theme.palette.universalWhite.main,
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '20px',
          padding: '10px 49.5px',
          borderRadius: '100px',
        })}
      >
        Try Again
      </Button>
    </Grid>
  );
}

export default ConnectionError;
