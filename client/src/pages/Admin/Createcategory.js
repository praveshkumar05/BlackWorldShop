import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout.js/Layout";
import Adminmenu from "../../components/Layout.js/Routes/Adminmenu";
import { toast } from "react-hot-toast";
import { createCategoryfunc, deleteCategoryfunc, getCategoryfunc, updateCategoryfunc, } from "../../components/Layout.js/APIS/apicall";
import CaregoryForm from "../../components/Form/CaregoryForm";
import { Modal } from "antd";

const Createcategory = () => {
  const [category, setCategory] = useState([]);
  const [name,setName]=useState("");
  const [visible,setVisible]=useState(false);
  const [updatedName, setUpdatedName]=useState("");
  const [selected,setSelected]=useState(null);
  const handlesubmit= async(e)=>{
    e.preventDefault();
    try {
      
      const config = {
        "Content-Type": "application/json",
      };
      const {data}= await createCategoryfunc({name},config);
      console.log(data);
      if(data.success)
      {
          toast.success(`${data.category.name} category is created`);
          setName("");
          getAllCategory();
      }
      else{
         toast.error(`${data.message}`);
      }
      
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form")
      
    }

  }
  const handleupdate=async(e)=>{
    e.preventDefault();
    try {
          const info={ 
              id:selected._id,
              name:updatedName
          }
          const config = {
            "Content-Type": "application/json",
          };
          const {data}= await updateCategoryfunc(info,config);
          console.log(data);
          if(data.success)
          {
            toast.success(`${data.category.name} category is Updated`); 
            setSelected(null);
            setUpdatedName("");
            setVisible(false);
            getAllCategory();
          }
          else{
            toast.error(`${data.message}`);
         }

    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form during updation ")
    }
  }

  const getAllCategory = async () => {
    try {
      const res = await getCategoryfunc();
      console.log(res.data);
      if (res.data.success) {
        setCategory(res.data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("There is Some error in category Loading");
    }
  };
  const handleDelete=async(id)=>{
        try {
           const info={id:id};
            const {data}=await deleteCategoryfunc(info);
            if(data.success)
            {
                toast.success(`${data.result.name} is deleted`);
                getAllCategory();
            }
            else{
              toast.error(`${data.message}`)
            }

          
        } catch (error) {
          console.log(error);
          toast.error("There is Some error in category Deletion");
          
        }
  }
  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Dashboard -CreateCategory"}>
      <div className="container-fluid bg-secondary " >
        <div className="row ">
          <div className="col-md-3 p-sm-5" style={{minHeight:"40vh"}}>
            <Adminmenu />
          </div>
          <div className="col-md-9  bg-dark " >
          <h1 className='text-center '> <strong style={{color:"whitesmoke"}}>Manage Category</strong></h1>
          
          <div> <CaregoryForm handlesubmit={handlesubmit} value={name} setValue={setName} /> </div>
          <div className="container">
            <div className="w-75 row">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" style={{color:"whitesmoke"}}>Name</th>
                        <th scope="col" style={{color:"whitesmoke"}}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                            {
                              category?.map(c=>{
                                  return (                                    
                                     <tr>
                                          <td style={{color:"whitesmoke"}}> {c.name}</td>
                                          <td > <button className="btn btn-primary" onClick={()=>{setVisible(true) ;setSelected(c);setUpdatedName(c.name) }}>edit</button></td>  
                                          <td > <button className="btn btn-danger" onClick={()=>handleDelete(c._id)}>delete</button></td>  
                                     </tr>
                                  )
                                })
                            }       
                    </tbody>
                  </table>
              
            </div>
            </div>
             <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible} >
              <CaregoryForm  value={updatedName} setValue={setUpdatedName} handlesubmit={handleupdate} />
            </Modal>
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Createcategory;
