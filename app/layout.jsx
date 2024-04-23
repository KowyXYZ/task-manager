import React from 'react'

import '@/styles/globals.css'

const layout = ({children}) => {
  return (
    <html>
        <body>
            {children}
        </body>
    </html>
  )
}

export default layout