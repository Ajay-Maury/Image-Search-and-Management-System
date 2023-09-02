import _ from "lodash";
import validator from "validator";

export type LoaderStatus = "idle" | "loading" | "failed" | "success";

export const getToken = () =>{
  const localStorageData = localStorage.getItem('persist:userToken') ;
const token = localStorageData ?  JSON.parse(localStorageData)?.token || "" : "";
return token.substring(1, token.length - 1)
}

export const getTokenHeader = () => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };
  return headers
  }

export const isUserLoggedin = () => {
      return !_.isEmpty(getToken())
    }

export const isEmailValid = (applicantEmail: string): boolean => {
    return validator.isEmail(`${applicantEmail}`.trim());
  };
  
  export const isPasswordValid = (password: string): boolean => {
    return validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
    });
  };