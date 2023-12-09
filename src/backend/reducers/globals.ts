const initialState = {
    lays: [
        [
            {
                dim: {
                    width: '50%',
                    height: '100%',
                    top: 0,
                    left: 0
                },
                br: 14
            },
            {
                dim: {
                    width: '50%',
                    height: '100%',
                    top: 0,
                    left: '50%'
                },
                br: 15
            }
        ],
        [
            {
                dim: {
                    width: '66%',
                    height: '100%',
                    top: 0,
                    left: 0
                },
                br: 14
            },
            {
                dim: {
                    width: '34%',
                    height: '100%',
                    top: 0,
                    left: '66%'
                },
                br: 15
            }
        ],
        [
            {
                dim: {
                    width: '33%',
                    height: '100%',
                    top: 0,
                    left: 0
                },
                br: 14
            },
            {
                dim: {
                    width: '34%',
                    height: '100%',
                    top: 0,
                    left: '33%'
                },
                br: 1
            },
            {
                dim: {
                    width: '33%',
                    height: '100%',
                    top: 0,
                    left: '67%'
                },
                br: 15
            }
        ],
        [
            {
                dim: {
                    width: '50%',
                    height: '100%',
                    top: 0,
                    left: 0
                },
                br: 14
            },
            {
                dim: {
                    width: '50%',
                    height: '50%',
                    top: 0,
                    left: '50%'
                },
                br: 3
            },
            {
                dim: {
                    width: '50%',
                    height: '50%',
                    top: '50%',
                    left: '50%'
                },
                br: 5
            }
        ],
        [
            {
                dim: {
                    width: '50%',
                    height: '50%',
                    top: 0,
                    left: 0
                },
                br: 2
            },
            {
                dim: {
                    width: '50%',
                    height: '50%',
                    top: 0,
                    left: '50%'
                },
                br: 3
            },
            {
                dim: {
                    width: '50%',
                    height: '50%',
                    top: '50%',
                    left: 0
                },
                br: 7
            },
            {
                dim: {
                    width: '50%',
                    height: '50%',
                    top: '50%',
                    left: '50%'
                },
                br: 5
            }
        ],
        [
            {
                dim: {
                    width: '25%',
                    height: '100%',
                    top: 0,
                    left: 0
                },
                br: 14
            },
            {
                dim: {
                    width: '50%',
                    height: '100%',
                    top: 0,
                    left: '25%'
                },
                br: 1
            },
            {
                dim: {
                    width: '25%',
                    height: '100%',
                    top: 0,
                    left: '75%'
                },
                br: 15
            }
        ]
    ],

    vendors: [
        {
            images: ['/img/store/thinkmay.png'],

            icon: 'https://supabase.thinkmay.net/storage/v1/object/public/public_store/store/logo/thinkmay.png',
            type: 'vendor',
            metadata: {
                href: 'https://thinkmay.net'
            }
        },
        {
            images: ['/img/store/brightcloud.png'],

            icon: 'https://supabase.thinkmay.net/storage/v1/object/public/public_store/store/logo/thinkmay.png',
            type: 'vendor',
            metadata: {
                href: 'https://grupobright.com/'
            }
        },
        {
            images: ['/img/store/truecloud.png'],

            icon: 'https://supabase.thinkmay.net/storage/v1/object/public/public_store/store/logo/thinkmay.png',
            type: 'vendor',
            metadata: {
                href: 'https://jnvdaily.com/index.html'
            }
        }
    ],

    apps: [] as any[],
    games: [] as any[]
};

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { virtapi } from '../actions/fetch/createClient';
import { BuilderHelper, CacheRequest } from './helper';


export const storeAsync = {
    fetch_store: createAsyncThunk(
        'fetch_store',
        async (): Promise<any> => {
            return await CacheRequest('store', 30, async () => {
                const { data, error } = await virtapi(`rpc/fetch_store`, 'GET');
                if (error) throw error;

                return data
            })
        }
    )
}
export const deleteStore = async (app: any) => {
    if (!isAdmin()) return;

    const { error } = await virtapi(`stores?id=eq.${app.id}`, 'DELETE');
    if (error) throw error;

    await log({
        error: null,
        type: 'confirm',
        confirmCallback: deleteApp
    });

    fetchStore();
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {},
    extraReducers: builder => {
        BuilderHelper('fetch_store', builder, storeAsync.fetch_store, (state, action) => {

        })
    }
});
