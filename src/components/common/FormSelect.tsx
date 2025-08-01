import React from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectProps,
} from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

export interface FormSelectOption {
  value: string | number
  label: string
}

export interface FormSelectProps extends Omit<SelectProps, 'name' | 'error'> {
  name: string
  label: string
  options: FormSelectOption[]
  required?: boolean
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  required = false,
  ...selectProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]
  const errorMessage = error?.message as string

  return (
    <FormControl fullWidth margin="normal" error={!!error}>
      <InputLabel id={`${name}-label`} required={required}>
        {label}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            {...selectProps}
            labelId={`${name}-label`}
            id={name}
            label={label}
          >
            {options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

export default FormSelect
