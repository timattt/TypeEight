import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {
    ALL_TRIES, ANSWER_QUESTION, CREATE_TEST_TRY, GET_RESULT
} from "../constants";
import {getAccessToken} from "../token-manager";

export const loadAllTries = createAsyncThunk(
    'try/loadAll',
    async function(_, {rejectWithValue, dispatch}) {
        try {
            const response = await axios
                .get(ALL_TRIES, {headers: {"Authorization": "Bearer " + getAccessToken()}})
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createTestTry = createAsyncThunk(
    'try/createTestTry',
    async function({testRunId}, {rejectWithValue, dispatch}) {
        try {
            const response = await axios
                .put(
                    CREATE_TEST_TRY.replace("{id}", testRunId),
                    {},
                    {headers: {"Authorization": "Bearer " + getAccessToken()}}
                )
            dispatch(loadAllTries())
            return response.data
        } catch (error) {
            return rejectWithValue({error: error.response.data, status: error.response.status});
        }
    }
);

export const getResult = createAsyncThunk(
    'try/getResult',
    async function({testRunId}, {rejectWithValue, dispatch}) {
        try {
            const response = await axios
                .get(
                    GET_RESULT.replace("{id}", testRunId),
                    {headers: {"Authorization": "Bearer " + getAccessToken()}}
                )
            return response.data
        } catch (error) {
            return rejectWithValue({error: error.response.data, status: error.response.status});
        }
    }
);

export const JoinStatus = {
    unknown: "unknown",
    ok: "ok",
    noSuchTest: "noSuchTest",
    alreadyJoined: "alreadyJoined",
}
export const ResultStatus = {
    noResult: "noResult",
    ok: "ok",
    notFound: "notFound",
    notFinished: "notFinished",
}

const testTrySlice = createSlice({
    name: 'try',
    initialState: {
        tries: [],
        error: undefined,
        joiningStatus: JoinStatus.unknown,
        resultStatus: ResultStatus.noResult,
        result: undefined
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAllTries.fulfilled, (state, action) => {
                state.error = undefined
                state.tries = action.payload.testTries
            })
            .addCase(loadAllTries.rejected, (state, action) => {
                state.error = action.payload
                state.tries = []
            })
            .addCase(createTestTry.fulfilled, (state, action) => {
                state.error = undefined
                state.joiningStatus = JoinStatus.ok
            })
            .addCase(createTestTry.rejected, (state, action) => {
                state.error = action.payload

                if (action.payload.status === 404) {
                    state.joiningStatus = JoinStatus.noSuchTest
                }
                if (action.payload.status === 429) {
                    state.joiningStatus = JoinStatus.alreadyJoined
                }
            })
            .addCase(getResult.fulfilled, (state, action) => {
                state.error = undefined

                state.resultStatus = ResultStatus.ok
                state.result = action.payload
            })
            .addCase(getResult.rejected, (state, action) => {
                state.error = action.payload

                if (action.payload.status === 404) {
                    state.resultStatus = ResultStatus.notFound
                }
                if (action.payload.status === 409) {
                    state.resultStatus = ResultStatus.notFinished
                }

                state.result = undefined
            })
    }
});

export default testTrySlice.reducer;
