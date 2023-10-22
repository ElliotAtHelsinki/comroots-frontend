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
import { useUpdateSpaceInfoMutation } from 'src/generated/graphql'
import { useIsAuth } from 'src/hooks'
import { useGetSpaceFromURL } from 'src/hooks/useGetSpaceFromURL'
import { createURQLClient } from 'src/utils'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface EditSpaceProps {

}

const EditSpace: NextPage<EditSpaceProps> = () => {
  useIsAuth(true)
  const [{ data, fetching }] = useGetSpaceFromURL()
  const [, updateInfo] = useUpdateSpaceInfoMutation()
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

  else if (!data?.space?.modStatus) {
    returnValue = <>You do not have permission to edit this space.</>
  }

  else {
    returnValue =
      <Layout variant='regular'>
        <Box w='full' p='10' bgColor='white' shadow='lg' mb='4'>
          <Formik
            initialValues={{
              fullSpaceName: data?.space?.fullSpaceName,
              headline: data?.space?.headline,
              rules: data?.space?.rules,
              about: data?.space?.about
            }}
            onSubmit={async (values) => {
              const { error } = await updateInfo({ id: data?.space?.id, input: values })
              setShowSuccessMessage(true)
            }}
          >
            {({ isSubmitting, initialValues, values }) =>
              <Form
                onChange={() => {
                  setShowSuccessMessage(false)
                }}
              >
                <InputField name='fullSpaceName' placeholder='full name of your space' label='Full Name' />
                <Box mt={4}>
                  <InputField name='headline' placeholder='a short sentence about your space' label='Headline' />
                </Box>
                <Box mt={4}>
                  <InputField name='rules' placeholder='Some rules for posting at your space' label='' inputType='quill' />
                </Box>
                <Box mt={4}>
                  <InputField name='about' placeholder='A full introduction about your space' label='' inputType='quill' />
                </Box>
                {
                  showSuccessMessage &&
                  <FormSuccessMessage message='Space edited successfully.' />
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
                    onClick={() => { router.push(`/s/${data?.space?.spaceName}`) }}
                  >
                    Go to Space
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
        <title>Edit Space | Comroots</title>
        <meta property='og:title' content='Edit Space | Comroots' key='title' />
        <meta name='description' content='Edit Space' />
      </Head>
      {returnValue}
    </>
  )
}

export default withUrqlClient(createURQLClient)(EditSpace)