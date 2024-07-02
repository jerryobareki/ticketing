import { useState } from "react";
import axios from "axios";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axios[method.toLowerCase()](url, {
        ...body,
        ...props,
      });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        // Server responded with errors
        setErrors(
          <div className="alert alert-danger">
            <h4>Ooops...</h4>
            <ul className="my-0">
              {err.response.data.errors.map((err, index) => (
                <li key={index}>{err.message}</li>
              ))}
            </ul>
          </div>
        );
      } else {
        // Unexpected error structure, handle accordingly
        console.error("Unexpected error format:", err);
        setErrors(
          <div className="alert alert-danger">
            <h4>Ooops... Something went wrong.</h4>
          </div>
        );
      }
    }
  };

  return { doRequest, errors };
};

export default useRequest;
