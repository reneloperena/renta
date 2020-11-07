import withRoot from '../src/withRoot'
// --- Post bootstrap -----
import React from 'react'
import { Field, Form, FormSpy } from 'react-final-form'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Typography from '../components/Typography'
import AppFooter from '../views/AppFooter'
import AppAppBar from '../views/AppAppBar'
import AppForm from '../views/AppForm'
import { email, required } from '../components/form/validation'
import RFTextField from '../components/form/RFTextField'
import FormButton from '../components/form/FormButton'
import FormFeedback from '../components/form/FormFeedback'
import hydraAdmin from '../src/hydra-client'

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6)
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  feedback: {
    marginTop: theme.spacing(2)
  }
}))

function SignIn (props) {
  const classes = useStyles()
  const [sent, setSent] = React.useState(false)

  const validate = (values) => {
    const errors = required(['email', 'password'], values)

    if (!errors.email) {
      const emailError = email(values.email, values)
      if (emailError) {
        errors.email = email(values.email, values)
      }
    }

    return errors
  }

  const handleSubmit = () => {
    setSent(true)
  }

  return (
    <>
      <AppAppBar />
      <AppForm>
        <>
          <Typography variant='h3' gutterBottom marked='center' align='center'>
            Sign In
          </Typography>
          <Typography variant='body2' align='center'>
            {'Not a member yet? '}
            <Link href='/premium-themes/onepirate/sign-up/' align='center' underline='always'>
              Sign Up here
            </Link>
          </Typography>
          <Typography variant='h3' gutterBottom marked='center' align='center'>
            {props.error}
          </Typography>
        </>
        <Form onSubmit={handleSubmit} subscription={{ submitting: true }} validate={validate}>
          {({ handleSubmit2, submitting }) => (
            <form onSubmit={handleSubmit2} className={classes.form} noValidate>
              <Field
                autoComplete='email'
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label='Email'
                margin='normal'
                name='email'
                required
                size='large'
              />
              <Field
                fullWidth
                size='large'
                component={RFTextField}
                disabled={submitting || sent}
                required
                name='password'
                autoComplete='current-password'
                label='Password'
                type='password'
                margin='normal'
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback className={classes.feedback} error>
                      {submitError}
                    </FormFeedback>
                  ) : null}
              </FormSpy>
              <FormButton
                className={classes.button}
                disabled={submitting || sent}
                size='large'
                color='secondary'
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign In'}
              </FormButton>
            </form>
          )}
        </Form>
        <Typography align='center'>
          <Link underline='always' href='/premium-themes/onepirate/forgot-password/'>
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
      <AppFooter />
    </>
  )
}

async function get ({ query, res }) {
  const { login_challenge: loginChallenge } = query

  const challenge = String(loginChallenge)

  const { body } = await hydraAdmin.getLoginRequest(challenge)

  if (body.skip) {
    const { body: bodyAfterSkip } = await hydraAdmin.acceptLoginRequest(challenge, { subject: String(body.subject) })
    res.redirect(302, bodyAfterSkip.redirectTo)
    res.end()
  }

  return {
    props: {} // will be passed to the page component as props
  }
}

async function post ({ query, req, res }) {
  // The challenge is now a hidden input field, so let's take it from the request body instead
  const challenge = req.body.challenge
  if (!(req.body.email === 'foo@bar.com' && req.body.password === 'foobar')) {
    return {
      props: {
        error: 'The username / password combination is not correct'
      }
    }
  }
  const { body } = await hydraAdmin.acceptLoginRequest(challenge, {
    // Subject is an alias for user ID. A subject can be a random string, a UUID, an email address, ....
    subject: 'foo@bar.com',
    remember: Boolean(req.body.remember),
    rememberFor: 3600
    // Sets which "level" (e.g. 2-factor authentication) of authentication the user has. The value is really arbitrary
    // and optional. In the context of OpenID Connect, a value of 0 indicates the lowest authorization level.
    // acr: '0',
  })
  res.redirect(String(body.redirectTo))
  res.end()
}

export async function getServerSideProps (ctx) {
  return ctx.req.method === 'POST' ? post(ctx) : get(ctx)
}

export default withRoot(SignIn)
