import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { PropsOf } from '@chakra-ui/react'
import { CreatableSelect } from 'chakra-react-select'
import { useField } from 'formik'
import { SelectOption } from 'src/types'

type CreatableSelectFieldProps = PropsOf<typeof CreatableSelect> & {
  label: string
  name: string
  defaultValue?: SelectOption | SelectOption[]
}

export const CreatableSelectField = (props: CreatableSelectFieldProps): JSX.Element => {
  const { label, name, defaultValue, ...rest } = props
  const [field, { error }, { setValue }] = useField({ name })

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <CreatableSelect
        isMulti
        useBasicStyles
        colorScheme='green'
        selectedOptionColor='green'
        focusBorderColor='green.500'
        defaultValue={defaultValue}
        onChange={(newValue: SelectOption[]) => { setValue(newValue.map(v => v.value)) }}
        {...props}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}