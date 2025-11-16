//validate:
// at least 6 charcters
// 1 uppercase
// 1 lowercae
//1 digit
// sppecial characters

export const validator = (password ="", confirmPassword = "") => {
    const error = [];

    password.length < 6 && error.push("Atleast 6 charcters required");

    !/[A-Z]/.test(password) && error.push("Password must contain atleast one UPPERCASE letter");

    !/[a-z]/.test(password) && error.push("Password must contain atleast one LOWERCASE letter");

    !/[0-9]/.test(password) && error.push("Password must contain atleast one number");

    !/[!@#$%^&*()<>?{}|]/.test(password) && error.push("Password must contain atleast one speical character letter");

    password !==confirmPassword && error.push("Password does not match")

    return error;
 


}