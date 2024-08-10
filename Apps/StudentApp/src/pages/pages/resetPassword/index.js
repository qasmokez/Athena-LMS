// ** React Imports
import { useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'
import axios from 'axios'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const ResetPasswordPage = () => {
  const [values, setValues] = useState({
    securityAnswer: '',
    newPassword: '',
    confirmPassword: '',
    errorMessage: '',
  });

  // ** Hook
  const router = useRouter()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  /* To be implemented later
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (values.newPassword !== values.confirmPassword) {
      setValues({ ...values, errorMessage: 'Passwords do not match' });
      return;
    }
    try {
      // Replace with actual API call to reset password
      await axios.post('http://localhost:3010/v0/reset-password', {
        securityAnswer: values.securityAnswer,
        newPassword: values.newPassword,
      });
      router.push('/login'); // Redirect to login page after successful reset
    } catch (error) {
      console.log(error);
      setValues({ ...values, errorMessage: 'Error resetting password. Please try again.' });
    }
  };
  */

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src='/images/athena.png' width={35} height={35} />
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              重置密码
            </Typography>
            <Typography variant='body2'>请回答安全保护问题以继续</Typography>
          </Box>
          {/* Replace onSubmit={handleResetPassword */}
          <form noValidate autoComplete='off' >
            <FormControl fullWidth sx={{ marginBottom: 4 }}>
              <InputLabel htmlFor='security-question'>安全保护问题</InputLabel>
              <OutlinedInput
                label='Security Question'
                id='security-question'
                value="What is your mother's maiden name?" // Example security question
                readOnly
              />
            </FormControl>
            <TextField
              fullWidth
              id='security-answer'
              label='Security Answer'
              sx={{ marginBottom: 4 }}
              value={values.securityAnswer}
              onChange={handleChange('securityAnswer')}
            />
            <TextField
              fullWidth
              id='new-password'
              label='New Password'
              sx={{ marginBottom: 4 }}
              type='password'
              value={values.newPassword}
              onChange={handleChange('newPassword')}
            />
            <TextField
              fullWidth
              id='confirm-password'
              label='Confirm Password'
              sx={{ marginBottom: 4 }}
              type='password'
              value={values.confirmPassword}
              onChange={handleChange('confirmPassword')}
            />
            {values.errorMessage && (
              <Typography color='error' variant='body2' sx={{ mt: 2 }}>
                {values.errorMessage}
              </Typography>
            )}
            <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }} type='submit'>
              重置密码
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  );
}

ResetPasswordPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ResetPasswordPage