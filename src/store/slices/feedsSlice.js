import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as firebaseStore from '../../services/firebase';
import { getFeedInfo as fetchFeedInfo } from '../../services/feed';

const initialState = {
    entities: {},
    feedInfo: {},
    status: 'idle',
};

export const addFeed = createAsyncThunk(
    'feeds/addFeed',
    async (data, { dispatch }) => {
        const documentSnapshot = await firebaseStore.addFeed(data);
        const { name, url, bookmarked } = data;
        return { id: documentSnapshot.id, name, url, bookmarked };
    },
    {
        condition: (_, { getState }) => {
            const { feeds: { status } } = getState();
            if (status === 'loading') {
                return false
            }
            return true;
        },
    }
);

export const getFeeds = createAsyncThunk(
    'feeds/getFeeds',
    async (uid) => {
        const documentSnapshots = await firebaseStore.getFeeds(uid);
        if (documentSnapshots) {
            const entities = {}
            documentSnapshots.forEach(doc => {
                const feedId = doc.id;
                const { name, url, bookmarked } = doc.data();
                entities[feedId] = { name, url, bookmarked };
            });
            return { entities };
        }
    },
    {
        condition: (_, { getState }) => {
            const { feeds: { status } } = getState();
            if (status === 'loading') {
                return false
            }
            return true;
        },
    }
);

export const getFeed = createAsyncThunk(
    'feeds/getFeed',
    async (feedId) => {
        const documentSnapshot = await firebaseStore.getFeed(feedId);
        if (documentSnapshot) {
            const feedId = documentSnapshot.id;
            const { name, url, bookmarked } = documentSnapshot.data();
            return { id: feedId, name, url, bookmarked };
        }
    },
    {
        condition: (_, { getState }) => {
            const { feeds: { status } } = getState();
            if (status === 'loading') {
                return false
            }
            return true;
        },
    }
);

export const updateFeed = createAsyncThunk(
    'feeds/updateFeed',
    async (data, { getState }) => {
        const { feedId, ...restUpdateData } = data;
        const { feeds: { entities } } = getState();
        const currentData = entities[feedId];
        await firebaseStore.updateFeed(feedId, restUpdateData);
        return { ...currentData, ...restUpdateData, id: feedId };
    },
    {
        condition: (_, { getState }) => {
            const { feeds: { status } } = getState();
            if (status === 'loading') {
                return false
            }
            return true;
        },
    }
);

export const deleteFeed = createAsyncThunk(
    'feeds/deleteFeed',
    async (feedId) => {
        await firebaseStore.deleteFeed(feedId);
        return { id: feedId };
    },
    {
        condition: (_, { getState }) => {
            const { feeds: { status } } = getState();
            if (status === 'loading') {
                return false
            }
            return true;
        },
    }
);

export const getFeedInfo = createAsyncThunk(
    'feeds/getFeedInfo',
    async (feedId) => {
        const data = await fetchFeedInfo(feedId);
        if (data) {
            return data;
        }
    },
    {
        condition: (_, { getState }) => {
            const { feeds: { status } } = getState();
            if (status === 'loading') {
                return false
            }
            return true;
        },
    }
);

const feedSlice = createSlice({
    name: 'feeds',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addFeed.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addFeed.fulfilled, (state, action) => {
                const { id, name, url, bookmarked } = action.payload;
                state.entities[id] = { name, url, bookmarked };
                state.status = 'idle';
            })
            .addCase(getFeeds.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getFeeds.fulfilled, (state, action) => {
                const { entities } = action.payload;
                if (entities) state.entities = entities;
                state.status = 'idle';
            })
            .addCase(getFeedInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getFeedInfo.fulfilled, (state, action) => {
                const { feed, items } = action.payload;
                if (feed && items)
                    state.feedInfo = {
                        feed, items
                    };
                state.status = 'idle';
            })
            .addCase(getFeed.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getFeed.rejected, (state) => {
                state.status = 'idle';
            })
            .addCase(getFeed.fulfilled, (state, action) => {
                const { id, name, url, bookmarked } = action.payload;
                state.entities[id] = { name, url, bookmarked };
                state.status = 'idle';
            })
            .addCase(updateFeed.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateFeed.fulfilled, (state, action) => {
                const { id, name, url, bookmarked } = action.payload;
                state.entities[id] = { name, url, bookmarked };
                state.status = 'idle';
            })
            .addCase(deleteFeed.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteFeed.fulfilled, (state, action) => {
                const { id } = action.payload;
                delete state.entities[id];
                state.status = 'idle';
            })
    },
});


export default feedSlice.reducer;