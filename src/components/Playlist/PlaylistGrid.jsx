import { Fade } from "react-awesome-reveal";

export default function PlaylistGrid({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Fade cascade duration={1000} damping={0.2} triggerOnce>
        {children}
      </Fade>
    </div>
  );
}
