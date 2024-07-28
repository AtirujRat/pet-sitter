import axios from "axios";

export default function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    const hasToken = Boolean(
      localStorage.getItem("sb-etraoduqrzijngbazoib-auth-token")
    );
    const encodeToken = btoa(
      unescape(
        encodeURIComponent(
          localStorage.getItem("sb-etraoduqrzijngbazoib-auth-token")
        )
      )
    );
    if (hasToken) {
      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${encodeToken}`,
      };
    }
    // console.log(req);
    return req;
  });

  axios.interceptors.response.use(
    (req) => {
      return req;
    },
    (error) => {
      console.log(error);
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
