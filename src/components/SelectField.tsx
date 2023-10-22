import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { PropsOf } from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { useField } from 'formik'
import { SelectOption } from 'src/types'

type SelectFieldProps = PropsOf<typeof Select> & {
  label: string
  name: string
  isMulti: boolean
  defaultValue?: SelectOption | SelectOption[]
  options?: SelectOption[]
}

export const SelectField = (props: SelectFieldProps): JSX.Element => {
  const { label, name, isMulti, defaultValue, options, ...rest } = props
  const [field, { error }, { setValue }] = useField({ name })

  const handleChange = (selected: SelectOption | SelectOption[]) => {
    if (isMulti) {
      setValue((selected as SelectOption[]).map(t => t.value))
    }
    else {
      setValue((selected as SelectOption).value)
    }
  }

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Select
        isMulti={isMulti}
        defaultValue={defaultValue}
        options={options}
        onChange={handleChange}
        selectedOptionColor='green'
        focusBorderColor='green.500'
        useBasicStyles
        {...props}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}