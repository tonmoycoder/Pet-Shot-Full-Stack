import React from 'react'

export default function NotFound() {
  return (
    <div style={{ padding: '50px', background: 'red', color: 'white', zIndex: 9999, position: 'relative' }}>
      <h1>Debug: Payload 404 Not Found Hit</h1>
      <p>This means Payload threw notFound().</p>
    </div>
  )
}
