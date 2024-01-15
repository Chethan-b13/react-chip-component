import "../styles/chip.css"


type ChipPropsType = {
    data : SingleChipData,
    handleRemoveChip : any,
}

const Chip = (props : ChipPropsType) => {

    return (
        <div className="chipContainer" style={{border:props.data.isActive?"2px solid black":"none"}}>
            <div className="profileImage">
                <img src={props.data.image} alt={props.data.name} />
            </div>
            <p>{props.data.name}</p>
            <div onClick={()=>{props.handleRemoveChip(props.data.id)}} className="deleteButton">
                <span>X</span>
            </div>
        </div>
    )
}

export default Chip