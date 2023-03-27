import axios from "axios"
const Api=()=>{
    const check=()=>{
         axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/GetEquipmentPlantCodes/2015?format=json").then((res)=>{
            console.log(res.data.Results)
         })
    }
    return(
        <>
        <button onClick={check}>check</button>
        </>
    )
}
export default Api;