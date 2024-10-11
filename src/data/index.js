import {
  faBook,
  faBookDead,
  faFileAlt,
  faList,
  faPaperPlane,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';

import { Routes } from '../routes';

export const SiteMenus = [
  {
    id: 1,
    label: 'chapters',
    icon: faBook,
    link: Routes.Chapters.path,
  },
  {
    id: 2,
    label: 'articles',
    icon: faBookDead,
    link: Routes.Articles.path,
  },
  {
    id: 3,
    label: 'quizzes',
    icon: faQuestionCircle,
    link: Routes.QuizQuestions.path,
  },

  {
    id: 4,
    label: 'pages',
    icon: faPaperPlane,
    link: Routes.StaticPages.path,
  },

  {
    id: 5,
    label: 'faq',
    icon: faList,
    link: Routes.FAQ.path,
  },

  {
    id: 5,
    label: 'files',
    icon: faFileAlt,
    link: Routes.Files.path,
  },
];
