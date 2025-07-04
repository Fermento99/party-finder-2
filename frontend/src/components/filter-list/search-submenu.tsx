import { Box, TextField } from '@mui/material';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionApplyFilterSearch,
  actionClearFilterSearch,
} from 'state/sort-slice/actions';
import { selectBandFilterSearch } from 'state/sort-slice/selectors';
import { SubmenuControls } from './submenu-controls';
import { SubmenuOptionsProps } from './types';

export const SearchSubmenu = ({ closeMenu }: SubmenuOptionsProps) => {
  const [search, setSearch] = useState(useSelector(selectBandFilterSearch));
  const dispatch = useDispatch();

  const applyFilter = () => {
    dispatch(actionApplyFilterSearch(search));
    closeMenu();
  };

  const clearFilter = () => {
    setSearch('');
    dispatch(actionClearFilterSearch());
    closeMenu();
  };

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearch(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (event.key === 'Enter') {
      applyFilter();
    }
  };

  return (
    <>
      <Box sx={{ px: 2, py: 1 }}>
        <TextField
          autoFocus
          size='small'
          placeholder='Search band name'
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </Box>
      <SubmenuControls onApply={applyFilter} onClear={clearFilter} />
    </>
  );
};
