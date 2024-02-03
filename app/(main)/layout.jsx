import Commonheader from "@/components/Common_Header"
export default function RootLayout({ children }) {
  return (

      <body >
        <div>
        <Commonheader/>
        </div>
        {children}
        </body>

  )
}
