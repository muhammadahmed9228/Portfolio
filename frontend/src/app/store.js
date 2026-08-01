import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import projectReducer from '../features/projects/projectSlice';
import experienceReducer from '../features/experiences/experienceSlice';
import contactReducer from '../features/contacts/contactSlice';

export const store = configureStore({
   reducer: {
    auth: authReducer,
    projects: projectReducer,
    experiences: experienceReducer,
    contacts: contactReducer,
  }
})