import {
  Chip,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionAddSort,
  actionCycleSort,
  actionRemoveSort,
} from 'state/sort-slice/actions';
import { selectBandSort } from 'state/sort-slice/selectors';
import { BAND_SORT_KEYS, BandSortKeyType } from 'utils/sorting/band-sorting';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ButtonMenu } from './button-menu';
import { useMenuStateHook } from 'utils/hooks';

export const SortList = () => {
  const [isMenuOpen, openMenu, closeMenu] = useMenuStateHook();
  const dispatch = useDispatch();
  const bandSort = useSelector(selectBandSort);

  const applySort = (sortKey: BandSortKeyType) => {
    dispatch(actionAddSort(sortKey));
  };

  const cycleSort = (sortKey: BandSortKeyType) => {
    dispatch(actionCycleSort(sortKey));
  };

  const removeSort = (sortKey: BandSortKeyType) => {
    dispatch(actionRemoveSort(sortKey));
  };

  const selectedKeys = bandSort.map(({ key }) => key);

  return (
    <ButtonMenu
      isOpen={isMenuOpen}
      openMenu={openMenu}
      closeMenu={closeMenu}
      buttonLabel={
        <>
          Sort
          {bandSort.length > 0 && (
            <Chip sx={{ ml: 1 }} size='small' label={bandSort.length} />
          )}
        </>
      }
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
    </ButtonMenu>
  );
};
