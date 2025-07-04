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

const getOptions = (key: BandFilterKeyType) => {
  switch (key) {
    case 'userVotes':
      return <UserVotesSubmenu />;
    case 'followers':
      return <FollowersSubmenu />;
    case 'search':
      return <SearchSubmenu />;
  }
};

export const FilterList = () => {
  const bandFilter = useSelector(selectBandFilter);
  const dispatch = useDispatch();

  const filterCount = countActiveFilters(bandFilter);

  const clearAllFilters = () => {
    dispatch(actionClearFilterFolowers());
    dispatch(actionClearFilterSearch());
    dispatch(actionClearFilterUserVotes());
  };

  return (
    <>
      <ButtonMenu
        autohide={false}
        buttonLabel={
          <>
            Filter
            {filterCount > 0 && (
              <Chip sx={{ ml: 1 }} size='small' label={filterCount} />
            )}
          </>
        }
      >
        {Object.keys(bandFilter).map((key) => (
          <ButtonMenu
            submenu
            autohide={false}
            buttonLabel={
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                sx={{ width: '100%' }}
              >
                {BAND_FILTER_KEY_NAME_MAP[key as BandFilterKeyType]}
                {emptyValueChecker(
                  key as BandFilterKeyType,
                  bandFilter[key as BandFilterKeyType]
                ) ? (
                  <CircleIcon
                    fontSize='small'
                    color='secondary'
                    sx={{ ml: 2 }}
                  />
                ) : null}
              </Stack>
            }
          >
            {getOptions(key as BandFilterKeyType)}
          </ButtonMenu>
        ))}
        <Button
          variant='outlined'
          color='secondary'
          onClick={clearAllFilters}
          sx={{ mx: 2 }}
        >
          Clear all filters
        </Button>
      </ButtonMenu>
    </>
  );
};
