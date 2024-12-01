import { defineStore } from "pinia";
import {ref} from 'vue'
import { LocalStorage } from "quasar";

export const userDetails=defineStore('userdetails',()=>{
  let name=ref('')
  let email=ref('')
  let password=ref('')
  let confirmPassword=ref('')
  let isLoggedIn=ref(false)
  let isSubmitting=ref('')
  let error=ref('')
  const validateLogin=()=>{
    if(!name.value||!password.value){
        error.value="All the fields are required"
        return false
      }
      const details=JSON.parse(LocalStorage.getItem('userDetails'))
    if(name.value===details.name && password.value===details.password){
      error.value='Congratulations,successfully login'
      return true
    }
    else{
      error.value='unmatched user credentials'
      return false
    }

  }
  const validateSignup=()=>{
    if(password.value!==confirmPassword.value){
      error.value="the passwords doesn't match"
      return false
    }
    else if(!name.value||!email.value||!password.value||!confirmPassword.value){
      error.value="All fields are required"
      return false
    }
     else{
      error.value=''
      return true
     }
  }
  const login=async()=>{
    if (validateLogin()){
      isSubmitting.value=true
      setTimeout(()=>{
       isLoggedIn.value=true
       isSubmitting.value=false
      },1000)
    }

  }
  const resetState=()=>{
    name.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
    error.value = "";
  }
  const signup=(router)=>{
    if(validateSignup()){
      isSubmitting.value=true
      setTimeout(()=>{
        isSubmitting.value=false
        router.push({'path':'login'})
        LocalStorage.set('userDetails',JSON.stringify({
          name:name.value,
          email:email.value,
          password:password.value,
          isLoggedIn:isLoggedIn.value
        }))
        resetState();
      })
    }
  }
  return {name,email,password,confirmPassword,isLoggedIn,isSubmitting,error,login,signup,validateLogin,validateSignup}

})
