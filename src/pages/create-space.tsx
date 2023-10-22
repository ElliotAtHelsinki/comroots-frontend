import { Box, Flex } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ContainedButton, FormSuccessMessage, InputField, Layout } from 'src/components'
import { useCreateSpaceMutation } from 'src/generated/graphql'
import { useIsAuth } from 'src/hooks'
import { formErrorMessage } from 'src/styles'
import { createURQLClient, extractServerMessage, toErrorMap } from 'src/utils'

interface CreateSpaceProps {

}

const CreateSpace: NextPage<CreateSpaceProps> = () => {
  useIsAuth(true)
  const router = useRouter()
  const [, createSpace] = useCreateSpaceMutation()
  const [redirectCount, setRedirectCount] = useState(3)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (showSuccessMessage) {
      setInterval(() => {
        setRedirectCount(count => count - 1)
      }, 1000)
    }
  }, [showSuccessMessage])

  return (
    <>
      <Head>
        <title>Create Space | Comroots</title>
        <meta property='og:title' content='Create Space | Comroots' key='title' />
        <meta name='description' content='Create Space'/> 
      </Head>
      <Layout>
        <Formik
          initialValues={{ spaceName: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await createSpace(values)
            if (response.data?.createSpace?.errors) {
              setErrors(toErrorMap(response.data.createSpace.errors))
            }
            else {
              if (response?.error) {
                setErrorMessage(extractServerMessage(response.error.message))
              }
              else {
                setShowSuccessMessage(true)
                setTimeout(() => {
                  router.push(`/s/${response.data.createSpace.space.spaceName}`)
                }, 3050)
              }
            }
          }}
        >
          {({ isSubmitting }) =>
            <Form onChange={() => { setErrorMessage('') }}>
              <Box w='full' p='10' bgColor='white' shadow='lg' mb='4'>
                <InputField name='spaceName' label="Space's name" placeholder="enter name in s/[name]" />
                {
                  showSuccessMessage &&
                  <FormSuccessMessage message={`Space created successfully. Redirecting to space in ${redirectCount}`} />
                }
                {
                  errorMessage &&
                  <Box style={formErrorMessage}>{errorMessage}</Box>
                }
                <Flex w='full' mt={6} justify='center'>
                  <ContainedButton
                    type='submit'
                    isLoading={isSubmitting}
                    baseColorLevel={500}
                  >
                    Create Space
                  </ContainedButton>
                </Flex>
              </Box>
            </Form>
          }
        </Formik>
      </Layout>
    </>
  )
}

export default withUrqlClient(createURQLClient)(CreateSpace)