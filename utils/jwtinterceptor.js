import axios from "axios";

export default function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    const hasToken = Boolean(
      localStorage.getItem("sb-etraoduqrzijngbazoib-auth-token")
    );
    const token = localStorage.getItem("sb-etraoduqrzijngbazoib-auth-token");
    const access_token = JSON.parse(token).access_token;

    if (hasToken) {
      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${access_token}`,
      };
    }
    return req;
  });

  axios.interceptors.response.use(
    (req) => {
      return req;
    },
    (error) => {
      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        window.localStorage.removeItem("sb-etraoduqrzijngbazoib-auth-token");
      }

      return Promise.reject(error);
    }
  );
}
