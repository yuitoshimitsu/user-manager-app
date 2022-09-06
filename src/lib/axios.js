import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_REQRES_API,
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer e2cffcfc5a1cce203c3362ee7f36319e97f9002159dcd657b28f7a7ef739639f"
  },
});
