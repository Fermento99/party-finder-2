import { useState } from 'react';

export const useMenuStateHook = (): [boolean, () => void, () => void] => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return [isMenuOpen, openMenu, closeMenu];
};
