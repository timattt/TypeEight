import {Outlet, useNavigate} from "react-router-dom";
import '../styles/header-page-styles.css'
import {useTranslation} from "react-i18next";

export default () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    };
    return <div>
        <div className="header-page">
            <nav>
                <ul>
                    <li><a onClick={() => navigate('/home')} href="#">{t('main')}</a></li>
                    <li><a onClick={() => navigate('/create')} href="#">{t('createTest')}</a></li>
                    <li><a onClick={() => navigate('/mytests')} href="#">{t('myTests')}</a></li>
                    <button onClick={() => changeLanguage('ru')} className="language-button" data-lang="ru">RU</button>
                    <button onClick={() => changeLanguage('en')} className="language-button" data-lang="en">ENG</button>
                </ul>
            </nav>
        </div>
        <Outlet/>
    </div>
}