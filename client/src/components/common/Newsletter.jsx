import  "../../styles/common/newsletter.css"
import { FaPaperPlane } from "react-icons/fa";
const Newsletter = () => {
  return (
    <section style={{display : "flex", flexDirection :"row", alignItems : "center", justifyContent : "center"}}>
          <span className="newsletter-sender-button">
    <FaPaperPlane style={{ transform: "rotate(360deg)" }} size={25} color="white"/>
    </span>
<div
className="subscription-box"
style={{backgroundColor : "#F0EDF4", 
    borderTopLeftRadius : "90px", borderBottomLeftRadius : "20px", borderBottomRightRadius : "20px"
}}>
    <div style={{display : "flex", flexDirection : "column", gap :"10px"}}>

    <span style={{display : "flex", alignItems : "center", justifyContent : "center", fontWeight  : "700"
    , fontFamily  : "Poppins", fontSize : "2rem", whiteSpace : "wrap" 
    }}>
        
    Subscribe to get information 
    <br />
    and latest news about Folben
    </span>
    <span  style={{display : "flex", alignItems : "center", justifyContent : "center", }}>
    <input 
    className="newsletter-input"
  placeholder="Enter your email"
    />
    <button className="newsletter-design-button">
      Subscribe</button>
      <span className="round-button">
    <FaPaperPlane style={{ transform: "rotate(-360deg)" }} size={25} color="white"/>
    </span>
    {/* <div className="newsletter-input-wrapper">
      <input type="text" placeholder="Enter your email" className="newsletter-input-field" />
      <span className="newsletter-input-icon">  <MdOutlineEmail /></span>
    </div> */}
    </span>
    </div>


</div>
    </section>
  )
}

export default Newsletter