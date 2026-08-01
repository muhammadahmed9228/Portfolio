import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import experienceService from './experienceService';

const initialState = {
  experiences: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Async Thunks
export const fetchExperiences = createAsyncThunk('experiences/getAll', async (_, thunkAPI) => {
  try {
    return await experienceService.getExperiences();
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const addExperience = createAsyncThunk('experiences/create', async (experienceData, thunkAPI) => {
  try {
    return await experienceService.createExperience(experienceData);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const editExperience = createAsyncThunk('experiences/update', async ({ id, experienceData }, thunkAPI) => {
  try {
    return await experienceService.updateExperience({ id, experienceData });
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const removeExperience = createAsyncThunk('experiences/delete', async (id, thunkAPI) => {
  try {
    await experienceService.deleteExperience(id);
    return id;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const experienceSlice = createSlice({
  name: 'experiences',
  initialState,
  reducers: {
    resetExperienceState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Experiences
      .addCase(fetchExperiences.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.isLoading = false;
        state.experiences = action.payload.data;
      })
      .addCase(fetchExperiences.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Add Experience
      .addCase(addExperience.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addExperience.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.experiences.unshift(action.payload.data);
      })
      .addCase(addExperience.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Edit Experience
      .addCase(editExperience.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.experiences.findIndex((e) => e._id === action.payload.data._id);
        if (index !== -1) {
          state.experiences[index] = action.payload.data;
        }
      })
      // Delete Experience
      .addCase(removeExperience.fulfilled, (state, action) => {
        state.isLoading = false;
        state.experiences = state.experiences.filter((e) => e._id !== action.payload);
      });
  },
});

export const { resetExperienceState } = experienceSlice.actions;
export default experienceSlice.reducer;