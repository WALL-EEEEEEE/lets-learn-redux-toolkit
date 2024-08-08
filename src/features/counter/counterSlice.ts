//Ducks pattern
import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { fetchCount } from "./counterAPI";


export const selectCount = (state: RootState) => state.counter.value
export const selectStatus = (state: RootState) => state.counter.status

interface CounterState {
    value: number;
    status: "idle" | "loading" | "failed"
}
const initialState: CounterState = {
    value: 0,
    status: "idle"
}

const counterSlice = createSlice( {
    name: "counter",
    initialState,
    reducers: {
        increment(state) {
            state.value++;
        },
        decrement(state) {
            state.value--
        },
        incrementByAmount(state, action: PayloadAction<number>) {
            state.value += action.payload
        },
        reset(state, action: PayloadAction<number>) {
            state.value = action.payload
        }
    }, 
    extraReducers: builder => {
        builder.addCase(incrementAsync.pending, (state) => {
            state.status = "loading"
        })
        .addCase(incrementAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.value += action.payload
        }).addCase(incrementAsync.rejected, state => {
            state.status = "failed"
        })
    }
}
)
export const incrementIfOdd = (amount: number): AppThunk => {
    return (dispatch, getState) => {
        const currentValue = selectCount(getState())
        if (currentValue % 2 === 1) {
            dispatch(incrementByAmount(amount))
        }
    }
}
export const incrementAsync = createAsyncThunk(
    "counter/fetchCount",
    async (amount: number) => {
        const response = await fetchCount(amount)
        return response.data
    }
)

export const { increment, decrement, incrementByAmount, reset} = counterSlice.actions
export default counterSlice.reducer;
