import  "../../styles/common/footer.css"
import { FaFacebook, FaXTwitter, FaLinkedin,  FaInstagram  } from "react-icons/fa6";
const Footer = () => {
  return (
    <section style={{background : "#000000", color : "#BFBFBF", fontFamily : "Poppins", display : "flex", flexDirection : "column", justifyContent : "space-between", gap : "40px"}}>
      <section
      className="footer-content-container"
      style={{display : "flex", justifyContent : "space-between", alignItems : "flex-start",
        color : "#BFBFBF", fontFamily : "Poppins", padding : "50px 50px"
      }}
      >
<div style={{display : "flex", flexDirection :"column", justifyContent : "flex-start", alignItems  : "flex-start", gap : "10px"}}>
<span style={{color : "white", fontWeight : "800"}}>Support</span>
<span>Help Centre</span>
<span>Safety Information</span>
<span>Cancellation Operations</span>
</div>
<div style={{display : "flex", flexDirection :"column", justifyContent : "flex-start", alignItems  : "flex-start", gap : "10px"}}>
<span style={{color : "white", fontWeight : "800"}}>Company</span>
<span>About Us</span>
<span>Privacy Policy</span>
<span>Community Blog</span>
<span>Terms of Service</span>
</div>
<div style={{display : "flex", flexDirection :"column", justifyContent : "flex-start", alignItems  : "flex-start", gap : "10px"}}>
<span style={{color : "white", fontWeight : "800"}}>Contact</span>
<span>FAQ</span>
<span>Get in touch</span>
<span>Partnerships</span>
</div>
<div style={{display : "flex", flexDirection :"column", justifyContent : "flex-start", alignItems  : "flex-start", gap : "10px"}}>
<span style={{color : "white", fontWeight : "800"}}>Social</span>
<div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", gap : "10px", cursor : "pointer"
}}>
<FaFacebook size={20} color="white"/>
<FaXTwitter size={20}  color="white"/>
<FaLinkedin size={20}  color="white"/>
<FaInstagram size={20}  color="white"/>

</div>


</div>
</section>
<section style={{display : "flex", flexDirection : "column", gap : "40px", padding : "20px 30px"}}>
  <hr style={ { width : "90vw", color : "#BFBFBF",
 borderTop : "0.4px solid #BFBFBF", height  : "1px", padding : "0"

  }}/>
  <div>
  &copy; Copyright FOLBEN {new Date().getFullYear()}
  </div>

</section>

    </section>
  )
}

export default Footer