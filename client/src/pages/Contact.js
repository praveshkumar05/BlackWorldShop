import React from 'react'
import Layout from '../components/Layout.js/Layout'
import './Contact.css'
const Contact = () => {
  return (
    <Layout title={"Danger :Time Traveller Is Not Available"} author={"Black Adam"} keyword={"Dark"}>
        <div className="contact">
      <h1>Contact Us</h1>
      <p>"We don't know what we're doing, but we're doing it together."</p>
      <p>If you have any questions or suggestions for our website, please feel free to reach out to us using the contact form below. We'll get back to you as soon as we can.</p>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Your email address" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" placeholder="Your message" required></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
    </Layout>
  )
}

export default Contact
