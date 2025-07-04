import { MenuItem, Slider } from '@mui/material';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFestivalBands } from 'state/festival-details/selectors';
import {
  actionApplyFilterFolowers,
  actionClearFilterFolowers,
} from 'state/sort-slice/actions';
import { selectBandFilterFollowers } from 'state/sort-slice/selectors';
import { RangeFilterValue } from 'utils/sorting/band-filtering';
import { SubmenuControls } from './submenu-controls';
import { formatFolowersNumber } from 'utils/formating';
import { SubmenuOptionsProps } from './types';

export const FollowersSubmenu = ({ closeMenu }: SubmenuOptionsProps) => {
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
    closeMenu();
  };

  const clearFilter = () => {
    setFollowerRange([0, Infinity]);
    dispatch(actionClearFilterFolowers());
    closeMenu();
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
      <SubmenuControls onApply={applyFilter} onClear={clearFilter} />
    </>
  );
};
