import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addFeed as firestoreAddFeed, getFeeds as firestoreGetFeeds, updateFeed as firestoreUpdateFeed, deleteFeed as firestoreDeleteFeed, getFeed as firestoreGetFeed } from '../../services/firebase';
import { getFeedInfo as fetchFeedInfo } from '../../services/feed';

const initialState = {
    entities: {},
    feedInfo: {},
    status: 'idle',
};

export const addFeed = createAsyncThunk(
    'feeds/addFeed',
    async (data, { dispatch }) => {
        const documentSnapshot = await firestoreAddFeed(data);
        const { name, url, bookmarked } = data;
        return { id: documentSnapshot.id, name, url, bookmarked };
    }
);

export const getFeeds = createAsyncThunk(
    'feeds/getFeeds',
    async (uid) => {
        const documentSnapshots = await firestoreGetFeeds(uid);
        if (documentSnapshots) {
            const entities = {}
            documentSnapshots.forEach(doc => {
                const feedId = doc.id;
                const { name, url, bookmarked } = doc.data();
                entities[feedId] = { name, url, bookmarked };
            });
            return { entities };
        }
    }
);

export const getFeed = createAsyncThunk(
    'feeds/getFeed',
    async (feedId) => {
        const documentSnapshot = await firestoreGetFeed(feedId);
        if (documentSnapshot) {
            const feedId = documentSnapshot.id;
            const { name, url, bookmarked } = documentSnapshot.data();
            return { id: feedId, name, url, bookmarked };
        }
    }
);

export const updateFeed = createAsyncThunk(
    'feeds/updateFeed',
    async (data, { getState }) => {
        const { feedId, ...restUpdateData } = data;
        const { feeds: { entities } } = getState();
        const currentData = entities[feedId];
        console.log(currentData);
        await firestoreUpdateFeed(feedId, restUpdateData);
        return { ...currentData, ...restUpdateData, id: feedId };
    }
);

export const deleteFeed = createAsyncThunk(
    'feeds/deleteFeed',
    async (feedId) => {
        await firestoreDeleteFeed(feedId);
        return { id: feedId };
    }
);

export const getFeedInfo = createAsyncThunk(
    'feeds/getFeedInfo',
    async (feedId) => {
        const data = await fetchFeedInfo(feedId);
        if (data) {
            return data;
        }
    }
);

const userSlice = createSlice({
    name: 'feeds',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addFeed.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addFeed.fulfilled, (state, action) => {
                if (state.status === 'loading') {
                    const { id, name, url, bookmarked } = action.payload;
                    state.entities[id] = { name, url, bookmarked };
                    state.status = 'idle';
                }
            })
            .addCase(getFeeds.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getFeeds.fulfilled, (state, action) => {
                if (state.status === 'loading') {
                    const { entities } = action.payload;
                    if (entities) state.entities = entities;
                    state.status = 'idle';
                }
            })
            .addCase(getFeedInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getFeedInfo.fulfilled, (state, action) => {
                if (state.status === 'loading') {
                    const { feed, items } = action.payload;
                    if (feed && items)
                        state.feedInfo = {
                            feed, items
                        };
                    state.status = 'idle';
                }
            })
            .addCase(getFeed.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getFeed.fulfilled, (state, action) => {
                if (state.status === 'loading') {
                    const { id, name, url, bookmarked } = action.payload;
                    state.entities[id] = { name, url, bookmarked };
                    state.status = 'idle';
                }
            })
            .addCase(updateFeed.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateFeed.fulfilled, (state, action) => {
                if (state.status === 'loading') {
                    const { id, name, url, bookmarked } = action.payload;
                    state.entities[id] = { name, url, bookmarked };
                    state.status = 'idle';
                }
            })
            .addCase(deleteFeed.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteFeed.fulfilled, (state, action) => {
                if (state.status === 'loading') {
                    const { id } = action.payload;
                    delete state.entities[id];
                    state.status = 'idle';
                }
            })
    },
});


export default userSlice.reducer;