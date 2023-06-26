import logo from '../assets/logo (1).png';
export default function Headers() {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
        <div className="container">
            <a className='navbar-brand' href="/">
                <div className="d-flex">
                    <img src={logo} alt="logo" />
                    <div>GrapQL Project1</div>
                </div>
            </a>
        </div>
    </nav>
  )
}
