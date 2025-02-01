
import "../../styles/account/register.css"
import register from "../../assets/images/register.jpg"
import { useNavigate } from 'react-router-dom';
import bus from "../../assets/images/bus.png"
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
const Register = () => {
  const navigate = useNavigate(); 
  return (
    <>
    <div className='register-page-full-section'>
        <div className='register-page-left-section'>
          <h2 className="register-form-title">Get Started Now</h2>
<div className="register-form">
{/* <input placeholder="Username"/>
<input placeholder="Gmail"/>
<input placeholder="Password"/>
<input placeholder="Matric Number"/>
<input placeholder="University"/> */}
<div className="input-wrapper">
  <input type="text" placeholder="Username" className="input-field" />
  <span className="input-icon">  <FaRegUser /></span>
</div>
<div className="input-wrapper">
  <input type="text" placeholder="Gmail" className="input-field" />
  <span className="input-icon">  <MdOutlineEmail /></span>
</div>
<div className="input-wrapper">
  <input type="text" placeholder="Password" className="input-field" />
  <span className="input-icon">  <MdLockOutline /></span>
</div>
<div className="input-wrapper">
  <input type="text" placeholder="Matric Number" className="input-field" />
  <span className="input-icon">  <FaUserGraduate /></span>
</div>
<div className="input-wrapper">
  <input type="text" placeholder="University" className="input-field" />
  <span className="input-icon">  <FaUniversity /></span>
</div>

</div>
<div className="button-commander">
<button className="register-form-button">

  Signup

</button>
<span>
Have an Account? <span style={{color : "#8473F3", cursor : "pointer"}}
onClick={() => {
  navigate("/login")
}}
>Log in</span>
</span>
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

export default Register