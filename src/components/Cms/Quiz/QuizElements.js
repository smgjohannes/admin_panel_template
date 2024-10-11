import styled from 'styled-components';

export const QuizContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 93vw;
  padding: 10px;

  #quizzes-screen-container{
    line-height: 22px;

    .quiz-submit,
    .dd-continue-container button {
      padding: 10px 18px;
      border-radius: 4px;
      background: #00c0e0;
      color: #fff;
      border: 0;
      letter-spacing: 1px;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 13px;
      margin-bottom: 80px;

      &:hover {
        background: #02a5c2;
        transition: 0.333s;
      }
    }

    .question-grouped-answers {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      flex-wrap: wrap;

      > div:not(:empty) {
        width: 31%;
        margin: 0 0 30px 0;

        .question-answer {
          font-size: 13px;
        }
      }
    }

    .question-title {
      font-size: 16px;
      line-height: 23px;
      font-weight: 600;
      margin: 0 0 13px 0;
    }

    .question-answers {
      display: block;
      margin: 0 0 30px 0;

      .question-answer {
        display: block;
        margin: 0 0 10px 0;
        font-size: 15px;
        line-height: 20px;

        input {
          margin-right: 1.5rem;
        }
      }
    }

    #quiz-result {
      display: none;
      margin: 20px 0 100px 0;
    }

    .recommended-reading-item {
      margin: 0 0 12px 0;
    }

    .dd-continue-container {
      margin: 0 0 20px 0;
    }
  }

  @media only screen and (min-width: 460px) and (max-width: 768px) {
    .question-grouped-answers > div:not(:empty) {
      width: 50%;
      margin: 0 0 20px 0;
    }
  }

  @media only screen and (max-width: 460px) {
    .question-grouped-answers > div:not(:empty) {
      width: 100%;
      margin: 0 0 20px 0;
    }
  }
`;