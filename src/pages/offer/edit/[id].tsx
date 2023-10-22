import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, IconButton } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ContainedButton, FormSuccessMessage, InputField, Layout, PhotoField, SelectField, SwitchField } from 'src/components'
import { useOfferQuery, useUpdateOfferMutation } from 'src/generated/graphql'
import { useGetQueryID, useIsAuth } from 'src/hooks'
import { formErrorMessage } from 'src/styles'
import { createURQLClient, extractServerMessage } from 'src/utils'

interface EditPostProps {

}

const EditOffer: NextPage<EditPostProps> = () => {
  useIsAuth(true)
  const router = useRouter()
  const intId = useGetQueryID()
  const [{ data }] = useOfferQuery({
    pause: intId == -1,
    variables: {
      id: intId
    }
  })
  const [, updateOffer] = useUpdateOfferMutation()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (showSuccessMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    }
  }, [showSuccessMessage])

  return (
    <>
      <Head>
        <title>Edit Offer | Comroots</title>
        <meta property='og:title' content='Edit Offer | Comroots' key='title' />
        <meta name='description' content='Edit Offer' />
      </Head>
      {
        data?.offer?.id &&
        <Layout variant='regular'>
          <Box w='full' p='10' bgColor='white' shadow='lg' mb='4'>
            <Formik
              initialValues={{
                address: data.offer.address,
                description: data.offer.description,
                title: data.offer.title,
                recruiting: data.offer.recruiting,
                workplace: data.offer.workplace,
                benefits: data.offer.benefits,
                department: data.offer.department,
                employmentType: data.offer.employmentType,
                requirements: data.offer.requirements,
                salaryRange: data.offer.salaryRange,
                photo: null
              }}
              onSubmit={async (values) => {
                const { error } = await updateOffer({ id: intId, input: values })
                if (!error) {
                  setShowSuccessMessage(true)
                  setErrorMessage('')
                }
                else {
                  setErrorMessage(extractServerMessage(error.message))
                }
              }}
            >
              {({ isSubmitting, initialValues, values }) =>
                <Form
                  onChange={() => {
                    setShowSuccessMessage(false)
                    setErrorMessage('')
                  }}
                >
                  <Box mt={4}>
                    <InputField name='title' placeholder='title' label='Title' />
                  </Box>
                  <Box mt={4}>
                    <InputField name='workplace' placeholder='workplace' label='Workplace' />
                  </Box>
                  <Box mt={4}>
                    <InputField name='department' placeholder='e.g. Content, Finance, HR, etc.' label='Department' />
                  </Box>
                  <Box mt={4}>
                    <InputField name='address' placeholder='address' label='Address' />
                  </Box>
                  <Box mt={4}>
                    <SwitchField
                      name='recruiting'
                      placeholder='recruiting'
                      label='Recruiting'
                      onSwitchChangeEffect={() => {
                        setErrorMessage('')
                      }}
                    />
                  </Box>
                  <Box mt={4}>
                    <SelectField
                      name='employmentType'
                      label='Employment Type'
                      isMulti={false}
                      placeholder='Type of Employment'
                      options={[
                        { label: 'Full-time', value: 'Full-time' },
                        { label: 'Part-time', value: 'Part-time' },
                        { label: 'Freelance', value: 'Freelance' },
                        { label: 'Online', value: 'Online' },
                        { label: 'Internship', value: 'Internship' },
                        { label: 'Temporary', value: 'Temporary' },
                        { label: 'Contract', value: 'Contract' },
                        { label: 'Volunteer', value: 'Volunteer' },
                        { label: 'Other', value: 'Other' }
                      ]}
                    />
                  </Box>
                  <Box mt={4}>
                    <InputField
                      name='salaryRange'
                      placeholder='e.g. min - max'
                      label='Salary Range'
                    />
                  </Box>
                  <Box mt={4}>
                    <InputField
                      name='requirements'
                      placeholder='requirements'
                      label='Requirements'
                      inputType='quill'
                      onQuillChangeEffect={() => {
                        setErrorMessage('')
                      }}
                    />
                  </Box>
                  <Box mt={4}>
                    <InputField
                      name='benefits'
                      placeholder='benefits'
                      label='Benefits'
                      inputType='quill'
                      onQuillChangeEffect={() => {
                        setErrorMessage('')
                      }}
                    />
                  </Box>
                  <Box mt={4}>
                    <InputField
                      name='description'
                      placeholder='description'
                      label='Description'
                      inputType='quill'
                      onQuillChangeEffect={() => {
                        setErrorMessage('')
                      }}
                    />
                    <Box mt={4}>
                      <PhotoField label='Photo' name='photo' type='square' />
                    </Box>
                  </Box>
                  {
                    showSuccessMessage &&
                    <FormSuccessMessage message='Offer saved successfully.' />
                  }
                  {
                    errorMessage &&
                    <Box style={formErrorMessage}>{errorMessage}</Box>
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
                      onClick={() => { router.push(`/offer/${intId}`) }}
                    >
                      Go to Offer
                    </Button>
                  </Flex>
                </Form>
              }
            </Formik>
          </Box>
        </Layout>
      }
    </>
  )

}

export default withUrqlClient(createURQLClient)(EditOffer)