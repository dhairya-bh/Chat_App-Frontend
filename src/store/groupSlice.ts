import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '.';
import {
  fetchGroups as fetchGroupsAPI,
  createGroup as createGroupAPI,
} from '../utils/api';
import { CreateGroupParams, Group, User } from '../utils/types';

export interface GroupState {
  groups: Group[];
}

const initialState: GroupState = {
  groups: [],
};

export const fetchGroupsThunk = createAsyncThunk('groups/fetch', () => {
  return fetchGroupsAPI();
});

export const createGroupThunk = createAsyncThunk(
  'groups/create',
  (params: CreateGroupParams) => createGroupAPI(params)
);

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<Group>) => {
      state.groups.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGroupsThunk.fulfilled, (state, action) => {
      state.groups = action.payload.data;
    });
  },
});

const selectGroups = (state: RootState) => state.groups.groups;
const selectGroupId = (state: RootState, id: string) => id;

export const selectGroupById = createSelector(
  [selectGroups, selectGroupId],
  (groups, groupId) => groups.find((g) => g.id === groupId)
);

export const { addGroup } = groupsSlice.actions;

export default groupsSlice.reducer;