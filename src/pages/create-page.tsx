import { Box, Flex } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ContainedButton, FormSuccessMessage, InputField, Layout } from 'src/components'
import { useCreatePageMutation } from 'src/generated/graphql'
import { useIsAuth } from 'src/hooks'
import { formErrorMessage } from 'src/styles'
import { createURQLClient, extractServerMessage, toErrorMap } from 'src/utils'

interface CreatePageProps {

}

const CreatePage: NextPage<CreatePageProps> = () => {
  useIsAuth(true)
  const router = useRouter()
  const [, createPage] = useCreatePageMutation()
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
        <title>Create Page | Comroots</title>
        <meta property='og:title' content='Create Page | Comroots' key='title' />
        <meta name='description' content='Create Page'/>
      </Head>
      <Layout>
        <Formik
          initialValues={{ pageName: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await createPage(values)
            if (response.data?.createPage?.errors) {
              setErrors(toErrorMap(response.data.createPage.errors))
            }
            else {
              if (response?.error) {
                setErrorMessage(extractServerMessage(response.error.message))
              }
              else {
                setShowSuccessMessage(true)
                setTimeout(() => {
                  router.push(`/p/${response.data.createPage.page.pageName}`)
                }, 3050)
              }
            }
          }}
        >
          {({ isSubmitting }) =>
            <Form onChange={() => { setErrorMessage('') }}>
              <Box w='full' p='10' bgColor='white' shadow='lg' mb='4'>
                <InputField name='pageName' label="Page's name" placeholder="enter name in p/[name]" />
                {
                  showSuccessMessage &&
                  <FormSuccessMessage message={`Page created successfully. Redirecting to page in ${redirectCount}`} />
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
                    Create Page
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

export default withUrqlClient(createURQLClient)(CreatePage)