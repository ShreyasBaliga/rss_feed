import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addFeed as firestoreAddFeed, getFeeds as firestoreGetFeeds } from '../../services/firebase';
import { getFeedInfo as fetchFeedInfo } from '../../services/feed';

const initialState = {
    entities: {},
    feedInfo: {}
};

export const addFeed = createAsyncThunk(
    'feeds/addFeed',
    async (data) => {
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
        builder.addCase(addFeed.fulfilled, (state, action) => {
            const { id, name, url, bookmarked } = action.payload;
            state.entities[id] = { id, name, url, bookmarked };
        }).addCase(getFeeds.fulfilled, (state, action) => {
            const { entities } = action.payload;
            if (entities)
                state.entities = entities;
        })
        .addCase(getFeedInfo.fulfilled, (state, action) => {
            const { feed, items } = action.payload;
            if (feed && items)
                state.feedInfo = {
                    feed, items
                };
        })
    },
});


export default userSlice.reducer;