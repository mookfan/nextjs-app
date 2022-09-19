import { parseCookies } from "../helpers/"
export default function HomePage({ data }: any) {
  return (
    <>
      <div>
        <h1>Homepage </h1>
        <p>Data from cookie: {data.user}</p>
      </div>
    </>
  )
}
HomePage.getInitialProps = async ({ req, res }: any) => {
  const data = parseCookies(req)
  
   if (res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: "/" })
      res.end()
    }
  }
  
  return {
    data: data && data,
  }
}