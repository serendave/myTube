const firebaseAPIKey = "API_KEY";

export const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseAPIKey}`;
export const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseAPIKey}`;
export const userInfoUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseAPIKey}`;
