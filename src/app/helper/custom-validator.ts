import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordValidator(control:AbstractControl):ValidationErrors|null {

    const password=control.value;
    if(!password){
        return null
    }

// 
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[\W_]/.test(password); // Special characters
  const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && password.length >= 8;

  return isValid ? null : { weakPassword: true };
// 

}
