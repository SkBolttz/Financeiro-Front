import { useEffect, useRef, useState, cloneElement } from "react";

export default function ScrollRevealAvancado({
  children,
  delay = 500,
  stagger = 300, 
  from = "bottom",
  duration = 1000, 
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const translateMap = {
    bottom: "translate-y-10",
    left: "-translate-x-64",
    right: "translate-x-64",
  };
  const initialTranslate = translateMap[from] || "translate-y-10";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const enhancedChildren =
    Array.isArray(children) && children.length > 1
      ? children.map((child, index) =>
          cloneElement(child, {
            style: {
              transitionDelay: `${delay + index * stagger}ms`,
              transitionDuration: `${duration}ms`,
              ...(child.props.style || {}),
            },
            className: `${child.props.className || ""} transition-all ease-[cubic-bezier(0.6,0.05,0.1,0.9)] transform ${
              isVisible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${initialTranslate}`
            }`,
          })
        )
      : children;

  return (
    <div
      ref={ref}
      className={`relative transition-colors duration-700 ${
        isVisible ? "bg-transparent" : "bg-black/40"
      }`}
    >
      {enhancedChildren}
    </div>
  );
}
