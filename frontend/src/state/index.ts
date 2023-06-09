import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  mode: 'light' | 'dark';
  user: User | null;
  token: string | null;
  posts: Post[];
}

type Gender = 'Female' | 'Male' | 'other';

interface User {
  _id: number;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  age?: number;
  weight?: number;
  height?: number;
  gender?: Gender;
  // friends?: number[];
  // picturePath?: string;
  location?: string;
}

interface Post {
  _id: string;
}

const initialState: AuthState = {
  mode: 'light',
  user: null,
  token: null,
  posts: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // setMode: (state) => {
    //   state.mode = state.mode === 'light' ? 'dark' : 'light';
    // },
    setLogin: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    // setFriends: (state, action: PayloadAction<{ friends: User[] }>) => {
    //   if (state.user) {
    //     state.user.friends = action.payload.friends;
    //   } else {
    //     console.error("user friends non-existent :(");
    //   }
    // },
    // setPosts: (state, action: PayloadAction<{ posts: Post[] }>) => {
    //   state.posts = action.payload.posts;
    // },
    // setPost: (state, action: PayloadAction<{ post: Post }>) => {
    //   const updatedPosts = state.posts.map((post) => {
    //     if (post._id === action.payload.post._id) {
    //       return action.payload.post;
    //     }
    //     return post;
    //   });
    //   state.posts = updatedPosts;
    // },
  },
});

export const {
  // setMode,
  setLogin,
  setLogout,
  //   setFriends,
  //   setPosts,
  //   setPost,
} = authSlice.actions;
export default authSlice.reducer;
