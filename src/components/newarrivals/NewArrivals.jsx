import React from 'react'
import palaza from "../../photo/1.png"
import dress from "../../photo/2.png"
import skirt from "../../photo/3.png"
import "./NewArrivals.css"

export default function NewArrivals() {
  return (
    <div className='arrivals'>
        <h2>New Arrivals</h2>
        <div className='products'>
           < img src={palaza} alt ="new"/>
            < img src={dress} alt ="new"/>
             < img src={skirt} alt ="new"/>

        </div>
    </div>
  )
}
