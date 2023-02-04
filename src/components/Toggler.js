import { useState } from "react"

const Toggler = ({label, children}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible =  { display: visible ? 'none' : ''}
  const showWhenVisible =  { display: visible ? '' : 'none'}

  const changeVisility = () => {
    setVisible(!visible)
  }

  return(
  <div>
    <button style={hideWhenVisible} onClick={changeVisility}>{label}</button>
    <div style={showWhenVisible}>
      <button  onClick={changeVisility}>Cancel</button>
      {children} 
    </div>
  </div>
  )
}

export default Toggler