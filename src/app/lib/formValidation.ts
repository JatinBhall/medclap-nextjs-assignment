"use server"

export default async function formValidation(
    userName:string,
    email:string,
    age:number, 
    requiredAge:number, 
    medicalCondition:string
){

    let result = true; // pass

    if(userName.length<3){
        result = false;
        return {result,errorType:"name", errorMessage:"Please enter at least 3 characters."}
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)){
        result = false;
        return {result,errorType:"email", errorMessage:"Invalid email address."}
    }
    
    if(age<requiredAge){
        result = false;
        return {result,errorType:"age", errorMessage:`You must be ${requiredAge} years or older to proceed`}
    }
    
    if(medicalCondition.length<10){
        result = false;
        return {result,errorType:"medicalCondition", errorMessage:"Please enter at least 10 characters."}
    }

    return{result};
}