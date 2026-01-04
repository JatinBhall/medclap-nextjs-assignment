import data from "@data/states.json"

export async function generateStaticParams() {
  return data.map((state) => ({
    slug: state.slug,
  }))
}

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <>{children}</>
  )
}

export default Layout