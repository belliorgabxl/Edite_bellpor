"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./signup.module.css"
import Navbar from "@/components/Navbar";

export default function register_page(){
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [cpw , setCPW] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const handleSubmitt = async (e) => {
    e.preventDefault();

    let name = document.getElementById("f_name").value +" "+ document.getElementById("l_name").value;
    let state = document.querySelector('input[name="status"]:checked').value;
    if(!username || !password || !email){
      console.log("you are not send email , password or username");
      alert("Username Password of Email are required");
    }
    else{
          if(cpw != password ){
            alert("password and cornfirm password is wrong");
          }
          else if (password.length<5){
            alert("password is must be long than 5 characters");
          }
        else{
            try{
              const res = await fetch("http://localhost:3000/api/User/getUser", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({ username,password,email,phone,name,state}),
              });
              if (res.ok) {
                router.push("/signup/verify");
              } else {
                throw new Error("Failed to create User");
              }
            }catch(e){
              console.log(e);
              alert(e);
            }
          }
      }
  }

  return (<>
  <Navbar/>
  <div className={styles.body}>
    <div className={styles.container}>
        <div className={styles.register_title}>
        <form  className={styles.register_form} onSubmit={handleSubmitt}>
            <div className={styles.title_font}>
            Sign Up
            </div>
        
            <input 
            onChange={(e) => setUsername(e.target.value)} 
            type="text" value={username} 
            placeholder="Username" className={styles.username_box}/>
            <input 
            onChange={(e) => setEmail(e.target.value)} 
            type="text" value={email}
            placeholder="Email" className={styles.email_box}/>
            
            <div className={styles.name_form} >
            <input className={styles.firstname_box}  
            type="text" placeholder="Firstname" id="f_name" />

            <input className={styles.lastname_box}
            type="text" placeholder="Lastname" id="l_name" />
            </div>

            <input type="text" placeholder="Tel." 
             onChange={(e) => setPhone(e.target.value)} value={phone}
            className={styles.tel_box}/>
            
            <input  
            onChange={(e) => setPassword(e.target.value)} 
            type="password"  value={password}
            placeholder="Password" className={styles.pw_box}/>
            
            <input 
            onChange={(e) => setCPW(e.target.value)} 
            type="password"  value={cpw}
            placeholder="Confirm Password" className={styles.pw_box}/>

            <div className={styles.status_form} >

            <input className={styles.r1_box} 
            type="radio"  name="status"  value="customer"/>
            <label className={styles.l1}>customer</label>

            <input  className={styles.r2_box}
            type="radio" name="status" value="seller"/>
            <label className={styles.l2}>seller</label>
            </div>
            <button className={styles.re_btn} type="submit">
            Sign Up
            </button>
        </form>
        </div>
    </div>
    </div>
    </>
  );
}