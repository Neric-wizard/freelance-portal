'use client'

import { useState } from 'react'

export default function Test() {
  const [value, setValue] = useState('')

  return (
    <div className="p-8">
      <h1>Test Input</h1>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border p-2"
        placeholder="Type here..."
      />
      <p>You typed: {value}</p>
    </div>
  )
}