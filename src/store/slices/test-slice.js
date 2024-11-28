import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {
    CREATE_TEST,
    DELETE_TEST,
    LIST_TESTS
} from "../constants";
import {getAccessToken} from "../token-manager";

export const loadAllTests = createAsyncThunk(
    'test/loadAll',
    async function(_, {rejectWithValue, dispatch}) {
        try {
            const response = await axios
                .get(LIST_TESTS, {headers: {"Authorization": "Bearer " + getAccessToken()}})
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteTest = createAsyncThunk(
    'test/deleteTest',
    async function({id}, {rejectWithValue, dispatch}) {
        try {
            const response = await axios
                .delete(DELETE_TEST.replace("{id}", id), {headers: {"Authorization": "Bearer " + getAccessToken()}})
            return {id: id}
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createTest = createAsyncThunk(
    'test/createTest',
    async function({test}, {rejectWithValue, dispatch}) {
        try {
            const response = await axios
                .post(CREATE_TEST, test, {headers: {"Authorization": "Bearer " + getAccessToken()}})
            dispatch(loadAllTests())
            return {}
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const testSlice = createSlice({
    name: 'test',
    initialState: {
        tests: [],
        error: undefined
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAllTests.fulfilled, (state, action) => {
                state.error = undefined
                state.tests = action.payload.tests
            })
            .addCase(loadAllTests.rejected, (state, action) => {
                state.error = action.payload
                state.tests = []
            })
            .addCase(deleteTest.fulfilled, (state, action) => {
                state.error = undefined
                state.tests = [...state.tests].filter(test => test.testId !== action.payload.id)
            })
            .addCase(deleteTest.rejected, (state, action) => {
                state.error = action.payload
                state.tests = []
            })
            .addCase(createTest.fulfilled, (state, action) => {
                state.error = undefined
            })
            .addCase(createTest.rejected, (state, action) => {
                state.error = action.payload
            })
    }
});

export default testSlice.reducer;
