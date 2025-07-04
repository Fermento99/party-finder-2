import { Button, ButtonProps, Menu, MenuItem } from '@mui/material';
import { useRef, ReactNode, RefObject, MouseEvent } from 'react';

interface ButtonMenuProps {
  buttonLabel: ReactNode | string;
  children?: ReactNode | ReactNode[];
  buttonProps?: ButtonProps;
  submenu?: boolean;
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

export const ButtonMenu = ({
  buttonLabel,
  children,
  buttonProps,
  isOpen,
  openMenu,
  closeMenu,
  submenu = false,
}: ButtonMenuProps) => {
  const menuButtonRef = useRef(null);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.blur();
    openMenu();
  };

  return (
    <>
      <ButtonComponent
        submenu={submenu}
        ref={menuButtonRef}
        openMenu={handleOpenMenu}
        buttonProps={buttonProps}
      >
        {buttonLabel}
      </ButtonComponent>
      <Menu open={isOpen} onClose={closeMenu} anchorEl={menuButtonRef.current}>
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
  openMenu: (event: MouseEvent<HTMLElement>) => void;
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
