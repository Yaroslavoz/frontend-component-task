/* eslint-disable */

import React,{ useState , useEffect } from 'react'

const Table = () => {
  const [isOpen,  setOpen] = useState(false)
  const [roles, setRole] = useState([
    {id: 0, title: "User", selected: ['FCreate', 'FUpdate', 'FView', 'FShare', 'GCreate', 'GUpdate', 'GView', 'GShare']},
    {id: 1, title: "Member", selected: ['FView', 'FShare', 'GView', 'GShare']},
    {id: 2, title: "Admin", selected: ['FCreate', 'FUpdate', 'FView', 'FShare', 'FMove', 'FDelete', 'GCreate', 'GUpdate', 'GView', 'GShare', 'GMove', 'GDelete']},
    {id: 3, title: "Custom", selected: []},
    {id: 4, title: "View-only", selected: ['FView', 'GView']},
  ])
  const [buttonTitle, setButtonTitle] = useState(roles[4].title)
  
  const foldersRights = [
    {title: 'Create', id: 'FCreate'},
    {title: 'Update', id: 'FUpdate'},
    {title: 'Move', id: 'FMove'},
    {title: 'Delete', id: 'FDelete'},
    {title: 'View', id: 'FView'},
    {title: 'Share', id: 'FShare'}]
  const gemsRights = [
    {title: 'Create', id: 'GCreate'},
    {title: 'Update', id: 'GUpdate'},
    {title: 'Move', id: 'GMove'},
    {title: 'Delete', id: 'GDelete'},
    {title: 'View', id: 'GView'},
    {title: 'Share', id: 'GShare'}]
  const [checkboxState, setCheckboxValue] = useState(['FView', 'GView'])
  const [savedValues, setSaved] = useState(false)

  
      
    console.log('checkboxState: ', checkboxState)


    useEffect(()=>{
      setCheckboxValue(roles.find(role => role.title==='Custom').selected)
    }, [roles])
    
    const checkboxHandler = (e, id) => {
      e.preventDefault()
      setRole( roles.map(roleObj => 
        roleObj.title==='Custom'
      ?roleObj.selected.includes(id)
      ?{...roleObj, selected: roleObj.selected.filter(i => i !== id)}
      :{...roleObj, selected:[...roleObj.selected, id]}
      : roleObj) 
      
      )
    }
    const handleSaved = (e) => {
      e.preventDefault()
      setSaved(saved => !saved)
    }
    const menuHandler = (e, sel, title) => {
      e.preventDefault()
      setCheckboxValue(sel)
      setButtonTitle(title)
      setOpen(isOpen => !isOpen)
    }   
 
  return (


    <>
      <div>
      <div className=" rounded bg-white opacity-75 overflow-hidden  shadow-lg text-center mt-20 pt-5">
        <div className="flex flex-start align-center  h-8">

          <div className="py-1">
            <span className="text-base  mx-4 ">User Role</span>
          </div>
          <div className="flex flex-col ">
          <button className="h-8 bg-white opacity-75 hover:bg-gray-200 text-gray-700 font-semibold hover:text-black  px-4 border border-gray-200 hover:border-transparent outline-none rounded" onClick={()=>setOpen(isOpen => !isOpen)}>
            {buttonTitle} {isOpen? <i className="fas fa-angle-up"></i>:<i className="fas fa-angle-down"></i>}
          </button>
          {isOpen ? 
          (<ul className="z-10">
            {roles.map((role)=>(
              <li className="m-0 p-0" key={role.id} >
              <button className="text-gray-500 h-8 w-full bg-white hover:bg-gray-200 hover:text-gray-800 font-semibold px-4 border-b-1" onClick={(e)=> menuHandler(e, role.selected, role.title)} >{role.title}</button>
            </li>
            ))}
            
          </ul>)
          :null}
        </div>
        </div>


      <table className="table-auto text-center content-around">
        {/* ===================  Folders table ===========================*/}
        <thead >
          <tr>
            <th colSpan={6} key="tfolders" align="left" className="pl-4 pt-6 ">Folders</th>
          </tr>
        </thead>

        <tbody>
          <tr key="foldersrow">{foldersRights.map((check) =>(
          <td className="px-4 py-2 pb-6 border-bottom" key={check.id} >
            {buttonTitle==='Custom'
            ?(<><img src={checkboxState.includes(check.id) ? '/images/check.png': '/images/uncheck.png'} alt="checkbox" className="h-4 inline mr-2" onClick={(e)=> checkboxHandler(e, check.id)} />
            {check.title}</>)
            :<><img src={checkboxState.includes(check.id) ? '/images/check.png': '/images/uncheck.png'} alt="checkbox" className="h-4 inline mr-2" />
            {check.title}</>
            }
          </td>))}
          </tr>
          <tr>
            <td colSpan={6}><div className="mx-4 border-b-2 border-gray-200 "></div></td>
          </tr>

        </tbody>
        {/* ===================  Gems table ===========================*/}
        <thead >
          <tr>
            <th colSpan={6} key="tgems" align="left" className="pl-4 pt-6 ">Gems</th>
          </tr>
        </thead>

        <tbody>
          <tr key="gemsrow">{gemsRights.map((check) =>(
          <td className="px-4 py-2 pb-6 border-bottom" key={check.id} >
          {buttonTitle==='Custom'
          ?(<><img src={checkboxState.includes(check.id) ? '/images/check.png': '/images/uncheck.png'} alt="checkbox" className="h-4 inline mr-2" onClick={(e)=> checkboxHandler(e, check.id)} />
          {check.title}</>)
          :(<><img src={checkboxState.includes(check.id) ? '/images/check.png': '/images/uncheck.png'} alt="checkbox" className="h-4 inline mr-2" />
          {check.title}</>)
          }
        </td>))}
        </tr>
      </tbody>
    </table>

      </div>
      <div className="block mt-8">
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 w-64" onClick={handleSaved}>
            Save
        </button>
      </div>
        { savedValues ? (
          <div className=" rounded bg-white opacity-75 overflow-hidden  shadow-lg text-left mt-10 py-3  pl-10">
            <p className="font-black text-2xl">{buttonTitle}</p>
            <p className="text-xl font-semibold">Folders rights</p>
            <ul className="divide-x divide-gray-900">
              {roles.find((val) => val.title === buttonTitle).selected.filter(item => item.charAt() === "F").map(it => (
                <li key={it} className="inline px-3 leading-loose ">{it.slice(1)}</li>
                ))}
            </ul>
            <p className="text-xl font-semibold">Gems rights</p>
            <ul className="divide-x divide-gray-900">
              {roles.find((val) => val.title === buttonTitle).selected.filter(item => item.charAt() === "G").map(it=> (
                <li key={it} className="inline px-3 leading-loose">{it.slice(1)}</li>
                ))}
            </ul>

          </div>
        ): null}
      
    </div>
    </>
  )
}


export default Table
