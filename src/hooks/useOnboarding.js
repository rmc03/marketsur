import { useState } from 'react';

const SEEN_KEY = 'marketsur-onboarding-done';

export function useOnboarding() {
  const [show, setShow] = useState(() => !localStorage.getItem(SEEN_KEY));
  return { show, done: () => setShow(false) };
}
