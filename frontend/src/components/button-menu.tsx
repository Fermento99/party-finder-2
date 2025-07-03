import { Button, ButtonProps, Menu, MenuItem } from '@mui/material';
import { useRef, useState, ReactNode, RefObject } from 'react';

interface ButtonMenuProps {
  buttonLabel: ReactNode | string;
  children?: ReactNode | ReactNode[];
  buttonProps?: ButtonProps;
  autohide?: boolean;
  submenu?: boolean;
}

export const ButtonMenu = ({
  buttonLabel,
  children,
  buttonProps,
  autohide = true,
  submenu = false,
}: ButtonMenuProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <ButtonComponent
        submenu={submenu}
        ref={menuButtonRef}
        openMenu={openMenu}
        buttonProps={buttonProps}
      >
        {buttonLabel}
      </ButtonComponent>
      <Menu
        open={isMenuOpen}
        onClose={closeMenu}
        anchorEl={menuButtonRef.current}
        onClick={autohide ? closeMenu : () => {}}
      >
        {children}
      </Menu>
    </>
  );
};

interface ButtonComponentProps {
  submenu: boolean;
  buttonProps?: ButtonProps;
  children: ReactNode;
  ref: RefObject<null>;
  openMenu: () => void;
}

const ButtonComponent = ({
  submenu,
  buttonProps,
  children,
  ref,
  openMenu,
}: ButtonComponentProps) => {
  return submenu ? (
    <MenuItem onClick={openMenu} ref={ref}>
      {children}
    </MenuItem>
  ) : (
    <Button
      color='secondary'
      variant='outlined'
      ref={ref}
      onClick={openMenu}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};
