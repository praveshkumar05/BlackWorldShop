import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout.js/Layout'

const Pagenofounf = () => {
  return (
    <Layout>
        <div className='pnf'>
        <h1 className='pnf-title'>404</h1>
        <h2 className='pnf-heading'> Oops! Page Not Found</h2>
          <Link to="/">
            <button>GoBack</button>
          </Link>
        </div>
    </Layout>
  )
}

export default Pagenofounf
