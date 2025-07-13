// src/components/Loader.jsx
import { Loader2 } from "lucide-react";

const Loader = ({ size = 32, className = "" }) => (
  <div className={`flex justify-center items-center min-h-[60vh] text-white ${className}`}>
    <Loader2 className="animate-spin" size={size} />
  </div>
);

export default Loader;