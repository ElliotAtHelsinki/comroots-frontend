import { Box, Button, Flex } from '@chakra-ui/react'
import { ChakraStylesConfig } from 'chakra-react-select'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ContainedButton, FormSuccessMessage, InputField, Layout, SelectField, tagSelectCustomComponents, tagStylingMap } from 'src/components'
import { useCreatePostMutation, useTagsQuery } from 'src/generated/graphql'
import { useIsAuth, usePageOptions } from 'src/hooks'
import { formErrorMessage } from 'src/styles'
import { createURQLClient, extractServerMessage, toErrorMap } from 'src/utils'

interface CreatePostProps {

}

const CreatePost: NextPage<CreatePostProps> = () => {
  useIsAuth(true)
  const { pageOptions } = usePageOptions()
  const router = useRouter()
  const [{ data: tagsData }] = useTagsQuery()
  const [, createPost] = useCreatePostMutation()
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
        <title>Create Post | Comroots</title>
        <meta property='og:title' content='Create Post | Comroots' key='title' />
        <meta name='description' content='Create Post'/> 
      </Head>
      <Layout variant='regular'>
        <Formik
          initialValues={{ pageId: undefined, spaceName: '', title: '', text: '', tags: [] }}
          onSubmit={async (values, { setErrors }) => {
            const response = await createPost({ input: values })
            if (response.data?.createPost?.errors) {
              setErrors(toErrorMap(response.data.createPost.errors))
            }
            else {
              if (response?.error) {
                setErrorMessage(extractServerMessage(response.error.message))
              }
              else {
                setShowSuccessMessage(true)
                setTimeout(() => {
                  router.push(`/post/${response.data.createPost.post.id}`)
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
                  label='Create this post as:'
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
                  <SelectField
                    label='Tags'
                    name='tags'
                    isMulti={true}
                    options={tagsData?.tags?.map(t => ({
                      label: t.name,
                      value: t.id,
                      colorScheme: tagStylingMap[`${t.name}`].colorScheme,
                      icon: tagStylingMap[`${t.name}`].icon,
                    }))}
                    components={tagSelectCustomComponents}
                    maxMenuHeight={320}
                    chakraStyles={{
                      clearIndicator: (provided, _state) => ({
                        ...provided,
                        fontSize: '10'
                      }),
                    } as ChakraStylesConfig}
                  />
                </Box>
                <Box mt={4}>
                  <InputField
                    name='text'
                    placeholder='text...'
                    label='Body'
                    inputType='quill'
                    onQuillChangeEffect={() => {
                      setErrorMessage('')
                    }}
                  />
                </Box>
                {
                  showSuccessMessage &&
                  <FormSuccessMessage message={`Post created successfully. Redirecting to post in ${redirectCount}`} />
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
                    Create Post
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

export default withUrqlClient(createURQLClient)(CreatePost)