import { Checkbox, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRelevantUsers } from 'state/festival-details/selectors';
import {
  actionApplyFilterUserVotes,
  actionClearFilterUserVotes,
} from 'state/sort-slice/actions';
import { selectBandFilterUserVotes } from 'state/sort-slice/selectors';
import { SubmenuControls } from './submenu-controls';
import { SubmenuOptionsProps } from './types';

export const UserVotesSubmenu = ({ closeMenu }: SubmenuOptionsProps) => {
  const [selectedUsers, selectUsers] = useState<string[]>(
    useSelector(selectBandFilterUserVotes)
  );
  const dispatch = useDispatch();
  const relevantUsers = useSelector(selectRelevantUsers);

  const applyFilter = () => {
    dispatch(actionApplyFilterUserVotes(selectedUsers));
    closeMenu();
  };

  const clearFilter = () => {
    selectUsers([]);
    dispatch(actionClearFilterUserVotes());
    closeMenu();
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

  const handleSelectAll = () => {
    if (selectedUsers.length < (relevantUsers?.length ?? 0)) {
      selectUsers(relevantUsers?.map(({ user_id }) => user_id) ?? []);
    } else {
      selectUsers([]);
    }
  };

  return (
    <>
      <MenuItem onClick={handleSelectAll}>
        <Checkbox
          indeterminate={
            selectedUsers.length > 0 &&
            selectedUsers.length < (relevantUsers?.length ?? 0)
          }
          checked={selectedUsers.length === relevantUsers?.length}
        />
        Select All
      </MenuItem>
      {relevantUsers?.map((user) => (
        <MenuItem onClick={() => handleUserClick(user.user_id)}>
          <Checkbox checked={selectedUsers.indexOf(user.user_id) !== -1} />
          {user.user_nickname}
        </MenuItem>
      ))}
      <SubmenuControls onApply={applyFilter} onClear={clearFilter} />
    </>
  );
};
