import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, IconButton } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import router from 'next/router'
import { useEffect, useState } from 'react'
import { ContainedButton, FormSuccessMessage, InputField, Layout } from 'src/components'
import { useUpdatePageInfoMutation } from 'src/generated/graphql'
import { useCheckPageOwnership, useIsAuth } from 'src/hooks'
import { useGetPageFromURL } from 'src/hooks/useGetPageFromURL'
import { createURQLClient } from 'src/utils'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface EditPageProps {

}

const EditPage: NextPage<EditPageProps> = () => {
  useIsAuth(true)
  const [{ data, fetching }] = useGetPageFromURL()
  const [, updateInfo] = useUpdatePageInfoMutation()
  const checkPageOwnership = useCheckPageOwnership()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    if (showSuccessMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    }
  }, [showSuccessMessage])

  let returnValue

  if (fetching) {
    returnValue = <>Loading...</>
  }

  else if (!checkPageOwnership(data?.page?.id)) {
    returnValue = <>You do not have permission to edit this page.</>
  }

  else {
    returnValue =
      <Layout variant='regular'>
        <Box w='full' p='10' bgColor='white' shadow='lg' mb='4'>
          <Formik
            initialValues={{
              fullPageName: data?.page?.fullPageName,
              headline: data?.page?.headline,
              address: data?.page?.address,
              about: data?.page?.about
            }}
            onSubmit={async (values) => {
              const { error } = await updateInfo({ id: data?.page?.id, input: values })
              setShowSuccessMessage(true)
            }}
          >
            {({ isSubmitting, initialValues, values }) =>
              <Form
                onChange={() => {
                  setShowSuccessMessage(false)
                }}
              >
                <InputField name='fullPageName' placeholder='full name of your page' label='Full Name' />
                <Box mt={4}>
                  <InputField name='headline' placeholder='a short sentence about your page' label='Headline' />
                </Box>
                <Box mt={4}>
                  <InputField name='address' label='Address' />
                </Box>
                <Box mt={4}>
                  <InputField name='about' placeholder='A full introduction about your page' label='' inputType='quill' />
                </Box>
                {
                  showSuccessMessage &&
                  <FormSuccessMessage message='Page edited successfully.' />
                }
                <Flex mt={6} alignItems='center' justifyContent='space-between'>
                  <IconButton
                    aria-label='back'
                    icon={<ArrowBackIcon />}
                    onClick={() => { router.back() }}
                  />
                  <ContainedButton
                    type='submit'
                    isLoading={isSubmitting}
                    disabled={initialValues == values}
                    ml='34.69px'
                    baseColorLevel={500}
                  >
                    Save
                  </ContainedButton>
                  <Button
                    onClick={() => { router.push(`/p/${data?.page?.pageName}`) }}
                  >
                    Go to Page
                  </Button>
                </Flex>
              </Form>
            }
          </Formik>
        </Box>
      </Layout>
  }

  return (
    <>
      <Head>
        <title>Edit Page | Comroots</title>
        <meta property='og:title' content='Edit Page | Comroots' key='title' />
        <meta name='description' content='Edit Page' />
      </Head>
      {returnValue}
    </>
  )
}

export default withUrqlClient(createURQLClient)(EditPage)