
// email reqex
export const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;


// In a file named passwordRegex.js

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;



// In a file named mobileNumberRegex.js

export const indianNumberRegex = /^(\+91-|91-|0)?[6789]\d{9}$/;


export const nameRegex = /^[a-zA-Z-' ]{2,50}$/;