import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {
    ANSWER_QUESTION,
    CREATE_TEST_RUN, GET_QUESTION,
    GET_RUN,
    LOAD_ALL_RUNS
} from "../constants";
import {getAccessToken} from "../token-manager";
import {ResultStatus} from "./test-try-slice";

export const loadAllRuns = createAsyncThunk(
    'run/loadAll',
    async function(_, {rejectWithValue, dispatch}) {
        try {
            const response = await axios
                .get(LOAD_ALL_RUNS, {headers: {"Authorization": "Bearer " + getAccessToken()}})
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createRun = createAsyncThunk(
    'run/createRun',
    async function({testId, time}, {rejectWithValue, dispatch}) {
        try {
            const response = await axios
                .post(CREATE_TEST_RUN.replace("{id}", testId) + "?startTimeSeconds=" + time, {}, {headers: {"Authorization": "Bearer " + getAccessToken()}})
            dispatch(loadAllRuns());
            return {}
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getRun = createAsyncThunk(
    'run/getRun',
    async function({testRunId}, {rejectWithValue, dispatch}) {
        try {
            const response = await axios
                .get(GET_RUN.replace("{id}", testRunId), {headers: {"Authorization": "Bearer " + getAccessToken()}})
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getQuestion = createAsyncThunk(
    'run/getQuestion',
    async function({testRunId}, {rejectWithValue, dispatch}) {
        try {
            const response = await axios
                .get(GET_QUESTION.replace("{id}", testRunId), {headers: {"Authorization": "Bearer " + getAccessToken()}})
            return response.data
        } catch (error) {
            return rejectWithValue({error: error.response.data, status: error.response.status});
        }
    }
);

export const answerQuestion = createAsyncThunk(
    'run/answerQuestion',
    async function({testRunId, questionId, answerOptionId}, {rejectWithValue, dispatch}) {
        try {
            const response = await axios
                .post(
                    ANSWER_QUESTION.replace("{id}", testRunId).replace("{questionId}", questionId) + "?answerOption=" + answerOptionId,
                    {},
                    {headers: {"Authorization": "Bearer " + getAccessToken()}}
                )
            return response.data
        } catch (error) {
            return rejectWithValue({error: error.response.data, status: error.response.status});
        }
    }
);


export const QuestionStatus = {
    noQuestion: "noQuestion",
    ok: "ok",
    alreadyFinished: "alreadyFinished",
    notFound: "notFound",
    notStarted: "notStarted",
}

export const AnsweringStatus = {
    notAnswered: "noAnswer",
    answered: "answered"
}

const testRunSlice = createSlice({
    name: 'run',
    initialState: {
        runs: [],
        error: undefined,
        run: undefined,
        questionStatus: QuestionStatus.noQuestion,
        currentQuestion: undefined,
        answeringStatus: AnsweringStatus.notAnswered
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(answerQuestion.fulfilled, (state, action) => {
                state.error = undefined
                state.answeringStatus = AnsweringStatus.answered
            })
            .addCase(answerQuestion.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(loadAllRuns.fulfilled, (state, action) => {
                state.error = undefined
                state.runs = action.payload.testRunsList
            })
            .addCase(loadAllRuns.rejected, (state, action) => {
                state.error = action.payload
                state.tests = []
            })
            .addCase(createRun.fulfilled, (state, action) => {
                state.error = undefined
            })
            .addCase(createRun.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(getRun.fulfilled, (state, action) => {
                state.error = undefined
                state.run = action.payload
            })
            .addCase(getRun.rejected, (state, action) => {
                state.error = action.payload
                state.run = undefined
            })
            .addCase(getQuestion.fulfilled, (state, action) => {
                state.error = undefined
                state.currentQuestion = action.payload
                state.questionStatus = QuestionStatus.ok
                state.answeringStatus = AnsweringStatus.notAnswered
            })
            .addCase(getQuestion.rejected, (state, action) => {
                state.error = action.payload

                if (action.payload.status === 404) {
                    state.questionStatus = QuestionStatus.notFound
                }
                if (action.payload.status === 425) {
                    state.questionStatus = QuestionStatus.notStarted
                }
                if (action.payload.status === 410) {
                    state.questionStatus = QuestionStatus.alreadyFinished
                }

                state.question = undefined
            })
    }
});

export default testRunSlice.reducer;
