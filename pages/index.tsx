import { HeadSeo } from '@src/components'
import { AppContext } from '@src/contexts/AppContext'
import { signInMetadata, siteMetadata } from '@src/data/Metadata'
import { emailValidation, isValidEmail, isValidPassword, passwordValidation } from '@src/functions'
import AuthLayout from '@src/layouts/AuthLayout'
import Link from 'next/link'
import React, { ReactElement } from 'react'

type Body = { email: string, password: string };

const SignInPage = () => {

  const { isLoading, handleSignin, onEmailKeyPress, onPasswordKeyPress } = React.useContext(AppContext);
  const [errors, setErrors] = React.useState({ email: '', password: '' });
  const [body, setBody] = React.useState<Body>({ email: '', password: '' });

  const emailField = React.useRef(null);
  const passwordField = React.useRef(null);

  const emailErrorMessage = 'Veuillez saisir une adresse e-mail valide';
  const pwdErrorMessage = 'Votre Password doit avoir au moins une lettre majuscule et minuscule, un chiffre, un caractère spécial et un total de 8 caractères ou plus.';

  return (
    <React.Fragment>
      <HeadSeo
        title={signInMetadata.title}
        description={signInMetadata.description}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={"website"}
      />

      <div className='flex justify-center items-center min-h-[90vh]'>
        <div className='flex flex-col justify-between m-5 sm:m-10 w-[600px] h-[350px] sm:h-[450px] sm:shadow-default rounded bg-white'>
          <div className='border-b p-3 sm:p-7 text-center'>
            <h1 className='text-2xl sm:text-4xl'>Log in</h1>
          </div>
          <div className='px-5 sm:px-36 py-5'>
            <form action="" className='flex flex-col gap-3'>
              <div className="relative">
                <input type='email' id="email"
                  ref={emailField}
                  onKeyDown={(e) => onEmailKeyPress(e, emailField, passwordField)}
                  onChange={(e) => {
                    setBody({ ...body, email: e.target.value });
                    emailValidation(e, setErrors, errors, emailErrorMessage);
                  }}
                  className={`block px-2 pb-2 pt-4 w-full text-base text-gray-900 bg-transparent rounded border-[1.5px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 ${!errors.email ? 'focus:border-vodafone' : 'focus:border-red-600'} peer`}
                  placeholder=" " autoComplete='off'
                />
                <label htmlFor='email'
                  className={`absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 ${errors.email ? 'peer-focus:text-red-600' : 'peer-focus:text-vodafone'} peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}>
                  Email address
                </label>
                {errors.email && <p className="mt-2 text-sm text-red-600 font-medium dark:text-red-500">
                  {errors.email}
                </p>}
              </div>
              <div className="relative">
                <input type='password' id="password"
                  ref={passwordField}
                  onKeyDown={(e) => onEmailKeyPress(e, emailField, passwordField)}
                  onChange={(e) => {
                    setBody({ ...body, password: e.target.value });
                    passwordValidation(e, setErrors, errors, pwdErrorMessage);
                  }}
                  className={`block px-2 pb-2 pt-4 w-full text-base text-gray-900 bg-transparent rounded border-[1.5px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 ${!errors.password ? 'focus:border-vodafone' : 'focus:border-red-600'} peer`}
                  placeholder=" " autoComplete='off'
                />
                <label htmlFor='password'
                  className={`absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 ${errors.password ? 'peer-focus:text-red-600' : 'peer-focus:text-vodafone'} peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}>
                  Password
                </label>
                {errors.password && <p className="mt-2 text-sm text-red-600 font-medium dark:text-red-500">
                  {errors.password}
                </p>}
              </div>
              <div className='flex'>
              <button
                  disabled={!isValidEmail(body.email) || !isValidPassword(body.password) || isLoading}
                  onClick={() => handleSignin(body.email, body.password)} type="button"
                  className="inline-flex items-center justify-center focus:outline-none text-white text-base bg-vodafone hover:bg-red-500 rounded text-center w-full py-2.5">
                  {isLoading ?
                    <span className='inline-flex items-center'>
                      <svg aria-hidden="true" role="status" className="inline mr-2 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                      </svg>
                      Connexion...
                    </span> : 'Connect'
                  }
                </button>
              </div>
            </form>
            <div className='flex flex-col sm:hidden mt-5 text-base text-center'>
            Don't have an account?
              <Link href={'/sign-up'} legacyBehavior><a className='text-vodafone'>Register</a></Link>
            </div>
          </div>
          <div className='border-t px-10 py-3 sm:py-5'>
            <p className='text-[13px] text-center'>
              <Link href='/forgot-password' legacyBehavior><a className='text-vodafone text-base'>Forgot your password</a></Link>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

SignInPage.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default SignInPage