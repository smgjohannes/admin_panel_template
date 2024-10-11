import { createDynamicMiddleware, configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const dynamicMiddleware = createDynamicMiddleware();

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(dynamicMiddleware.middleware),
});
