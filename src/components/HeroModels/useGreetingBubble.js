import { useCallback, useEffect, useRef, useState } from "react";

/** How long the avatar's greeting bubble stays up after each wave. */
export const BUBBLE_MS = 4800;

/**
 * State for the avatar's greeting bubble: `greet()` shows it (and restarts
 * the timer), and it hides itself `ms` later. `bubbleRef` goes on the
 * overlay element that the avatar's ScreenAnchor keeps above its head.
 */
export const useGreetingBubble = (ms = BUBBLE_MS) => {
  const bubbleRef = useRef(null);
  const timer = useRef(null);
  const [greeting, setGreeting] = useState(false);

  const greet = useCallback(() => {
    setGreeting(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setGreeting(false), ms);
  }, [ms]);
  useEffect(() => () => clearTimeout(timer.current), []);

  return { bubbleRef, greeting, greet };
};
