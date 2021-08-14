import Nav from '../components/Nav'

const Layout = (props) => {
  return (
    <>
    <Nav />
    {props.children}
    </>
  )
}

export default Layout