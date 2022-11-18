import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3333/",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const jwtToken = await localStorage.getItem("token");;

    config.headers["Content-Type"] = "application/json";
    config.headers["Authorization"] = `Bearer ${jwtToken}`;

    return config;
  },
  (error) => {}
);

export default axiosInstance;
