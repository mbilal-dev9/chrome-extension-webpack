import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { UseSignUP } from './hooks/UseSignUp';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { formik } = UseSignUP();
  const navigate = useNavigate();

  return (
    <Container component='main' 
    sx={{
      height: 'calc(100vh - 130px)',
      overflowY:'scroll',
      margin:'0',
      padding:'0 !important',
      maxWidth:'unset !important',
    }}>
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '600px',
          margin:'64px auto 20px',
        }}
      >
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
        <Box
          component='form'
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='first_name'
            label='First Name'
            autoFocus
            value={formik.values.first_name}
            onChange={formik.handleChange}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='last_name'
            label='Last Name'
            autoFocus
            value={formik.values.last_name}
            onChange={formik.handleChange}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Email Address'
            name='username'
            autoFocus
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            autoComplete='current-password'
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            label='Confirm Password'
            type='password'
            id='confirm_password'
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            autoComplete='current-password'
            error={
              formik.touched.confirm_password &&
              Boolean(formik.errors.confirm_password)
            }
            helperText={
              formik.touched.confirm_password && formik.errors.confirm_password
            }
          />
          <TextField
            margin='normal'
            fullWidth
            type='text'
            label='Referral Code (Optional)'
            id='affiliate_code'
            value={formik.values.affiliate_code}
            onChange={formik.handleChange}
            error={
              formik.touched.affiliate_code &&
              Boolean(formik.errors.affiliate_code)
            }
            helperText={
              formik.touched.affiliate_code && formik.errors.affiliate_code
            }
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href='popup.html#/sign-in' variant='body2'>
                {'Already have an account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default SignUp;
