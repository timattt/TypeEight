import '../styles/start-page-styles.css'
import {useDispatch} from "react-redux";
import {performAuthorization} from "../store/actions/auth-actions";
import { useTranslation } from 'react-i18next';

export default function StartPage() {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    };

    return <div className="start-page">
        <div className="container">
            <div className="header">
                <img src="logo.png" alt="Логотип" className="logo"/>
                <div className="language-selector">
                    <button onClick={() => changeLanguage('ru')} className="language-button" data-lang="ru">RU</button>
                    <button onClick={() => changeLanguage('en')} className="language-button" data-lang="en">ENG</button>
                </div>

            </div>

            <div className="main">
            <h1>{t('title')}</h1>
                <button onClick={() => dispatch(performAuthorization())} className="auth-button">{t('authButton')}</button>
            </div>
        </div>
    </div>
}