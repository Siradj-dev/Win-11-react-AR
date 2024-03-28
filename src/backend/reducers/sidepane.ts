import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { appDispatch, render_message, store } from '.';
import { BuilderHelper } from './helper';
import { Contents } from './locales';

export type Notification = {
    urlToImage?: string;
    url?: string;
    name?: string;
    title: string;
    type: 'pending' | 'fulfilled' | 'rejected';
    content?: string;
};

export type Message = {
    url?: string;

    name: string;
    timestamp: string;
    content: string;
};

type Data = {
    notifications: Notification[];
    message: Message[];

    quicks: any[];
    hide: boolean;
    banhide: boolean;
};

const initialState: Data = {
    quicks: [
        {
            ui: true,
            src: 'FiVideoOff',
            name: [Contents.VIDEO_TOGGLE],
            state: 'active',
            action: 'toggle_remote_async'
        },
        {
            ui: true,
            src: 'MdOutlineResetTv',
            name: [Contents.RESET_VIDEO],
            state: 'network.airplane',
            action: 'hard_reset_async'
        },
        {
            ui: true,
            src: 'FaWindows',
            name: [Contents.HOMESCREEN],
            action: 'remote/homescreen'
        },
        {
            ui: true,
            src: 'MdFullscreen',
            name: [Contents.FULLSCREEN],
            state: 'fullscreen',
            action: 'remote/toggle_fullscreen'
        },
        {
            ui: true,
            src: 'MdKeyboard',
            name: [Contents.SCAN_CODE],
            state: 'scancode',
            action: 'remote/scancode_toggle'
        },
        {
            ui: true,
            src: 'FaExternalLinkAlt',
            name: [Contents.EXTERNAL_TAB],
            state: 'old_version',
            action: 'remote/remote_version'
        },
        {
            ui: true,
            src: 'FaMousePointer',
            name: [Contents.RELATIVE_MOUSE],
            state: 'relative_mouse',
            action: 'remote/relative_mouse'
        }
    ],
    notifications: [],
    message: [],

    hide: true,
    banhide: true
};

export const sidepaneAsync = {
    push_message: createAsyncThunk(
        'push_message',
        async (input: Message, { getState }): Promise<void> => {
            const email = store.getState().user.email;
            const user_id = store.getState().user.id;
            // TODO
        }
    ),
    handle_message: async (payload) => {
        appDispatch(
            render_message({
                ...JSON.parse(payload.new.value),
                name: payload.new.name
            })
        );
    },
    fetch_message: createAsyncThunk(
        'fetch_message',
        async (_: void, { getState }): Promise<Message[]> => {
            // TODO
            // return await CacheRequest('message', 30, async () => {
            // });

            return [];
        }
    )
};

export const sidepaneSlice = createSlice({
    name: 'sidepane',
    initialState,
    reducers: {
        sidepane_bandtogg: (state) => {
            state.banhide = !state.banhide;
        },
        sidepane_bandhide: (state) => {
            state.banhide = true;
        },
        sidepane_panetogg: (state) => {
            state.hide = !state.hide;
        },
        sidepane_panehide: (state) => {
            state.hide = true;
        },
        sidepane_panethem: (state, action: PayloadAction<any>) => {
            // state.quicks[4].src = action.payload;
        },
        render_message: (state, action: PayloadAction<Message>) => {
            state.message = [action.payload, ...state.message];
            state.banhide = false;
        },
        push_notification: (state, action: PayloadAction<Notification>) => {
            state.notifications = [action.payload, ...state.notifications];
            state.banhide = false;
        }
    },
    extraReducers: (builder) => {
        BuilderHelper(builder, {
            fetch: sidepaneAsync.fetch_message,
            hander: (state, action: PayloadAction<Message[]>) => {
                state.message = [...state.message, ...action.payload];
            }
        });
    }
});
