import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, IconButton } from '@chakra-ui/react'
import { ChakraStylesConfig } from 'chakra-react-select'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ContainedButton, FormSuccessMessage, InputField, Layout, SelectField, tagSelectCustomComponents, tagStylingMap } from 'src/components'
import { usePostQuery, useTagsQuery, useUpdatePostMutation } from 'src/generated/graphql'
import { useGetQueryID, useIsAuth } from 'src/hooks'
import { formErrorMessage } from 'src/styles'
import { createURQLClient, extractServerMessage } from 'src/utils'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface EditPostProps {

}

const EditPost: NextPage<EditPostProps> = () => {
  useIsAuth(true)
  const router = useRouter()
  const [{ data: tagsData }] = useTagsQuery()
  const intId = useGetQueryID()
  const [{ data }] = usePostQuery({
    pause: intId == -1,
    variables: {
      id: intId
    }
  })
  const [, updatePost] = useUpdatePostMutation()
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
        <title>Edit Post | Comroots</title>
        <meta property='og:title' content='Edit Post | Comroots' key='title' />
        <meta name='description' content='Edit Post' />
      </Head>
      {
        (data?.post?.title && data?.post?.text) &&
        <Layout variant='regular'>
          <Box w='full' p='10' bgColor='white' shadow='lg' mb='4'>
            <Formik
              initialValues={{
                title: data.post.title,
                text: data.post.text,
                tags: data.post.tags.map(tag => tag.id)
              }}
              onSubmit={async (values) => {
                const { error } = await updatePost({ id: intId, input: values })
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
                  <InputField name='title' placeholder='title' label='Title' />
                  <Box mt={4}>
                    <SelectField
                      label='Tags'
                      name='tags'
                      isMulti={true}
                      defaultValue={data?.post?.tags?.map(t => ({
                        value: t.id,
                        label: t.name,
                        colorScheme: tagStylingMap[`${t.name}`].colorScheme,
                        icon: tagStylingMap[`${t.name}`].icon,
                      }))}
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
                    <FormSuccessMessage message='Post saved successfully.' />
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
                      onClick={() => { router.push(`/post/${intId}`) }}
                    >
                      Go to Post
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

export default withUrqlClient(createURQLClient)(EditPost)