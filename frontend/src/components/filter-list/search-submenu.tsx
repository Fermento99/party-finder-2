import { MenuItem, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionApplyFilterSearch,
  actionClearFilterSearch,
} from 'state/sort-slice/actions';
import { selectBandFilterSearch } from 'state/sort-slice/selectors';
import { SubmenuControls } from './submenu-controls';

export const SearchSubmenu = () => {
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
      <SubmenuControls onApply={applyFilter} onClear={clearFilter} />
    </>
  );
};
