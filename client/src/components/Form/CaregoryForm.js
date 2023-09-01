import React from "react";

const CaregoryForm = ({handlesubmit ,value,setValue}) => {
  return (
    <>
      <form onSubmit={handlesubmit}>
      <div style={{  alignItems:'center', display:'flex',justifyContent:'center' }}>
        <div className="form-group d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new Category "
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ margin:"5px" }}
          />
        </div>
        <div >
                <button type="submit" className="btn btn-primary">
                     Submit
                </button>
        </div>
        </div>
      </form>
    </>
  );
};

export default CaregoryForm;
