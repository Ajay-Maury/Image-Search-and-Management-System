import validator from "validator";

export type LoaderStatus = "idle" | "loading" | "failed" | "success";

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