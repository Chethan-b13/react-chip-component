import { useState } from "react"
import { searchOptions } from "../constants/searchData"
import "../styles/mainPage.css"
import Chip from "./Chip"
import SearchOptions from "./SearchOptions"


const MainInput = () => {

    const [showOptions, setshowOptions] = useState(false)
    const [filteredOptions, setfilteredOptions] = useState(searchOptions);
    const [chips, setchips] = useState<chipData | []>([]);    

    const handleInputChange = (event:any) => {
        const inputValue = event?.target.value;
        if (inputValue.trim() === ""){
            const idArray = chips.map(user => user.id);
            const searchedData = searchOptions.filter(data => {
                return !idArray.includes(data.id)
            })
            setfilteredOptions(searchedData);
             
        }else{
            const idArray = filteredOptions.map(user => user.id);
            const searchedData = searchOptions.filter(data => {
                const condition1 = data.name.includes(inputValue) || data.email.includes(inputValue) 
                const condition2 = idArray.includes(data.id)
                return condition1 && condition2
            })
            setfilteredOptions(searchedData)
        }
    }

    const handleRemoveChip = (id:number)=> {
        setchips((prev : chipData)=>{
          return prev.filter(chip => chip.id!==id)
        })

        const removedData = searchOptions.find(user => user.id === id)
    
        setfilteredOptions((prev:any)=>{
          return [removedData, ...prev]
        })
    }

    const handleBackspacePress = (e:any)=> {
        const inputValue = e?.target.value;
        const recentChip = chips[chips.length -1]
        if (inputValue.trim() === "" && e.key === "Backspace" && recentChip){
            if(recentChip.isActive){
                handleRemoveChip(recentChip.id)
            }else{
                const newChipList = [...chips]
                newChipList[newChipList.length-1] = { ...newChipList[newChipList.length - 1], isActive: true };
                setchips(newChipList)
            }
            
        }
    }

    return (
        <div className="mainContainer" onClick={()=>{
            const newChipsArray = chips.map(obj => ({ ...obj, isActive: false }));
            setchips(newChipsArray)
            setshowOptions(false)
        }}>
            <div className="centerContainer">
                <div className="inputContainer"
                onClick={(e)=>{
                    e.stopPropagation()
                }}
                >
                    {
                        chips &&
                        <div className="chipHolder">
                            {
                                chips.map((data,indx)=>{
                                    return(
                                        <Chip key={indx} data={data} handleRemoveChip={handleRemoveChip} />
                                    )
                                })
                            }
                        </div>
                    }
                    <input 
                    placeholder="Search by name or email"
                    onFocus={()=>{setshowOptions(true)}}
                    onChange={(e)=>handleInputChange(e)}  
                    onKeyDown={(e)=>{handleBackspacePress(e)}}
                    type="text" 

                    />
                {
                    showOptions && <SearchOptions options={filteredOptions} setchips={setchips} setfilteredOptions={setfilteredOptions} />
                }
                </div>
            </div>
        </div>
    )
}

export default MainInput