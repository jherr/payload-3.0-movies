import React from 'react'
import './globals.scss'

import Header from './Header'

/* Our app sits here to not cause any conflicts with payload's root layout  */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html className="dark mx-auto max-w-[1200px]">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}

export default Layout
