import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { InputField } from 'src/components'
import { useRegisterMutation } from 'src/generated/graphql'
import { useCoordinates } from 'src/hooks'
import { createURQLClient, toErrorMap } from 'src/utils'

interface SignUpProps {

}

const SignUp: NextPage<SignUpProps> = () => {
  const coordinates = useCoordinates()
  const router = useRouter()
  const [, register] = useRegisterMutation()

  return (
    <>
      <Head>
        <title>Sign Up | Comroots</title>
        <meta property='og:title' content='Sign Up | Comroots' key='title' />
        <meta name='description' content='Sign Up' />
      </Head>
      <Flex justify='center' alignItems='center' minH='100vh' bgColor='#F3F2EF'>
        <Box w='400px' p='10' bgColor='white' shadow='lg' mb='4'>
          <Formik
            initialValues={{ email: '', username: '', password: '', location: coordinates }}
            onSubmit={async (values, { setErrors }) => {
              const response = await register(values)
              if (response.data?.register.errors) {
                setErrors(toErrorMap(response.data.register.errors))
              }
              else if (response.data?.register.user) {
                router.push('/')
              }
            }}
          >
            {({ isSubmitting }) =>
              <Form style={{ width: '100%' }}>
                <InputField name='email' placeholder='email' label='Email' />
                <Box mt={4} mb={4}>
                  <InputField name='username' placeholder='username' label='Username' />
                </Box>
                <InputField name='password' placeholder='password' label='Password' type='password' />
                <Flex mt={2} fontSize='0.875rem'>
                  <NextLink passHref href='/login'>
                    <Link>Already have an account? Login.</Link>
                  </NextLink>
                </Flex>
                <Button
                  type='submit'
                  isLoading={isSubmitting}
                  mt={4}
                  bgColor='green.500'
                  color='white'
                  w='full'
                >
                  Register
                </Button>
              </Form>
            }
          </Formik>
        </Box>
      </Flex>
    </>
  )
}

export default withUrqlClient(createURQLClient)(SignUp)