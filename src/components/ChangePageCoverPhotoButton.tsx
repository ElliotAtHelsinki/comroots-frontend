
import { Box, Button, Flex, Grid, GridItem, Icon, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, PropsOf, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, useDisclosure } from '@chakra-ui/react'
import { Box as MUIBox } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import { PageQuery, useChangePageCoverPhotoMutation, usePageCoverPhotosQuery, useUploadPageCoverPhotoMutation } from 'src/generated/graphql'
import { blobToFile } from 'src/utils'
import { ContainedButton } from './ContainedButton'
import { OutlinedButton } from './OutlinedButton'

interface ChangePageCoverPhotoButtonProps {
  data: PageQuery
  setCoverPhotoKey: Dispatch<SetStateAction<string | null | undefined>>
}

export const ChangePageCoverPhotoButton = (props: ChangePageCoverPhotoButtonProps): JSX.Element => {
  const { data, setCoverPhotoKey } = props
  const pageId = useMemo(() => data?.page?.id, [data])
  useEffect(() => {
    setCoverPhotoKey(data?.page?.coverPhoto)
  }, [data])

  const [{ data: coverPhotosData }] = usePageCoverPhotosQuery({
    pause: !pageId,
    variables: {
      pageId
    }
  })

  const editor = useRef<AvatarEditor>(null)
  const [editorOptions, setEditorOptions] = useState<PropsOf<typeof AvatarEditor>>(null)
  const [, uploadCoverPhoto] = useUploadPageCoverPhotoMutation()
  const [selected, setSelected] = useState(data?.page?.coverPhoto)
  useEffect(() => {
    setSelected(data?.page?.coverPhoto)
  }, [data?.page?.coverPhoto])

  const [, changeCoverPhoto] = useChangePageCoverPhotoMutation()

  const { isOpen: isChangingCoverPhotoOpen, onOpen: onChangingCoverPhotoOpen, onClose: onChangingCoverPhotoClose } = useDisclosure()

  return (
    <>
      <Button borderRadius='full' bgColor='white' w='40px' h='40px' position='absolute' top={6} right='3rem' onClick={onChangingCoverPhotoOpen}>
        <Icon as={() => <Box className='fa-regular fa-camera' color='green.500' />} />
      </Button>
      <Modal isOpen={isChangingCoverPhotoOpen} onClose={onChangingCoverPhotoClose} size='4xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change page&apos;s cover photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb={2}>page&apos;s cover photo collection: </Text>
            <Grid templateColumns='repeat(11, 1fr)' gap='0.25rem 0.5rem'>
              {
                coverPhotosData?.pageCoverPhotos?.length > 0 &&
                coverPhotosData.pageCoverPhotos.map((photo, index) => (
                  photo &&
                  <GridItem key={index} >
                    <Flex align='center'>
                      <Image
                        key={index}
                        src={photo.url}
                        alt='cover-photo'
                        onClick={() => {
                          setSelected(photo.key)
                        }}
                        h='40px'
                        w='210.5px'
                        border={selected != photo.key ? '3px solid transparent' : '3px solid green'}
                      />
                    </Flex>
                  </GridItem>
                ))
              }
            </Grid>
            {
              editorOptions ?
                <Flex flexDir='column' align='center' mt={4}>
                  <AvatarEditor
                    ref={editor}
                    width={800}
                    height={152}
                    onPositionChange={(position) => { setEditorOptions({ ...editorOptions, position }) }}
                    {...editorOptions}
                  />
                  <Text mt={6}>You can select the part of the image to be included with your mouse.</Text>
                  <Flex align='center' w='80%' mt={2}>
                    <Text w='50px' mr={4}>Zoom</Text>
                    <Slider
                      aria-label='size-slider'
                      defaultValue={1}
                      w='80%'
                      size='lg'
                      colorScheme='green'
                      onChange={(value) => { setEditorOptions({ ...editorOptions, scale: value }) }}
                      min={0.5}
                      max={2}
                      step={0.01}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb borderWidth='3px' borderColor='green.500' />
                    </Slider>
                  </Flex>
                  <Flex align='center' w='80%' mt={2}>
                    <Text w='50px' mr={4}>Rotate</Text>
                    <Slider
                      aria-label='rotate-slider'
                      defaultValue={0}
                      w='80%'
                      size='lg'
                      colorScheme='green'
                      onChange={(value) => { setEditorOptions({ ...editorOptions, rotate: value }) }}
                      min={0}
                      max={180}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb borderWidth='3px' borderColor='green.500' />
                    </Slider>
                  </Flex>
                  <OutlinedButton
                    onClick={async () => {
                      const dataURL = editor.current.getImageScaledToCanvas().toDataURL()
                      const result = await fetch(dataURL)
                      const blob = await result.blob()
                      const file = blobToFile(blob, (editorOptions.image as File).name)
                      await uploadCoverPhoto({
                        pageId,
                        upload: file
                      })
                      setEditorOptions(null)
                    }}
                    mt={4}
                  >
                    Save to collection
                  </OutlinedButton>
                </Flex>
                :
                <MUIBox sx={{
                  marginTop: '1rem',
                  '& .dropzone': {
                    textAlign: 'center',
                    padding: '20px',
                    border: '3px dashed #EEEEEE',
                    backgroundColor: '#FAFAFA',
                    color: '#BDBDBD',
                  }
                }}>
                  <Dropzone
                    multiple={false}
                    onDrop={(acceptedFiles) => { setEditorOptions({ image: acceptedFiles[0] }) }}
                  >
                    {({ getRootProps, getInputProps, isDragActive }) => (
                      <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <Text>
                          {
                            isDragActive ?
                              'Drop your image here ...' :
                              'Drag \'n\' drop an image here, or click to select one'
                          }
                        </Text>
                      </div>
                    )}
                  </Dropzone>
                </MUIBox>
            }
          </ModalBody>
          <ModalFooter>
            <Flex w='full' justify='center'>
              <ContainedButton onClick={async () => {
                setCoverPhotoKey(selected)
                await changeCoverPhoto({
                  pageId,
                  key: selected,
                })
                onChangingCoverPhotoClose()
              }}
                baseColorLevel={500}
              >
                Save
              </ContainedButton>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}