import { PropsOf } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { Box as MUIBox } from '@mui/material'
import { Flex, FormControl, FormErrorMessage, FormLabel, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from '@chakra-ui/react'
import Dropzone from 'react-dropzone'
import { blobToFile } from 'src/utils'
import { useField } from 'formik'

type PhotoFieldProps = {
  label: string
  name: string
  type: 'avatar' | 'coverPhoto' | 'square'
}

export const PhotoField = (props: PhotoFieldProps): JSX.Element => {
  const { label, name, type } = props
  const editor = useRef<AvatarEditor>(null)
  const [editorOptions, setEditorOptions] = useState<PropsOf<typeof AvatarEditor>>(null)
  const [field, { error }, { setValue }] = useField({ name })

  useEffect(() => {
    return () => {
      setEditorOptions(null)
    }
  }, [])

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {
        editorOptions ?
          <Flex flexDir='column' align='center' >
            <MUIBox sx={{ canvas: { borderRadius: type == 'avatar' ? '50%' : 0 } }}>
              <AvatarEditor
                ref={editor}
                width={type == 'coverPhoto' ? 800 : 250}
                height={type == 'coverPhoto' ? 152 : 250}
                borderRadius={type == 'avatar' ? Infinity : 0}
                onPositionChange={(position) => { setEditorOptions({ ...editorOptions, position }) }}
                onImageChange={async () => {
                  const dataURL = editor.current.getImageScaledToCanvas().toDataURL()
                  const result = await fetch(dataURL)
                  const blob = await result.blob()
                  const file = blobToFile(blob, (editorOptions.image as File).name)
                  setValue(file)
                }}
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
          </Flex>
          :
          <MUIBox sx={{
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
              onDrop={(acceptedFiles) => {
                setEditorOptions({ image: acceptedFiles[0] })
                setValue(acceptedFiles[0])
              }}
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
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}