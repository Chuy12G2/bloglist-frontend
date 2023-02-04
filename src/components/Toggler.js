import { useState, useImperativeHandle, forwardRef } from "react"

const Toggler =forwardRef (({label, children}, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible =  { display: visible ? 'none' : ''}
  const showWhenVisible =  { display: visible ? '' : 'none'}

  const changeVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      changeVisibility
    }
  })

  return(
  <div>
    <button style={hideWhenVisible} onClick={changeVisibility}>{label}</button>
    <div style={showWhenVisible}>
      <button  onClick={changeVisibility}>Cancel</button>
      {children} 
    </div>
  </div>
  )
})

export default Toggler