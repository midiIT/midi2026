import { useEffect, useRef, useState } from "react";

export default function useInView(options = { threshold: 0.8}) : [React.RefObject<HTMLDivElement | null> , boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false); 
        }
      },
      options
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return [ref, visible];
}
