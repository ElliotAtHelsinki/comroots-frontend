import { Box, Flex } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ContainedButton, FormSuccessMessage, InputField, Layout, PhotoField, SelectField, SwitchField } from 'src/components'
import { CreateOfferMutationVariables, useCreateOfferMutation } from 'src/generated/graphql'
import { useIsAuth, usePageOptions } from 'src/hooks'
import { formErrorMessage } from 'src/styles'
import { createURQLClient, extractServerMessage, toErrorMap } from 'src/utils'

interface CreateOfferProps {

}

const CreateOffer: NextPage<CreateOfferProps> = () => {
  useIsAuth(true)
  const { pageOptions, defaultValue } = usePageOptions()
  const router = useRouter()
  const [, createOffer] = useCreateOfferMutation()

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
        <title>Create Offer | Comroots</title>
        <meta property='og:title' content='Create Offer | Comroots' key='title' />
        <meta name='description' content='Create Offer'/>
      </Head>
      <Layout variant='regular'>
        <Formik
          initialValues={{
            pageId: undefined,
            spaceName: '',
            title: '',
            workplace: '',
            address: '',
            recruiting: false,
            benefits: '',
            department: '',
            employmentType: '',
            requirements: '',
            salaryRange: '',
            description: '',
            photo: null
          } as CreateOfferMutationVariables['input']}
          onSubmit={async (values, { setErrors }) => {
            const response = await createOffer({ input: values })
            if (response.data?.createOffer?.errors) {
              setErrors(toErrorMap(response.data.createOffer.errors))
            }
            else {
              if (response?.error) {
                setErrorMessage(extractServerMessage(response.error.message))
              }
              else {
                setShowSuccessMessage(true)
                setTimeout(() => {
                  router.push(`/offer/${response.data.createOffer.offer.id}`)
                }, 3050)
              }
            }
          }}
        >
          {({ isSubmitting }) =>
            <Form onChange={() => { setErrorMessage('') }}>
              <Box w='full' p='10' bgColor='white' shadow='lg' mb='4'>
                <SelectField
                  name='pageId'
                  label='Create this offer as:'
                  isMulti={false}
                  options={pageOptions}
                />
                <Box mt={4}>
                  <InputField name='spaceName' placeholder='space' label='Space' />
                </Box>
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
                </Box>
                <Box mt={4}>
                  <PhotoField label='Photo' name='photo' type='square' />
                </Box>
                {
                  showSuccessMessage &&
                  <FormSuccessMessage message={`Offer created successfully. Redirecting to offer in ${redirectCount}`} />
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
                    Create Offer
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

export default withUrqlClient(createURQLClient)(CreateOffer)