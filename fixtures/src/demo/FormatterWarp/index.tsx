import React from 'react';

import {FormatterWarp} from '../../../../'

function FormatterWarpDemo() {
  const [value, onChange] = React.useState()

  return <FormatterWarp<string, string[]>
    value={value}
    onChange={e => {
      console.log(e)
      onChange(e)
    }}
    inputFormatter={val => {
      return val?.[0] || ''
    }}
    outputFormatter={val => {
      return [val].filter(Boolean)
    }}
  >
    <Input/>
  </FormatterWarp>
}

function Input({value, onChange}: {value?: any, onChange?: (value: any) => void}) {
  return <input value={value} onChange={e => {
    onChange?.(e.target.value);
  }}/>
}

export default FormatterWarpDemo
