
import "../../styles/account/register.css"
import register from "../../assets/images/register.jpg"
import ReCAPTCHA from "./ReCAPTCHA";
import { useNavigate } from 'react-router-dom';
import bus from "../../assets/images/bus.png"
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
const Login = () => {
  const navigate = useNavigate(); 
  return (
    <>
    <div className='register-page-full-section'>
        <div className='register-page-left-section'>
          <h2 className="register-form-title">Welcome Back!</h2>
<div className="register-form">
<div className="input-wrapper">
  <input type="text" placeholder="Gmail" className="input-field" />
  <span className="input-icon">  <MdOutlineEmail /></span>
</div>
<div className="input-wrapper">
  <input type="text" placeholder="Password" className="input-field" />
  <span className="input-icon">  <MdLockOutline /></span>
</div>

</div>
<div className="button-commander">
<button className="register-form-button">

  Signup

</button>
<span>
{"Don't"} Have an Account? <span style={{color : "#8473F3", cursor : "pointer"}}
onClick={() => {
  navigate("/register")
}}
>Register Here</span>
</span>
{/* <ReCAPTCHA /> */}
</div>
        </div>
        <div  className='register-page-right-section'>
          <div className="safest-ride">
            <h2 style={{whiteSpace : "wrap"}}>
            The safest <br />ride is just 
            <br />
            around the corner
            </h2>
            </div>
            <img src={register} className="register-background"/>
            <img src={bus} style={{position : "absolute", width : "35%", bottom : "30px", right : "220px"}}/>
        </div>
    </div>
    </>
  )
}

export default Login