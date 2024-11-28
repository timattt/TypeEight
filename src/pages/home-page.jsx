import '../styles/home-page-styles.css'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";
import {loadAllTests} from "../store/slices/test-slice";
import {loadAllRuns} from "../store/slices/test-run-slice";
import testTryReducer, {createTestTry, loadAllTries} from "../store/slices/test-try-slice";
import {locText} from "../i18n";

export default function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tries = useSelector((state) => state.testTryReducer.tries)
    const joiningStatus = useSelector((state) => state.testTryReducer.joiningStatus)
    const runs = useSelector((state) => state.testRunReducer.runs)
    const { t, i18n } = useTranslation();

    useEffect(() => {
        dispatch(loadAllTries())
        dispatch(loadAllRuns())
    }, [dispatch, joiningStatus]);

    return <div className="home-page">
        <div className="container">
            <main className="main">
                <div className="main-content">
                    <h1>{t('mainPage')}</h1>
                    <div className="test-sections">
                        <div className="public-tests">
                            <h2>{t('publicTests')}</h2>
                            <table>
                                <thead>
                                <tr>
                                    <th>{t('testName')}</th>
                                    <th>{t('testDate')}</th>
                                    <th>{t('testStatus')}</th>
                                    <th>{t('testAction')}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    runs
                                        //.filter(run => run.startTimeSeconds > Math.floor(Date.now()/1000))
                                        .map((run, index) => <tr key={index}>
                                            <td>{locText(run.testName)}</td>
                                            <td>{new Date(run.startTimeSeconds * 1000).toUTCString()}</td>
                                            <td>{
                                                tries.filter(tr => tr.testRunId === run.testRunId).length === 0 ?
                                                    t('participationAvailable') : t('alreadyParticipating')
                                            }</td>
                                            <td>
                                                {
                                                    tries.filter(tr => tr.testRunId === run.testRunId).length === 0 ?
                                                        <button onClick={() => {
                                                            dispatch(createTestTry({testRunId: run.testRunId}))
                                                        }}>{t('participate')}</button> :
                                                        <button onClick={() => {
                                                            navigate('/run/' + run.testRunId);
                                                        }}>{t('solveTest')}</button>
                                                }
                                            </td>
                                        </tr>)
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
}