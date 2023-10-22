import { PropsOf } from '@chakra-ui/react'
import { Box } from '@mui/material'
import ReactQuill from 'react-quill'
import BlotFormatter from 'quill-blot-formatter'
ReactQuill.Quill.register('modules/blotFormatter', BlotFormatter)


const defaultToolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'link'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ align: [] }],
  ['image', 'video', 'blockquote'],
]

const Quill = (props: PropsOf<typeof ReactQuill>): JSX.Element => {
  return (
    <Box className='quill-container' sx={{
      '& .quill': {
        '& .ql-toolbar': {
          borderRadius: '5px 5px 0 0'
        },
        '& .ql-container': {
          borderRadius: '0 0 5px 5px',
          '& .ql-editor': {
            minHeight: '10rem',
          },
        }
      }
    }}>
      <ReactQuill
        className='quill'
        modules={{ toolbar: defaultToolbarOptions, blotFormatter: {} }}
        bounds={'.quill-container'}
        {...props}
      />
    </Box>
  )
}

export default Quill