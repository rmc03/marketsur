import { useState } from 'react';

const SEEN_KEY = 'marketsur-onboarding-done';

export function useOnboarding() {
  const [show, setShow] = useState(() => !localStorage.getItem(SEEN_KEY));
  
  const done = () => {
    localStorage.setItem(SEEN_KEY, 'true');
    setShow(false);
  };
  
  return { show, done };
}
