import React,{ useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchContext } from '../Layout.js/context/Search';
import { searchinputFunc } from '../Layout.js/APIS/apicall';

const SearchInput = () => {
    const [value,setValue]=useContext(searchContext);
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
            e.preventDefault();
            try {
                const {data}=await searchinputFunc(value.keyword);
                setValue({...value,results:data.result});
                console.log(data);
                navigate("/search");
            } catch (error) {
                    console.log(error);
            }

    }
    return (
        <div>
        <form className="row g-2" role="search" onSubmit={handleSubmit}>
          <div className="col-sm">
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={value.keyword}
                onChange={(e) => {
                  setValue({ ...value, keyword: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="col-sm-auto">
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>

    )
}

export default SearchInput
