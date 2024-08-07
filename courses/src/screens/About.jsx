import React from 'react'
import AboutHero from '../components/abouthero/AboutHero'
import AboutJourney from '../components/aboutjourney/AboutJourney'
import Instructor from '../components/instructor/Instructor'

const About = () => {
  return (
    <div><AboutHero></AboutHero>
    
    <AboutJourney></AboutJourney>
    <Instructor></Instructor>
    </div>
  )
}

export default About