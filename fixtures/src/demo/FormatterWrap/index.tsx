import React from 'react';

import { FormatterWrap } from '../../../../'

function FormatterWrapDemo() {
  const [value, onChange] = React.useState<string[]>()

  return <FormatterWrap<string, string[]>
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
    <input/>
  </FormatterWrap>
}

export default FormatterWrapDemo