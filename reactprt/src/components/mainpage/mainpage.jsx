import "./mainpage.css";
// import {data} from "../../dummy";
import { useState } from "react";
import Extra from "../extraInfo/extra";
import { useEffect } from "react";
import axios from "axios";
const MainPage=()=>{
    
    const [search,setSearch]=useState("");
    const [drop,setDrop]=useState("");
    const [searchData,setSearchData]=useState([]);
    const [data,setData]=useState([]);
    const [arr,setArr]=useState(new Array(data.length).fill(false));
    const [type,setType]=useState(new Array(data.length).fill("unknown"));
    useEffect(()=>{
        axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json").then((res)=>{
           setData(res.data.Results)
        //    console.log(res.data)
        res.data.Results.map((val,index)=>{
            val.VehicleTypes.map((data,ind)=>{
                 if(data.IsPrimary===true)
                 {
                    type[index]=data.Name;
                    setType([...type])
                 }
                 
            })
        })
         }).catch((err)=>{console.log(err)});
    },[])
    const displayOn=(val)=>{
        arr[val]=true;
        setArr([...arr]);
    }
    const filterBySearch=(val)=>{
        setSearch(val);
        let xrr=data.filter((value,index)=>{
            return value.Mfr_CommonName!==null && value.Mfr_CommonName.toLowerCase().includes(search.toLowerCase());
        })
        setSearchData([...xrr]);
    }
    // const dropDownSearch=(val)=>{
    //     setDrop(val);
    //     let xrr=data.filter((value,index)=>{
    //         return 
    //     })
    //     setSearchData([...xrr]);
    // }
    return(
        <>
          <div className="mainPageContainer">
             <h1>VEHICLE MANUFACTURERS</h1>
             <div className="mainPagesearchContainer">
                     <div>
                      <span>Search:</span>  
                     <input type="text" placeholder="search by name" value={search} onChange={(e)=>{filterBySearch(e.target.value)}}/>
                     </div>
                     <div>
                        <span>Filter By vehicle type:</span>
                        {/* onChange={(e)=>{dropDownSearch(e.target.value)}} */}
                        <select >   
                            <option>All</option>
                            <option value="Passenger Car">Passenger Car</option>
                            <option value="Truck">Truck</option>
                            <option>Multi purpose vehicle</option>
                            <option>Trailer</option>
                            <option value="Low Speed Vehicle (LSV)">Low speed Vehicle</option>
                            <option>off road vehicle</option>
                            <option>Bus</option>
                            <option>Incomplete Vehicle</option>
                        </select>
                     </div>
             </div>
             <table className="tableContainer">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {search.length>0?
                    searchData.map((value,index)=>{
                        return(
                            <tr key={index} onClick={()=>{displayOn(index)}}>
                               <td>{value.Mfr_CommonName}</td>
                               <td>{value.Country}</td>
                               <td>{type[index]}</td>
                               {/* <td>{arr[index]===true?<Extra data={value} number={index} urr={arr} setUrr={setArr}/>:null}</td> */}
                            </tr>
                            
                        )
                    })
                    :data.map((value,index)=>{
                        return(
                            <tr key={index} onClick={()=>{displayOn(index)}}>
                               <td>{value.Mfr_CommonName}</td>
                               <td>{value.Country}</td>
                               <td>{type[index]}</td>
                               {/* <td>{arr[index]===true?<Extra data={value} number={index} urr={arr} setUrr={setArr}/>:null}</td> */}
                            </tr>
                            
                        )
                    })}
                </tbody>
             </table>
             {
                data.map((value,index)=>{
                    return(
                        arr[index]===true?<Extra data={value} number={index} urr={arr} setUrr={setArr}/>:null
                    )
                })
             }
          </div>
        </>
    )
}
export default MainPage;