import React from 'react'

const ContactDetails = (props) => {
  return (
    <div>
      <section className={`contacts bg-${props.mode} text-${props.cardText}`}>
        <div className="container">
            <div className="row">
                <div className="col-md-5">
                    <div className="contact-left">
                        <h3>Let's Connect!</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus sed deleniti maxime ipsam est fuga voluptates, consequuntur maiores labore delectus pariatur distinctio dolor incidunt esse facilis rerum molestiae veniam!</p>
                        <div className={`contact-email bg-${props.mode} text-${props.cardText}`}><i className="fa-solid fa-at"></i> support@B4M.com</div>
                        <div className={`contact-phone bg-${props.mode} text-${props.cardText}`}><i className="fa-solid fa-phone"></i> +123 456 7890</div>
                        <div className={`contact-address bg-${props.mode} text-${props.cardText}`}><i className="fa-solid fa-location-dot"></i> New Plaza, Kathmandu</div>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className={`contact-details bg-${props.textColor}`}>
                        <p>Please fill out the form below with your query or message. We strive to respond to all inquiries within 24 hours or before.</p>
                        <div className="contact-name">
                            <p>Your Name</p>
                            <div className="cont-name"><input type="name" className='form-control' placeholder='Enter your name' /></div>
                        </div>
                        <div className="contact-Email">
                            <p>Your Email Address</p>
                            <div className="cont-Email"><input type="email" className='form-control' placeholder='Enter your email' /></div>
                        </div>
                        <div className="contact-subject">
                            <p>What's this about?</p>
                            <div className="cont-subject"><input type="text" className='form-control' placeholder='Enter the subject' /></div>
                        </div>
                        <div className="contact-message">
                            <p>Message Box</p>
                            <div className="cont-message"><textarea type="message" rows={5} cols={100} className='form-control' placeholder='Please type your message here' /></div>
                        </div>
                        <div className="contact-button">
                            <button className="contact-btn">Send Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="contact-map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11214.343334649528!2d85.31964981768887!3d27.708126811951363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1748350076314!5m2!1sen!2snp" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </section>
    </div>
  )
}

export default ContactDetails
