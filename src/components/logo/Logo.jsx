import React from 'react'
import homePhoto from "../../photo/home.png"
import "./Logo.css"


export default function Logo() {
  return (
    <div className="img-pic">
<img src={homePhoto} alt='TruHome Apparels' />
<div className="text"></div>
    </div>
  )
}
