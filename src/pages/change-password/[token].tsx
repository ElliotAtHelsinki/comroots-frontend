import { Box, Flex, Link } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ContainedButton, InputField, Wrapper } from 'src/components'
import { useChangePasswordMutation } from 'src/generated/graphql'
import { formErrorMessage } from 'src/styles'
import { createURQLClient, sleep, toErrorMap } from 'src/utils'

interface ChangePasswordProps {
  token: string
}

const ChangePassword: NextPage<ChangePasswordProps> = () => {
  const router = useRouter()
  const [, changePassword] = useChangePasswordMutation()
  const [tokenError, setTokenError] = useState('')
  const [resetted, setResetted] = useState(false)
  const [redirectAfter, setRedirectAfter] = useState(3)
  useEffect(() => {
    if (resetted) {
      setInterval(() => { setRedirectAfter(prev => prev - 1) }, 1000)
    }
  }, [resetted])
  return (
    <>
      <Head>
        <title>Change Password | Comroots</title>
        <meta property='og:title' content='Change Password | Comroots' key='title' />
        <meta name='description' content='Change Password' />
      </Head>
      <Wrapper variant='small'>
        <Formik
          initialValues={{ newPassword: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await changePassword({
              token: router.query.token as string,
              newPassword: values.newPassword
            })
            if (response.data?.changePassword.errors) {
              const errorMap = toErrorMap(response.data.changePassword.errors)
              if ('token' in errorMap) {
                setTokenError(errorMap.token)
              }
              setErrors(errorMap)
            }
            else if (response.data?.changePassword.user) {
              setResetted(true)
              await sleep(3000)

              router.push('/')
            }
          }}
        >
          {({ isSubmitting }) =>
            resetted ?
              <Box color='#22C55E' mt='calc(1rem - 50px)' fontSize='0.875rem'>
                Password reset successful. Redirecting to homepage in {redirectAfter}
              </Box>
              :
              <Form>
                <Box mt='calc(1rem - 50px)' w='full' h='full'>

                  <InputField name='newPassword' placeholder='new password' label='New Password' type='password' />
                  {
                    tokenError &&
                    <Flex>
                      <Box style={formErrorMessage} mr={1}>{tokenError}</Box>
                      {
                        tokenError == 'Token expired.' &&
                        <NextLink passHref href='/forgot-password'>
                          <Link style={formErrorMessage}>Get new token?</Link>
                        </NextLink>
                      }
                    </Flex>
                  }
                  <Flex justify='center' w='full'>
                    <ContainedButton
                      type='submit'
                      isLoading={isSubmitting}
                      mt={4}
                    >
                      Change Password
                    </ContainedButton>
                  </Flex>
                </Box>
              </Form>
          }
        </Formik>
      </Wrapper>
    </>
  )
}

export default withUrqlClient(createURQLClient)(ChangePassword)