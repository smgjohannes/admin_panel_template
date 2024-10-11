export const Routes = {
  Cms: { path: '/' },
  Dashboard: { path: '/dashboard' },
  Account: { path: '/account' },
  NotFound: { path: '/404' },

  Chapters: { path: '/chapters' },
  ChapterNew: { path: '/chapters/new' },
  ChapterEdit: { path: '/chapters/:id/edit' },
  ChapterView: { path: '/chapters/:id' },
  ChapterArticles: { path: '/chapters/:chapterId/articles' },

  Articles: { path: '/articles' },
  ArticleView: { path: '/articles/:id' },
  ArticleBySlug: { path: '/articles/:slug/getBySlug' },
  ArticleByNumber: { path: '/articles/:number/getByNumber' },
  ArticleEdit: { path: '/articles/:id/edit' },
  ArticleNew: { path: '/articles/new' },

  Menu: { path: '/menu' },

  Media: { path: '/media' },

  QuizQuestions: { path: '/quizzes' },
  QuizQuestionView: { path: '/quizzes/:id' },
  QuizQuestionEdit: { path: '/quizzes/:id/edit' },

  StaticPages: { path: '/staticpages' },
  StaticPageNew: { path: '/staticpages/new' },
  StaticPageEdit: { path: '/staticpages/:id/edit' },
  StaticPageView: { path: '/staticpages/:id' },

  FAQ: { path: '/faq' },
  FAQView: { path: '/faq/:id' },
  FAQEdit: { path: '/faq/:id/edit' },

  Users: { path: '/users' },
  UserEdit: { path: '/users/:id/edit' },
  UserView: { path: '/users/:id' },
  UserNew: { path: '/users/new' },

  Files: { path: '/file-managements' },

  Login: { path: '/login' },
  HomePage: { path: 'https://mindsinaction.com.na' },
};
