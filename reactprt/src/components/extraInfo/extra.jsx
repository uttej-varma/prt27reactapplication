import "./extra.css"
const Extra=(props)=>{
    const displayOff=()=>{
        props.urr[props.number]=false;
        // console.log(props.urr);
        props.setUrr(new Array(props.urr.length).fill(false));
    }
    return(
        <>
       <div className="extramainContainer">
       <div className="extraContainer">
            <div>
                <button onClick={displayOff}>Go Back</button>
            </div>
            <ul>
                <li>{props.data.Mfr_Name}</li>
                <li>{props.data.Mfr_ID}</li>
                <li>{props.data.Country}</li>
            </ul>
        </div>
       </div>
        </>
    )
}
export default Extra;