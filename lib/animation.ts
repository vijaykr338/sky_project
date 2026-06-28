import gsap from "gsap";

export function animateSignature(path: SVGPathElement) {
  const length = path.getTotalLength();

  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });

  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 26,
  });
}