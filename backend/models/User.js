import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
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
    default: '',
  },
  weight: {
    type: Number,
    required: false,
    default: '',
  },
  height: {
    type: Number,
    required: false,
    default: '',
  },
  gender: {
    type: String,
    enum: ['man', 'woman'],
    required: true,
  },
  picturePath: {
    type: String,
    default: '',
  },
  friends: {
    type: Array,
    default: [],
  },
  location: String,
});

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
