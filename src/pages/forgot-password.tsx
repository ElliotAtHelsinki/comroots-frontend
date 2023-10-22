import { Box, Flex } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import { useState } from 'react'
import { ContainedButton, InputField, Wrapper } from 'src/components'
import { useForgotPasswordMutation } from 'src/generated/graphql'
import { createURQLClient, toErrorMap } from 'src/utils'

interface ForgotPasswordProps {

}

const ForgotPassword: NextPage<ForgotPasswordProps> = () => {
  const [, forgotPassword] = useForgotPasswordMutation()
  const [submittedMail, setSubmittedMail] = useState('')
  const [sentMail, setSentMail] = useState(false)

  return (
    <>
      <Head>
        <title>Forgot Password | Comroots</title>
        <meta property='og:title' content='Forgot Password | Comroots' key='title' />
        <meta name='description' content='Forgot Password' />
      </Head>
      <Wrapper variant='small'>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await forgotPassword(values)
            if (response.data?.forgotPassword.errors) {
              setErrors(toErrorMap(response.data.forgotPassword.errors))
            }
            else if (response.data?.forgotPassword.success) {
              setSubmittedMail(values.email)
              setSentMail(true)
            }
          }}
        >
          {({ isSubmitting }) =>
            sentMail ?
              <Box color='#22C55E' mt='calc(1rem - 50px)' fontSize='0.875rem'>
                If an account associated with {submittedMail} exists in our database, we have sent to the address an email containing a link to reset your password.
              </Box>
              :
              <Form>
                <Box w='full' h='full' mt='calc(1rem - 50px)'>
                  <InputField name='email' placeholder='email' label='Email' />
                  <Flex justify='center' w='full'>
                    <ContainedButton
                      type='submit'
                      isLoading={isSubmitting}
                      mt={4}
                    >
                      Reset Password
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

export default withUrqlClient(createURQLClient, { ssr: false })(ForgotPassword)