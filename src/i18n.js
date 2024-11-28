import i18n from 'i18next';
import {
    initReactI18next
} from 'react-i18next';

const savedLanguage = localStorage.getItem('i18nextLng') || 'ru'; // язык по умолчанию

// Переводы
const resources = {
    ru: {
        translation: {
            "title": "Тесты в реальном времени на семинарах",
            "authButton": "Авторизация",
            "publicTest" : "Публичный",
            "notPublicTest" : "Не публичный",
            "classroomTest": "Аудиторный",
            "notClassroomTest": "Обычный",
            "backToMyTests": "Вернуться к моим тестам",
            "testName": "Название теста:",
            "createTest": "Создание нового теста",
            "testNameRu": "Название на русском",
            "testNameEn": "Название на английском",
            "question": "Вопрос",
            "ruQuestion": "Вопрос на русском",
            "enQuestion": "Вопрос на английском",
            "isCorrect": "Правильный ответ",
            "answerOption": "Вариант ответа",
            "answerRu": "Ответ на русском",
            "answerEn": "Ответ на английском",
            "addQuestion": "Добавить вопрос",
            "submitTest": "Создать",
            "addAnswerOption": "Добавить вариант ответа",
            "deleteAnswerOption": "Удалить вариант ответа",
            "deleteQuestion": "Удалить вопрос",
            "classroomInput": "Аудиторный ли тест?",
            "publicInput": "Публичный ли тест?",
            "StatusDone": "Тест закончен",
            "StatusNotStarted": "Тест не начался",
            "StatusInProgress": "Тест в процессе",
            "SelectDate": "Выберите время для старта теста",
            "CreateTestRun": "Создать запуск",
            "mainPage": "Главная",
            "publicTests": "Публичные тесты",
            "testDate": "Время",
            "testStatus": "Статус",
            "testAction": "Действие",
            "participationAvailable": "Доступно участие",
            "alreadyParticipating": "Участие",
            "participate": "Записаться",
            "solveTest": "Пройти тест",
            "myTests": "Мои тесты",
            "createdTests": "Созданные тесты",
            "deleteTest": "Удалить",
            "runTest": "Провести тест",
            "runnedTests": "Запущенные тесты",
            "copy": "Скопировать ссылку",
            "main": "Главная",
            "startTime": "ВРЕМЯ НАЧАЛА ТЕСТА",
            "testStartsSoon": "Тест скоро начнется",
            "Participate": "Присоединиться",
            "alreadyParticipate": "Вы уже учавствуете в тесте!",
            "alreadyJoined": "Вы присоединились к тесту!",
            "submit": "Ответить",
            "remainingTime": "Осталось секунд: ",
            "congratulations": "Вы прошли тест!",
            "yourResult": "Ващ результат: "
        }
    },
    en: {
        translation: {
            "title": "Realtime classroom quizzes",
            "authButton": "Authorization",
            "publicTest": "Public",
            "notPublicTest": "Not public",
            "classroomTest": "Classroom",
            "notClassroomTest": "Online",
            "backToMyTests": "Back to my quizzes",
            "testName": "Quiz name:",
            "createTest": "New quiz creation",
            "testNameRu": "Name in russian",
            "testNameEn": "Name in english",
            "question": "Question",
            "ruQuestion": "Question in russian",
            "enQuestion": "Question in english",
            "isCorrect": "Correct answer",
            "answerOption": "Answer option",
            "answerRu": "Answer in russian",
            "answerEn": "Answer in english",
            "addQuestion": "Add question",
            "submitTest": "Submit",
            "addAnswerOption": "Add answer option",
            "deleteAnswerOption": "Remove answer option",
            "deleteQuestion": "Remove question",
            "classroomInput": "This quiz is classroom?",
            "publicInput": "This quiz is public?",
            "StatusDone": "Quiz is finished",
            "StatusNotStarted": "Quiz not started yet",
            "StatusInProgress": "Quiz is in progress",
            "SelectDate": "Select time for quiz start",
            "CreateTestRun": "Create quiz run",
            "mainPage": "Main page",
            "publicTests": "Public quizzes",
            "testDate": "Time",
            "testStatus": "Status",
            "testAction": "Action",
            "participationAvailable": "Participation available",
            "alreadyParticipating": "Participation",
            "participate": "Participate",
            "solveTest": "Participate quiz",
            "myTests": "My quizzes",
            "createdTests": "Created quizzes",
            "deleteTest": "Delete",
            "runTest": "Run quiz",
            "runnedTests": "Run quizzes",
            "copy": "Copy link",
            "main": "Main",
            "startTime": "Quiz start time",
            "testStartsSoon": "Quiz will start soon",
            "Participate": "Participate",
            "alreadyParticipate": "You already participate!",
            "alreadyJoined": "You have joined quiz!",
            "submit": "Submit",
            "remainingTime": "Seconds left: ",
            "congratulations": "You have finished quiz!",
            "yourResult": "Your result: "
        }
    },
};

i18n
    .use(initReactI18next) // подключение i18n к react-i18next
    .init({
        resources,
        lng: savedLanguage,
        fallbackLng: 'ru', // язык по умолчанию при отсутствии перевода
        interpolation: {
            escapeValue: false, // отключаем экранирование
        },
    });

export function locText(text) {
    if (i18n.language === 'en') {
        return text.textEn
    }
    if (i18n.language === 'ru') {
        return text.textRu;
    }
}

export default i18n;