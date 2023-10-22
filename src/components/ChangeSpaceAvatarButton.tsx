
import { Flex, Grid, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, PropsOf, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, useDisclosure } from '@chakra-ui/react'
import { Box as MUIBox } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import { SpaceQuery, useChangeSpaceAvatarMutation, useSpaceAvatarsQuery, useUploadAvatarMutation, useUploadSpaceAvatarMutation } from 'src/generated/graphql'
import { blobToFile } from 'src/utils'
import { ContainedButton } from './ContainedButton'
import { OutlinedButton } from './OutlinedButton'

interface ChangeSpaceAvatarButtonProps {
  data: SpaceQuery
  setAvatarKey: Dispatch<SetStateAction<string | null | undefined>>
}

export const ChangeSpaceAvatarButton = (props: ChangeSpaceAvatarButtonProps): JSX.Element => {
  const { data, setAvatarKey } = props
  const spaceId = useMemo(() => data?.space?.id, [data])
  useEffect(() => {
    setAvatarKey(data?.space?.avatar)
  }, [data])

  const [{ data: avatarsData }] = useSpaceAvatarsQuery({
    pause: !spaceId,
    variables: {
      spaceId
    }
  })

  const editor = useRef<AvatarEditor>(null)
  const [editorOptions, setEditorOptions] = useState<PropsOf<typeof AvatarEditor>>(null)
  const [, uploadAvatar] = useUploadSpaceAvatarMutation()
  const [selected, setSelected] = useState(data?.space?.coverPhoto)
  useEffect(() => {
    setSelected(data?.space?.avatar)
  }, [data?.space?.avatar])

  const [, changeSpaceAvatar] = useChangeSpaceAvatarMutation()

  const { isOpen: isChangingAvatarOpen, onOpen: onChangingAvatarOpen, onClose: onChangingAvatarClose } = useDisclosure()

  return (
    <>
      <OutlinedButton position='absolute' top='6' right='110px' h='40px' onClick={onChangingAvatarOpen}>
        Change Avatar
      </OutlinedButton>
      <Modal isOpen={isChangingAvatarOpen} onClose={onChangingAvatarClose} size='2xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change space&apos;s avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb={2}>Space&apos;s avatar collection: </Text>
            <Grid templateColumns='repeat(11, 1fr)' gap='0.25rem 0.5rem'>
              {
                avatarsData?.spaceAvatars?.length > 0 &&
                avatarsData.spaceAvatars.map((photo, index) => (
                  photo &&
                  <GridItem key={index} >
                    <Flex align='center'>
                      <Image
                        key={index}
                        src={photo.url}
                        alt='avatar'
                        onClick={() => {
                          setSelected(photo.key)
                        }}
                        h='40px'
                        w='40px'
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
                  <MUIBox sx={{ canvas: { borderRadius: '50%' } }}>
                    <AvatarEditor
                      ref={editor}
                      width={250}
                      height={250}
                      borderRadius={Infinity}
                      onPositionChange={(position) => { setEditorOptions({ ...editorOptions, position }) }}
                      {...editorOptions}
                    />
                  </MUIBox>
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
                      min={1}
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
                      await uploadAvatar({
                        spaceId,
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
                setAvatarKey(selected)
                await changeSpaceAvatar({
                  spaceId,
                  key: selected,
                })
                onChangingAvatarClose()
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