import {
  BAND_FILTER_KEY_NAME_MAP,
  BandFilterKeyType,
  countActiveFilters,
  emptyValueChecker,
  RangeFilterValue,
} from 'utils/sorting/band-filtering';
import { ButtonMenu } from './button-menu';
import {
  Button,
  Checkbox,
  Chip,
  MenuItem,
  Slider,
  Stack,
  TextField,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import {
  selectFestivalBands,
  selectRelevantUsers,
} from 'state/festival-details/selectors';

import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useMemo, useState } from 'react';
import {
  actionApplyFilterFolowers,
  actionApplyFilterSearch,
  actionApplyFilterUserVotes,
  actionClearFilterFolowers,
  actionClearFilterSearch,
  actionClearFilterUserVotes,
} from 'state/sort-slice/actions';
import { formatFolowersNumber } from 'utils/formating';
import {
  selectBandFilter,
  selectBandFilterFollowers,
  selectBandFilterSearch,
  selectBandFilterUserVotes,
} from 'state/sort-slice/selectors';

const UserVotesSubmenu = () => {
  const [selectedUsers, selectUsers] = useState<string[]>(
    useSelector(selectBandFilterUserVotes)
  );
  const dispatch = useDispatch();
  const relevantUsers = useSelector(selectRelevantUsers);

  const applyFilter = () => {
    dispatch(actionApplyFilterUserVotes(selectedUsers));
  };

  const clearFilter = () => {
    selectUsers([]);
    dispatch(actionClearFilterUserVotes());
  };

  const handleUserClick = (user_id: string) => {
    const index = selectedUsers.indexOf(user_id);
    if (index === -1) {
      selectUsers([...selectedUsers, user_id]);
    } else {
      selectUsers([
        ...selectedUsers.slice(0, index),
        ...selectedUsers.slice(index + 1),
      ]);
    }
  };

  return (
    <>
      {relevantUsers?.map((user) => (
        <MenuItem onClick={() => handleUserClick(user.user_id)}>
          <Checkbox checked={selectedUsers.indexOf(user.user_id) !== -1} />
          {user.user_nickname}
        </MenuItem>
      ))}
      <FilterControls onApply={applyFilter} onClear={clearFilter} />
    </>
  );
};

const FollowersSubmenu = () => {
  const [followerRange, setFollowerRange] = useState<RangeFilterValue>(
    useSelector(selectBandFilterFollowers)
  );
  const dispatch = useDispatch();
  const bands = useSelector(selectFestivalBands);

  const maxRange = useMemo<RangeFilterValue>(
    () =>
      bands?.reduce(
        (acc, band) => {
          if (band.details.followers < acc[0]) acc[0] = band.details.followers;
          if (band.details.followers > acc[1]) acc[1] = band.details.followers;
          return acc;
        },
        [Infinity, 0]
      ) ?? [0, Infinity],
    [bands]
  );

  const applyFilter = () => {
    dispatch(actionApplyFilterFolowers(followerRange));
  };

  const clearFilter = () => {
    setFollowerRange([0, Infinity]);
    dispatch(actionClearFilterFolowers());
  };

  return (
    <>
      <MenuItem disableRipple sx={{ px: 4, pt: 4, width: '300px' }}>
        <Slider
          value={followerRange}
          max={maxRange[1]}
          min={maxRange[0]}
          valueLabelDisplay='on'
          valueLabelFormat={formatFolowersNumber}
          onChange={(_, newValue) =>
            setFollowerRange(newValue as RangeFilterValue)
          }
        />
      </MenuItem>
      <FilterControls onApply={applyFilter} onClear={clearFilter} />
    </>
  );
};

const SearchSubmenu = () => {
  const [search, setSearch] = useState(useSelector(selectBandFilterSearch));
  const dispatch = useDispatch();

  const applyFilter = () => {
    dispatch(actionApplyFilterSearch(search));
  };

  const clearFilter = () => {
    setSearch('');
    dispatch(actionClearFilterSearch());
  };

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <MenuItem disableRipple>
        <TextField value={search} size='small' onChange={handleChange} />
      </MenuItem>
      <FilterControls onApply={applyFilter} onClear={clearFilter} />
    </>
  );
};

interface FilterControlsProps {
  onApply: () => void;
  onClear: () => void;
}

const FilterControls = ({ onApply, onClear }: FilterControlsProps) => (
  <Stack
    direction='row'
    sx={{ px: 2, py: 0.75 }}
    justifyContent='space-between'
  >
    <Button color='secondary' variant='outlined' onClick={onClear}>
      Clear
    </Button>
    <Button color='secondary' variant='outlined' onClick={onApply}>
      Apply
    </Button>
  </Stack>
);

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
