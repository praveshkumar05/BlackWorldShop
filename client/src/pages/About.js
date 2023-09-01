import React from 'react'
import Layout from '../components/Layout.js/Layout'
import './about.css'

const About = () => {
  return (
    <Layout title={"You are Diving INTO Dark World "} author={"Black Adam"} keyword={"Dark"}>
        <div className="about">
      <h1>About Us</h1>
      <p>We are a team of passionate developers and designers who are committed to creating software that makes a positive impact on the world.</p>
      <p>Our mission is to create technology that helps people connect, learn, and grow in meaningful ways.</p>
      <p>We believe that every little bit of good we do can make a big difference in the world. That's why we donate a portion of our profits to charities that support education, environmental sustainability, and social justice.</p>
      <p>Thank you for supporting our mission!</p>
    </div>
    </Layout>
  )
}

export default About
