import React from 'react'
import Layout from '../../components/Layout.js/Layout'
import Adminmenu from '../../components/Layout.js/Routes/Adminmenu'


const Users = () => {
  return (
    <Layout title={"Dashboard -ALL USERS"}>
      <div className='container-fluid' style={{minHeight:'100vh'}}>
        <div className="row">
          <div className="col-md-3 p-5 bg-secondary ">
            <Adminmenu />
          </div>
          <div className="col-md-9 bg-dark">
          <h1 className='text-center '> <strong style={{color:"whitesmoke"}}>All users</strong></h1>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default Users
