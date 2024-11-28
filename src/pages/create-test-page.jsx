import './../styles/create-test-styles.css'
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {createTest} from "../store/slices/test-slice";
import {useNavigate} from "react-router-dom";

export default function CreateTestPage() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [test, setTest] = useState({
        isPublic: true,
        isClassroom: true,
        timePerQuestionSeconds: 30,
        testName: {
            textRu: "Тест",
            textEn: "Test"
        },
        questionList: []
    })

    return <div className="create-test-page">
        <div className="container">
            <a href="#" onClick={() => navigate('/mytests')} className="back-link">{t('backToMyTests')}</a>
            <h2>{t('createTest')}</h2>

            <div className="form-group">
                <label>{t('testName')}</label>
                <div className="language-inputs">
                    <div className="language-input">
                        <span>RU</span>
                        <input type="text"
                               value={test.testName.textRu}
                               onChange={event => setTest({
                                   ...test, testName: {...test.testName, textRu: event.target.value}
                               })}
                               placeholder={t('testNameRu')}/>
                    </div>
                    <div className="language-input">
                        <span>EN</span>
                        <input type="text"
                               placeholder={t('testNameEn')}
                               value={test.testName.textEn}
                               onChange={event => setTest({
                                   ...test, testName: {...test.testName, textEn: event.target.value}
                               })}/>
                    </div>
                    <div className="classroomInput">
                        <span>{t('classroomInput')}</span>
                        <input type="checkbox"
                               placeholder={t('classroomInput')}
                               value={test.isClassroom}
                               onChange={event => setTest({
                                   ...test, isClassroom: event.target.checked
                               })}
                        />
                    </div>
                    <div className="publicInput">
                        <span>{t('publicInput')}</span>
                        <input type="checkbox"
                               placeholder={t('publicInput')}
                               value={test.isPublic}
                               onChange={event => setTest({
                                   ...test, isPublic: event.target.checked
                               })}
                        />
                    </div>
                </div>
            </div>

            {
                test.questionList.sort((a, b) => a.localId - b.localId).map((question, questionI) => <div
                    className="question-group" key={questionI}>
                    <h3>{t('question') + " " + (questionI + 1)}</h3>
                    <div className="language-inputs">
                        <div className="language-input">
                            <span>RU</span>
                            <input type="text"
                                   placeholder={t('ruQuestion')}
                                   value={question.text.textRu}
                                   onChange={event => setTest({
                                       ...test,
                                       questionList: [
                                           ...test.questionList.filter((q, localI) => questionI !== localI),
                                           {...question, text: {...question.text, textRu: event.target.value}}
                                       ]
                                   })}
                            />
                        </div>
                        <div className="language-input">
                            <span>EN</span>
                            <input type="text"
                                   placeholder={t('enQuestion')}
                                   value={question.text.textEn}
                                   onChange={event => setTest({
                                       ...test,
                                       questionList: [
                                           ...test.questionList.filter((q, localI) => questionI !== localI),
                                           {...question, text: {...question.text, textEn: event.target.value}}
                                       ]
                                   })}
                            />
                        </div>
                    </div>


                    <div className="answers">
                        {
                            question.answerOptionList.sort((a, b) => a.localId - b.localId).map((answer, ansI) => <div key={ansI} className="answer-group">
                                <label>{t('answerOption') + " " + (ansI + 1)}</label>
                                <div className="language-inputs">
                                    <div className="language-input">
                                        <span>RU</span>
                                        <input type="text"
                                               placeholder={t('answerRu')}
                                               value={answer.text.textRu}
                                               onChange={event => setTest({
                                                   ...test,
                                                   questionList: [
                                                       ...test.questionList.filter((q, localI) => questionI !== localI),
                                                       {
                                                           ...question,
                                                           answerOptionList: [
                                                               ...question.answerOptionList.filter((q, localI) => ansI !== localI),
                                                               {
                                                                   ...answer,
                                                                   text: {...answer.text, textRu: event.target.value}
                                                               }
                                                           ]
                                                       }
                                                   ]
                                               })}
                                        />
                                    </div>
                                    <div className="language-input">
                                        <span>EN</span>
                                        <input type="text"
                                               placeholder={t('answerEn')}
                                               value={answer.text.textEn}
                                               onChange={event => setTest({
                                                   ...test,
                                                   questionList: [
                                                       ...test.questionList.filter((q, localI) => questionI !== localI),
                                                       {
                                                           ...question,
                                                           answerOptionList: [
                                                               ...question.answerOptionList.filter((q, localI) => ansI !== localI),
                                                               {
                                                                   ...answer,
                                                                   text: {...answer.text, textEn: event.target.value}
                                                               }
                                                           ]
                                                       }
                                                   ]
                                               })}
                                        />
                                    </div>
                                    <div>
                                        <span>Correct</span>
                                        <input type="checkbox"
                                               placeholder={t('isCorrect')}
                                               value={answer.isCorrect}
                                               onChange={event => setTest({
                                                   ...test,
                                                   questionList: [
                                                       ...test.questionList.filter((q, localI) => questionI !== localI),
                                                       {
                                                           ...question,
                                                           answerOptionList: [
                                                               ...question.answerOptionList.filter((q, localI) => ansI !== localI),
                                                               {...answer, isCorrect: event.target.checked}
                                                           ]
                                                       }
                                                   ]
                                               })}
                                        />
                                    </div>
                                    <button onClick={() => setTest({
                                        ...test,
                                        questionList: [
                                            ...test.questionList.filter((q, localI) => questionI !== localI),
                                            {
                                                ...question,
                                                answerOptionList: [
                                                    ...question.answerOptionList.filter((q, localI) => ansI !== localI)
                                                ]
                                            }
                                        ]
                                    })} id="add-question">{t('deleteAnswerOption')}</button>
                                </div>
                            </div>)
                        }
                        <br/>
                        <button key={questionI} onClick={() => setTest({
                            ...test,
                            questionList: [
                                ...test.questionList.filter((q, localI) => questionI !== localI),
                                {
                                    ...question,
                                    answerOptionList: [
                                        ...question.answerOptionList,
                                        {
                                            text: {
                                                textRu: "",
                                                textEn: ""
                                            },
                                            isCorrect: false,
                                            localId: Math.floor(Date.now())
                                        }
                                    ]
                                }
                            ]
                        })} id="add-answer-option">{t('addAnswerOption')}</button>
                        <br/>
                        <br/>
                        <button key={questionI} onClick={() => setTest({
                            ...test,
                            questionList: [
                                ...test.questionList.filter((q, localI) => questionI !== localI)
                            ]
                        })} id="delete-answer-option">{t('deleteQuestion')}</button>

                    </div>
                </div>)
            }

            <button onClick={() => setTest({
                ...test,
                questionList: [...test.questionList, {
                    maxAnswers: 1,
                    text: {
                        textRu: "",
                        textEn: ""
                    },
                    answerOptionList: [],
                    localId: Math.floor(Date.now())
                }]
            })} id="add-question">{t('addQuestion')}</button>
            <button onClick={() => {
                dispatch(createTest({test: test}));
                navigate('/mytests')
            }} type="submit">{t('submitTest')}</button>
        </div>
    </div>
}