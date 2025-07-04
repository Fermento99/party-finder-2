import {
  BAND_FILTER_KEY_NAME_MAP,
  BandFilterKeyType,
  countActiveFilters,
  emptyValueChecker,
} from 'utils/sorting/band-filtering';
import { ButtonMenu } from '../button-menu';
import { Button, Chip, Stack } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionClearFilterFolowers,
  actionClearFilterSearch,
  actionClearFilterUserVotes,
} from 'state/sort-slice/actions';
import { selectBandFilter } from 'state/sort-slice/selectors';
import { UserVotesSubmenu } from './user-vote-submenu';
import { FollowersSubmenu } from './follower-submenu';
import { SearchSubmenu } from './search-submenu';
import { useMenuStateHook } from 'utils/hooks';

const getOptions = (key: BandFilterKeyType) => {
  switch (key) {
    case 'userVotes':
      return UserVotesSubmenu;
    case 'followers':
      return FollowersSubmenu;
    case 'search':
      return SearchSubmenu;
  }
};

interface SubmenuProps {
  submenuType: BandFilterKeyType;
  closeParent: () => void;
}

const Submenu = ({ submenuType, closeParent }: SubmenuProps) => {
  const [isMenuOpen, openMenu, closeMenu] = useMenuStateHook();
  const bandFilter = useSelector(selectBandFilter);

  const OptionsComponent = getOptions(submenuType);

  return (
    <ButtonMenu
      submenu
      isOpen={isMenuOpen}
      openMenu={openMenu}
      closeMenu={closeMenu}
      buttonLabel={
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          sx={{ width: '100%' }}
        >
          {BAND_FILTER_KEY_NAME_MAP[submenuType]}
          {emptyValueChecker(submenuType, bandFilter[submenuType]) ? (
            <CircleIcon fontSize='small' color='secondary' sx={{ ml: 2 }} />
          ) : null}
        </Stack>
      }
    >
      {
        <OptionsComponent
          closeMenu={() => {
            closeMenu();
            closeParent();
          }}
        />
      }
    </ButtonMenu>
  );
};

export const FilterList = () => {
  const [isMenuOpen, openMenu, closeMenu] = useMenuStateHook();
  const bandFilter = useSelector(selectBandFilter);
  const dispatch = useDispatch();

  const filterCount = countActiveFilters(bandFilter);

  const clearAllFilters = () => {
    dispatch(actionClearFilterFolowers());
    dispatch(actionClearFilterSearch());
    dispatch(actionClearFilterUserVotes());
    closeMenu();
  };

  return (
    <>
      <ButtonMenu
        isOpen={isMenuOpen}
        openMenu={openMenu}
        closeMenu={closeMenu}
        buttonLabel={
          <>
            Filter
            {filterCount > 0 && (
              <Chip sx={{ ml: 1 }} size='small' label={filterCount} />
            )}
          </>
        }
      >
        {Object.keys(bandFilter).map((submenuType) => (
          <Submenu
            submenuType={submenuType as BandFilterKeyType}
            closeParent={closeMenu}
            key={submenuType}
          />
        ))}
        <Button
          variant='outlined'
          color='secondary'
          onClick={clearAllFilters}
          sx={{ mx: 2, my: 0.75 }}
        >
          Clear all filters
        </Button>
      </ButtonMenu>
    </>
  );
};
