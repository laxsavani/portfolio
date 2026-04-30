import { useInView } from 'react-intersection-observer';

export const useScrollReveal = () => {
  const [ref, inView] = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  return { ref, inView };
};
