import jwt_decode from "jwt-decode";

export default function getExpirationTime(token) {
  const decode = jwt_decode(token);
  return new Date(decode.exp * 1000);
}

export function deltaTime(token) {
  const tokenExpTime = getExpirationTime(token);
//   console.log(tokenExpTime)
  const now = new Date();
  return (tokenExpTime - now);
}
