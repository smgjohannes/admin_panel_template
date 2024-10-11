import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import mainReducer from '../features/main';
import articleReducer from '../features/article/articleSlice';
import chapterReducer from '../features/chapter/chapterSlice';
import dashboardReducer from '../features/dashboardSlice';
import quizQuestionReducer from '../features/quiz/quizQuestionSlice';
import staticPageSliceReducer from '../features/staticpage/staticpageSlice';
import mediaReducer from '../features/media/mediaSlice';

const reducer = {
  user: userReducer,
  auth: authReducer,
  main: mainReducer,
  article: articleReducer,
  chapter: chapterReducer,
  dashboard: dashboardReducer,
  quizQuestion: quizQuestionReducer,
  page: staticPageSliceReducer,
  media: mediaReducer,
};

export default reducer;
