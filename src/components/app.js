import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Routes as AppRoutes } from '../routes';
import { checkLogin } from '../features/main';
import NotFound from '../pages/not_found_page';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

import Cms from '../pages/cms_page';

import Login from '../pages/auth/login_page';
import Dashboard from '../pages/dashboard_page';

import ChaptersPage from '../pages/chapter/chapters_page';
import ChapterNewPage from '../pages/chapter/chapter_new_page';
import ChapterEditPage from '../pages/chapter/chapter_edit_page';
import ChapterViewPage from '../pages/chapter/chapter_view_page';
import ChapterArticlesPage from '../pages/chapter/chapter_articles_page';

import ArticlesPage from '../pages/article/articles_page';
import ArticleEditPage from '../pages/article/article_edit_page';
import ArticleViewPage from '../pages/article/article_view_page';
import ArticleNewPage from '../pages/article/article_new_page';

import StaticPagesList from '../pages/staticpage/staticpages_page';
import StaticPageNew from '../pages/staticpage/staticpage_new';
import StaticPageEdit from '../pages/staticpage/staticpage_edit';
import StaticPageView from '../pages/staticpage/staticpage_view';

import UsersPage from '../pages/user/users_page';
import UserEditPage from '../pages/user/user_edit_page';
import UserViewPage from '../pages/user/user_view_page';
import UserNewPage from '../pages/user/user_new_page';

import QuizzesPage from '../pages/quiz/quizzes_page';
import QuizQuestionEditPage from '../pages/quiz/quiz_question_edit_page';
import QuizQuestionViewPage from '../pages/quiz/quiz_question_page';

import AccountPage from '../pages/account_page';

import MediasPage from '../pages/media/medias_page';

import { useTranslation } from 'react-i18next';

const RenderRoute = ({ children, ...props }) => {
  const { i18n } = useTranslation();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = token.getUser();

  useEffect(() => {
    dispatch(checkLogin(navigate));
  }, [dispatch, navigate]);

  useEffect(() => {
    if (i18n.language.startsWith('en')) {
      i18n.changeLanguage('en');
    }
  }, [i18n, i18n.language]);

  if (user) {
    return (
      <React.Fragment>
        <Sidebar user={user} />
        <main className="content mia-cms-page-top">
          <Navbar user={user} />
          {children}
          <Footer />
        </main>
      </React.Fragment>
    );
  }
  return <Navigate to={AppRoutes.Login.path} />;
};

export const App = () => {
  return (
    <div id="app">
      <Routes>
        <Route path={AppRoutes.Cms.path} element={<Cms />} />
        <Route path={AppRoutes.Login.path} element={<Login />} />
        <Route
          exact
          path={AppRoutes.Dashboard.path}
          element={
            <RenderRoute>
              <Dashboard />
            </RenderRoute>
          }
        />

        {/* Chapters routes*/}
        <Route
          exact
          path={AppRoutes.Chapters.path}
          element={
            <RenderRoute>
              <ChaptersPage />
            </RenderRoute>
          }
        />

        <Route
          exact
          path={AppRoutes.ChapterNew.path}
          element={
            <RenderRoute>
              <ChapterNewPage />
            </RenderRoute>
          }
        />

        <Route
          exact
          path={AppRoutes.ChapterEdit.path}
          element={
            <RenderRoute>
              <ChapterEditPage />
            </RenderRoute>
          }
        />
        <Route
          exact
          path={AppRoutes.ChapterView.path}
          element={
            <RenderRoute>
              <ChapterViewPage />
            </RenderRoute>
          }
        />

        <Route
          exact
          path={AppRoutes.ChapterArticles.path}
          element={
            <RenderRoute>
              <ChapterArticlesPage />
            </RenderRoute>
          }
        />

        {/* Articles routes*/}
        <Route
          exact
          path={AppRoutes.Articles.path}
          element={
            <RenderRoute>
              <ArticlesPage />
            </RenderRoute>
          }
        />
        <Route
          exact
          path={AppRoutes.ArticleEdit.path}
          element={
            <RenderRoute>
              <ArticleEditPage />
            </RenderRoute>
          }
        />

        <Route
          exact
          path={AppRoutes.ArticleNew.path}
          element={
            <RenderRoute>
              <ArticleNewPage />
            </RenderRoute>
          }
        />

        <Route
          exact
          path={AppRoutes.ArticleView.path}
          element={
            <RenderRoute>
              <ArticleViewPage />
            </RenderRoute>
          }
        />

        <Route
          exact
          path={AppRoutes.ArticleByNumber.path}
          element={
            <RenderRoute>
              <ArticleViewPage />
            </RenderRoute>
          }
        />

        <Route
          exact
          path={AppRoutes.ArticleBySlug.path}
          element={
            <RenderRoute>
              <ArticleViewPage />
            </RenderRoute>
          }
        />

        <Route
          exact
          path={AppRoutes.Files.path}
          element={
            <RenderRoute>
              <MediasPage />
            </RenderRoute>
          }
        />

        {/* Quizzes routes*/}
        <Route
          exact
          path={AppRoutes.QuizQuestions.path}
          element={
            <RenderRoute>
              <QuizzesPage />
            </RenderRoute>
          }
        />

        {/* Quizzes routes*/}
        <Route
          exact
          path={AppRoutes.QuizQuestionEdit.path}
          element={
            <RenderRoute>
              <QuizQuestionEditPage />
            </RenderRoute>
          }
        />

        {/* Quizzes routes*/}
        <Route
          exact
          path={AppRoutes.QuizQuestionView.path}
          element={
            <RenderRoute>
              <QuizQuestionViewPage />
            </RenderRoute>
          }
        />

        {/* Pages routes*/}
        <Route
          exact
          path={AppRoutes.StaticPages.path}
          element={
            <RenderRoute>
              <StaticPagesList />
            </RenderRoute>
          }
        />

        <Route
          exact
          path={AppRoutes.StaticPageNew.path}
          element={
            <RenderRoute>
              <StaticPageNew />
            </RenderRoute>
          }
        />

        <Route
          exact
          path={AppRoutes.StaticPageEdit.path}
          element={
            <RenderRoute>
              <StaticPageEdit />
            </RenderRoute>
          }
        />

        <Route
          exact
          path={AppRoutes.StaticPageView.path}
          element={
            <RenderRoute>
              <StaticPageView />
            </RenderRoute>
          }
        />

        {/* Users routes*/}
        <Route
          exact
          path={AppRoutes.Users.path}
          element={
            <RenderRoute>
              <UsersPage />
            </RenderRoute>
          }
        />

        <Route
          exact
          path={AppRoutes.UserEdit.path}
          element={
            <RenderRoute>
              <UserEditPage />
            </RenderRoute>
          }
        />

        <Route
          exact
          path={AppRoutes.UserView.path}
          element={
            <RenderRoute>
              <UserViewPage />
            </RenderRoute>
          }
        />

        <Route
          exact
          path={AppRoutes.UserNew.path}
          element={
            <RenderRoute>
              <UserNewPage />
            </RenderRoute>
          }
        />

        <Route
          exact
          path={AppRoutes.Account.path}
          element={
            <RenderRoute>
              <AccountPage />
            </RenderRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
