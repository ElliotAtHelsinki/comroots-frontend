import { FormControl, FormLabel, FormErrorMessage, Tag, TagCloseButton, TagLabel, Text } from '@chakra-ui/react'
import { useField } from 'formik'
import Dropzone from 'react-dropzone'
import { Box as MUIBox } from '@mui/material'
import { useEffect } from 'react'

interface FileFieldProps {
  label: string
  name: string
  values: any
}

export const FileField = (props: FileFieldProps): JSX.Element => {
  const { label, name, values, ...rest } = props
  const [field, { error, }, { setValue,  }] = useField({ name })
   
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {
        values[`${name}`] ?
          <Tag
            borderRadius='full'
            variant='subtle'
            colorScheme='green'
          >
            <TagLabel>{values[`${name}`].name}</TagLabel>
            <TagCloseButton onClick={() => { setValue(null) }} />
          </Tag>
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
                setValue(acceptedFiles[0])
              }}
            >
              {({ getRootProps, getInputProps, isDragActive }) => (
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <Text>
                    {
                      isDragActive ?
                        'Drop your file here ...' :
                        'Drag \'n\' drop a file here, or click to select one'
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