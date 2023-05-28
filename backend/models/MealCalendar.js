import mongoose from 'mongoose';

const MealCalendarSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  weeks: {
    type: [WeekSchema],
    default: [],
  },
});

const User = mongoose.model('User', UserSchema);
const MealCalendar = mongoose.model('MealCalendar', MealCalendarSchema);
