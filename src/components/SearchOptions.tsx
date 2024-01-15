// import { searchOptions } from "../constants/searchData"
import "../styles/searchOptions.css"

type searchOptionPropsType = {options : searchDataType,setchips:any, setfilteredOptions:any}

const SearchOptions = ({options, setchips,setfilteredOptions} : searchOptionPropsType) => {

  const handleOptionSelect = (newData:any)=> {
    setchips((prev : any)=>{
      return [...prev,{ image: newData.image, name: newData.name, id:newData.id, isActive:false}]
    })

    setfilteredOptions((prev:searchDataType)=>{
      return prev.filter(data => data.id != newData.id)
    })
  }

  return (
    <div className="SearchOptions"
    onClick={(e)=>{
      e.stopPropagation();
    }}
    >
        {
          options.map((option,indx)=>{
            return(
              <div key={indx} className="option" onClick={()=>handleOptionSelect(option)}>
                <img src={option.image} alt="" />
                <h4>{option.name}</h4>
                <p>{option.email}</p>
              </div>
            )
          })
        }
    </div>
  )
}

export default SearchOptions