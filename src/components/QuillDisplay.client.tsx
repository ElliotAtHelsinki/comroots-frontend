import { Box } from '@mui/material'
import ReactQuill from 'react-quill'

interface QuillDisplayProps {
  value: string
}

const QuillDisplay = (props: QuillDisplayProps): JSX.Element => {
  const { value } = props
  return (
    <Box className='quill-container' sx={{
      '& .quill': {
        '& .ql-toolbar': {
          display: 'none'
        },
        '& .ql-container': {
          border: 'none',
          '& .ql-editor': {
            padding: 0
          }
        }
      }
    }}>
      <ReactQuill
        className='quill'
        readOnly={true}
        value={value}
      />
    </Box>
  )
}

export default QuillDisplay