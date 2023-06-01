import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: false,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: false,
      default: '',
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      min: 2,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 25,
    },
    age: {
      type: Number,
      required: false,
      default: 0,
    },
    location: {
      type: String,
      required: false,
      default: '',
    },
    weight: {
      type: Number,
      required: false,
      default: 0,
    },
    height: {
      type: Number,
      required: false,
      default: 0,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'other'],
      required: false,
    },
    // picturePath: {
    //   type: String,
    //   default: '',
    //   required: false,
    // },
    // friends: {
    //   type: Array,
    //   required: false,
    //   default: [],
    // },
  },
  { timestamps: true },
);

const User = mongoose.model('User', UserSchema);
// const MealCalendar = mongoose.model('MealCalendar', MealCalendarSchema);

// const MealSchema = new mongoose.Schema({
//   dishName: {
//     type: String,
//     required: true,
//   },
//   ingredients: [
//     {
//       name: {
//         type: String,
//         required: true,
//       },
//       quantity: {
//         type: Number,
//         required: true,
//       },
//       grams: {
//         type: Number,
//         required: true,
//       },
//     },
//   ],
//   recipe: {
//     type: String,
//     required: true,
//   },
// });

// const DaySchema = new mongoose.Schema({
//   breakfast: {
//     type: [MealSchema],
//     default: [],
//   },
//   lunch: {
//     type: [MealSchema],
//     default: [],
//   },
//   dinner: {
//     type: [MealSchema],
//     default: [],
//   },
// });

// const WeekSchema = new mongoose.Schema({
//   days: [DaySchema],
// });

// const MealCalendarSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   weeks: {
//     type: [WeekSchema],
//     default: [],
//   },
// });

export default User;
