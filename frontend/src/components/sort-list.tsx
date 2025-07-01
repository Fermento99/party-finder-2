import {
  Button,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionChangeSort } from 'state/sort-slice/actions';
import { selectBandSort } from 'state/sort-slice/selectors';
import {
  BAND_SORT_KEYS,
  BandSort,
  BandSortKeyType,
} from 'utils/sorting/band-sorting';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export const SortList = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const dispatch = useDispatch();
  const bandSort = useSelector(selectBandSort);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const applySort = (sortKey: BandSortKeyType) => {
    dispatch(actionChangeSort([...bandSort, { key: sortKey, value: 'Desc' }]));
  };

  const cycleSort = (sortKey: BandSortKeyType) => {
    const newBandSort = bandSort.map((entry) => {
      if (entry.key === sortKey) {
        if (entry.value === 'Asc') {
          return { key: sortKey, value: 'Desc' };
        } else {
          return { key: sortKey, value: 'Asc' };
        }
      }

      return entry;
    });

    dispatch(actionChangeSort(newBandSort as BandSort));
  };

  const removeSort = (sortKey: BandSortKeyType) => {
    const index = bandSort.findIndex(({ key }) => key === sortKey);
    const newBandSort = bandSort.toSpliced(index, 1);
    dispatch(actionChangeSort(newBandSort));
  };

  const selectedKeys = bandSort.map(({ key }) => key);

  return (
    <>
      <Button
        ref={menuButtonRef}
        color='secondary'
        variant='outlined'
        onClick={openMenu}
      >
        Sort
        {bandSort.length > 0 && (
          <Chip sx={{ ml: 1 }} size='small' label={bandSort.length} />
        )}
      </Button>
      <Menu
        open={isMenuOpen}
        onClose={closeMenu}
        anchorEl={menuButtonRef.current}
      >
        {bandSort.map(({ key, value }) => (
          <MenuItem onClick={() => removeSort(key)}>
            <Stack
              direction='row'
              sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography>{key}</Typography>
              <IconButton
                size='small'
                onClick={(event) => {
                  event.stopPropagation();
                  cycleSort(key);
                }}
              >
                {value === 'Asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
              </IconButton>
            </Stack>
          </MenuItem>
        ))}
        <Divider />
        {BAND_SORT_KEYS.map((value) =>
          selectedKeys.includes(value) ? null : (
            <MenuItem onClick={() => applySort(value)}>
              <Typography>{value}</Typography>
            </MenuItem>
          )
        )}
      </Menu>
    </>
  );
};
