import {useNavigate, useParams} from "react-router-dom";
import './../styles/test-run-page-styles.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {createTestTry, getResult, JoinStatus} from "../store/slices/test-try-slice";
import {
    AnsweringStatus,
    answerQuestion,
    getQuestion,
    getRun,
    QuestionStatus
} from "../store/slices/test-run-slice";
import {locText} from "../i18n";
import {useTranslation} from "react-i18next";

export default function TestRunPage() {
    const navigate = useNavigate();
    const {testRunId} = useParams()
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const run = useSelector((state) => state.testRunReducer.run)
    const joiningStatus = useSelector((state) => state.testTryReducer.joiningStatus)

    const currentQuestion = useSelector((state) => state.testRunReducer.currentQuestion)
    const questionStatus = useSelector((state) => state.testRunReducer.questionStatus)
    const answeringStatus = useSelector((state) => state.testRunReducer.answeringStatus)

    const resultStatus = useSelector((state) => state.testTryReducer.resultStatus)
    const result = useSelector((state) => state.testTryReducer.result)

    const [currentAnswer, setCurrentAnswer] = useState(-1)
    const [remainingTime, setRemainingTime] = useState(0)

    let statusText = ""

    if (questionStatus === QuestionStatus.notStarted) {
        statusText = "StatusNotStarted"
    }

    if (questionStatus === QuestionStatus.alreadyFinished) {
        statusText = "StatusDone"
    }

    if (questionStatus === QuestionStatus.ok) {
        statusText = "StatusInProgress"
        if (run !== undefined)
            setTimeout(() => {
                dispatch(getQuestion({testRunId: testRunId}))
                dispatch(getResult({testRunId: testRunId}))
            }, calcRemainingTime(run.startTimeSeconds, run.timePerQuestionSeconds) * 1000)
    }

    if (run !== undefined) {
        const secondsTillStart = Math.floor(Date.now()/1000) - run.startTimeSeconds
        if (secondsTillStart >= 0)
            setTimeout(() => {
                dispatch(getQuestion({testRunId: testRunId}))
                dispatch(getResult({testRunId: testRunId}))
            }, secondsTillStart * 1000)
    }

    setInterval(() => {
        if (run !== undefined)
            setRemainingTime(calcRemainingTime(run.startTimeSeconds, run.timePerQuestionSeconds))
    }, 1000)

    useEffect(() => {
        dispatch(getRun({testRunId: testRunId}))
        dispatch(getQuestion({testRunId: testRunId}))
        dispatch(getResult({testRunId: testRunId}))
    }, [dispatch, joiningStatus]);

    if (run === undefined) {
        return <div/>
    }

    return <div className="test-run-page">
        <div className="container">
            <div className="header">
                <div className="header-section">
                    <h3>{t('testName')}</h3>
                    <p>{locText(run.testName)}</p>
                </div>
                <div className="header-section">
                    <h3>{t('testStatus')}</h3>
                    <p>{t(statusText)}</p>
                </div>
                <div className="header-section">
                    <h3>{t('startTime')}</h3>
                    <p>{new Date(run.startTimeSeconds * 1000).toUTCString()}</p>
                </div>
            </div>

            { statusText === "StatusNotStarted" &&
                <div className="details">
                    <p>{t('testStartsSoon')}</p>
                    {
                        joiningStatus === JoinStatus.unknown &&
                        <button
                            onClick={() => dispatch(createTestTry({testRunId: run.testRunId}))}>{t('Participate')}</button>
                    }
                    {
                        joiningStatus === JoinStatus.alreadyJoined &&
                        <p>{t('alreadyParticipate')}</p>
                    }
                    {
                        joiningStatus === JoinStatus.ok &&
                        <p>{t('alreadyJoined')}</p>
                    }
                </div>
            }

            {statusText === "StatusInProgress" &&
                <div className="answers">
                    <div className="answer-container">
                        <div className="question">
                            <p>{currentQuestion.text && locText(currentQuestion.text)}</p>
                        </div>
                        <div>
                            {
                                currentQuestion.answerOptions.map((option) => <div key={option.answerOptionId}
                                                                                   className="answer-group">
                                    <label><input type="radio"
                                                  name="answer"
                                                  value={option.answerOptionId}
                                                  onClick={() => setCurrentAnswer(option.answerOptionId)}
                                    />
                                        {option.text && locText(option.text)}
                                    </label>
                                </div>)
                            }
                            {
                                (currentAnswer !== -1 && answeringStatus === AnsweringStatus.notAnswered) &&
                                <button onClick={() => dispatch(answerQuestion({
                                    testRunId: run.testRunId,
                                    answerOptionId: currentAnswer,
                                    questionId: currentQuestion.questionId,
                                }))}>{t('submit')}</button>
                            }
                        </div>
                        {
                            remainingTime > 0 &&
                            <div className="question">
                                <p>{t('remainingTime')}{remainingTime}</p>
                            </div>
                        }
                    </div>
                </div>
            }

            {statusText === "StatusDone" &&
                <div className="done-container">
                    <div className="done">
                        <h1>{t('congratulations')}</h1>
                        <p>{t('yourResult')}{result}%</p>
                        <button onClick={() => navigate('/mytests')}>{t('backToMyTests')}</button>
                    </div>
                </div>
            }
        </div>
    </div>
}

function calcRemainingTime(startTimeSeconds, timePerQuestion) {
    const cur = Math.floor(Date.now()/1000)
    return timePerQuestion - ((cur - startTimeSeconds) % timePerQuestion)
}