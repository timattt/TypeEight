import '../styles/mytests-page-styles.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteTest, loadAllTests} from "../store/slices/test-slice";
import {useTranslation} from "react-i18next";
import {locText} from "../i18n";
import {useNavigate} from "react-router-dom";
import {loadAllRuns} from "../store/slices/test-run-slice";

export default function MytestsPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tests = useSelector((state) => state.testReducer.tests)
    const runs = useSelector((state) => state.testRunReducer.runs)
    const { t, i18n } = useTranslation();

    useEffect(() => {
        dispatch(loadAllTests())
        dispatch(loadAllRuns())
    }, []);

    return <div className="mytests-page">
        <div className="container">
            <h1>{t('myTests')}</h1>
            <div className="tests-container">
                <div className="test-section">
                    <h2>{t('createdTests')}</h2>
                    <div className="test-list">
                        {
                             tests.map(test => <div key={test.testId} className="test-item">
                                 <span>{locText(test.localizedName)}</span>
                                 <span>{test.isPublic ? t('publicTest') : t('notPublicTest')}</span>
                                 <span>{test.isClassroom ? t('classroomTest') : t('notClassroomTest')}</span>
                                 <button onClick={() => dispatch(deleteTest({id: test.testId}))} className="delete-button">{t('deleteTest')}</button>
                                 <button onClick={() => navigate('/create/run/' + test.testId)} className="run-test-button">{t('runTest')}</button>
                             </div>
                            )
                        }
                    </div>
                </div>
                <div className="test-section">
                    <h2>{t('runnedTests')}</h2>
                    <div className="test-list">
                        {
                            runs.map((run, index) => <div key={index} className="test-item">
                                <span>{locText(run.testName)}</span>
                                <span>{new Date(run.startTimeSeconds).toUTCString()}</span>
                                <button className="copy-button">{t('copy')}</button>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
}