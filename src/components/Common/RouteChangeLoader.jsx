import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { startLoader, stopLoader } from "../../utilis/loader"
export default function RouteChangeLoader() {
  const location = useLocation();

  useEffect(() => {
    startLoader();
    const timeout = setTimeout(() => {
      stopLoader();
    }, 300);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return null;
}
