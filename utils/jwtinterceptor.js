import axios from "axios";

export default function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    const hasToken = Boolean(
      localStorage.getItem("sb-etraoduqrzijngbazoib-auth-token")
    );
    if (hasToken) {
      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${localStorage.getItem(
          "sb-etraoduqrzijngbazoib-auth-token"
        )}`,
      };
    }
    console.log(1);
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
