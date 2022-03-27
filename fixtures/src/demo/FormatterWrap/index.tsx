import React from 'react';

import { FormatterWrap } from '../../../../'

function FormatterWrapDemo() {
  const [value, onChange] = React.useState<string[]>([])

  console.log(value);

  return <FormatterWrap<string, string[]>
    value={value}
    onChange={e => {
      onChange(e)
    }}
    inputFormatter={val => {
      return val?.[0] || ''
    }}
    outputFormatter={val => {
      return [val].filter(Boolean)
    }}
  >
    <input/>
  </FormatterWrap>
}

export default FormatterWrapDemo
