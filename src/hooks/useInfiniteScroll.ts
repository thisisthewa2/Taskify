import { useEffect, useRef } from 'react';

interface Props {
  handleScroll: () => void;
  initialList: any[] | undefined;
  dependency: any[] | undefined;
  options?: {
    root: null | Element;
    rootMargin?: string;
    threshold: number;
  };
}

const useInfiniteScroll = ({
  handleScroll,
  initialList,
  dependency,
  options = {
    root: null,
    threshold: 0.6,
  },
}: Props) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!initialList) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) handleScroll();
      });
    }, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, dependency);

  return containerRef;
};

export default useInfiniteScroll;
