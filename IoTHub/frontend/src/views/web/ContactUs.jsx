import React from 'react'
import '../style/ContacUs.css';
import Chatbot from '../shop/Chatbot';

function ContactUs() {
  return (
    <div className="contact-us-page">
    <section className="contact-section">
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-paragraph">We'd love to hear from you! Please reach out to us using any of the methods below:</p>

      <div className="contact-info">
        <p><strong>Email:</strong> <a href="mailto:iothub@support.com">iothub@support.com</a></p>
        <p><strong>Phone:</strong> <a href="tel:012013193193">012-013-193193</a></p>
      </div>

      <div className="chatnow-container">
      
      </div>
    </section>
    <Chatbot></Chatbot>
  </div>
  )
}

export default ContactUs