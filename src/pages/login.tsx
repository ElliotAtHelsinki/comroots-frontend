import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { InputField } from 'src/components'
import { useLoginMutation } from 'src/generated/graphql'
import { useCoordinates } from 'src/hooks'
import { createURQLClient, toErrorMap } from 'src/utils'

interface LoginProps {

}

const Login: NextPage<LoginProps> = () => {
  const coordinates = useCoordinates()
  const router = useRouter()
  const [, login] = useLoginMutation()

  return (
    <>
      <Head>
        <title>Login | Comroots</title>
        <meta property='og:title' content='Login | Comroots' key='title' />
        <meta name='description' content='Login' />
      </Head>
      <Flex w='100%' h='100vh' overflowX='hidden' bgColor='#F3F2EF' justify='space-evenly' alignItems='center'>
        <Flex flexDir='column' alignItems='center'>
          <Box fontWeight='semibold' fontSize='3.5rem' textColor='green.500'>Comroots</Box>
          <Box mt={2} maxW='30rem' ml={10} fontSize='1.3rem' fontWeight={500}>
            Comroots helps you find extracurricular activities like clubs,
            job offers, and internships
          </Box>
        </Flex>
        <Flex flexDir='column' w='22.5rem' p='8' bgColor='white' shadow='lg'>
          <Formik
            initialValues={{ emailOrUsername: '', password: '', location: coordinates }}
            onSubmit={async (values, { setErrors }) => {
              const response = await login(values)
              if (response.data?.login.errors) {
                setErrors(toErrorMap(response.data.login.errors))
              }
              else if (response.data?.login.user) {
                if (typeof router.query.next == 'string') {
                  router.push(router.query.next)
                }
                else {
                  router.push('/')
                }
              }
            }}
          >
            {({ isSubmitting }) =>
              <Form>
                <InputField name='emailOrUsername' placeholder='email or username' label='Email or Username' />
                <Box mt={4}>
                  <InputField name='password' placeholder='password' label='Password' type='password' />
                </Box>
                <Flex flexDir='column' mt={2} justify='space-between' fontSize='0.875rem'>
                  <NextLink passHref href='/forgot-password'>
                    <Link>Forgot password?</Link>
                  </NextLink>
                  <NextLink passHref href='/sign-up'>
                    <Link>Don&apos;t have an account yet? Sign up.</Link>
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
                  Login
                </Button>
              </Form>
            }
          </Formik>
        </Flex>
      </Flex>
    </>
  )
}

export default withUrqlClient(createURQLClient, { ssr: false })(Login)