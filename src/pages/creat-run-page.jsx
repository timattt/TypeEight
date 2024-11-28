import {useNavigate, useParams} from "react-router-dom";
import './../styles/create-run-page-styles.css'
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {createRun} from "../store/slices/test-run-slice";

export default function CreateRunPage() {
    const {testId} = useParams()
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [time, setTime] = useState('');
    return <div className="create-run-page">
        <div className="container">
            <h1>{t('SelectDate')}</h1>
            <form>
                <label htmlFor="date">Date:</label>
                <input type="datetime-local"
                       id="date-time"
                       name="date-time"
                       value={time}
                       onChange={(e) => setTime(e.target.value)}
                />
                <br/>
                <br/>
                <button type="button" onClick={() => {
                    dispatch(createRun({testId: testId, time: Math.floor(new Date(time).getTime()/1000)}));
                    navigate('/mytests');
                }}>{t('CreateTestRun')}</button>
            </form>
        </div>
    </div>
}