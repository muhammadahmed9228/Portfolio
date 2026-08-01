import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import projectService from './projectService';

const initialState = {
  projects: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Async Thunks
export const fetchProjects = createAsyncThunk('projects/getAll', async (params, thunkAPI) => {
  try {
    return await projectService.getProjects(params);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const addProject = createAsyncThunk('projects/create', async (formData, thunkAPI) => {
  try {
    return await projectService.createProject(formData);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const editProject = createAsyncThunk('projects/update', async ({ id, formData }, thunkAPI) => {
  try {
    return await projectService.updateProject({ id, formData });
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const removeProject = createAsyncThunk('projects/delete', async (id, thunkAPI) => {
  try {
    await projectService.deleteProject(id);
    return id; // Return deleted ID to update state locally
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    resetProjectState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Projects
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload.data;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Add Project
      .addCase(addProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects.unshift(action.payload.data); // Add new project to top of list
      })
      .addCase(addProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Edit Project
      .addCase(editProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.projects.findIndex((p) => p._id === action.payload.data._id);
        if (index !== -1) {
          state.projects[index] = action.payload.data;
        }
      })
      // Delete Project
      .addCase(removeProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = state.projects.filter((p) => p._id !== action.payload);
      });
  },
});

export const { resetProjectState } = projectSlice.actions;
export default projectSlice.reducer;