import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // Server-side rendering (req is available)
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // Client-side rendering
    return axios.create({
      baseURL: "/", // Adjust baseURL as per your client-side API endpoint
    });
  }
};

export default buildClient;
