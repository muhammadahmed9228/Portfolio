import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import contactService from './contactService';

const initialState = {
  messages: [],
  unreadCount: 0,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Async Thunks
export const fetchMessages = createAsyncThunk('contacts/getAll', async (_, thunkAPI) => {
  try {
    return await contactService.getMessages();
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const submitContactForm = createAsyncThunk('contacts/submitForm', async (messageData, thunkAPI) => {
  try {
    return await contactService.sendContactMessage(messageData);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const toggleMessageRead = createAsyncThunk('contacts/toggleRead', async (id, thunkAPI) => {
  try {
    return await contactService.toggleReadStatus(id);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const removeMessage = createAsyncThunk('contacts/delete', async (id, thunkAPI) => {
  try {
    await contactService.deleteMessage(id);
    return id;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    resetContactState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Messages
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload.data;
        state.unreadCount = action.payload.unreadCount || 0;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Submit Public Form
      .addCase(submitContactForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Toggle Read Status
      .addCase(toggleMessageRead.fulfilled, (state, action) => {
        const updatedMsg = action.payload.data;
        const index = state.messages.findIndex((m) => m._id === updatedMsg._id);
        if (index !== -1) {
          state.messages[index] = updatedMsg;
        }
        // Recalculate unread count
        state.unreadCount = state.messages.filter((m) => !m.isRead).length;
      })
      // Delete Message
      .addCase(removeMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter((m) => m._id !== action.payload);
        state.unreadCount = state.messages.filter((m) => !m.isRead).length;
      });
  },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;