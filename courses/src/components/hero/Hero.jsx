import React from 'react'
import "./Hero.css"
import Stats from '../stats/Stats'

import ButtonCustom from '../button/ButtonCustom'
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <>
    <div className="hero">

<h1 className='good'>
  <span>
    We only <span class="text-highlight">teach</span>
    <br/>
    what we are really <br/>
    really <span class="italic">good</span> at.
  </span>
</h1>
<div className="flex">
<div className="center">
<Link to="/courses">

<ButtonCustom text={"Check Courses-Make an Impact"}/>
</Link>
</div>
</div>
   <Stats></Stats>
    </div>

</>
  )
}

export default Hero