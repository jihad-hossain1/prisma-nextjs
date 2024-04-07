import React from 'react'


interface RootLayoutProps {
  children: React.ReactNode;
}

const Dasboardlayout:React.FC = ( { children } : RootLayoutProps ) => {
  return (
      <div>
          
          {children}
          
    </div>
  )
}

export default Dasboardlayout;
