import Commonheader from "@/components/Landing_header"
export default function RootLayout({ children }) {
  return (

      <body >
        {children}
        <div>
        <Commonheader/>
        </div>
        </body>

  )
}
