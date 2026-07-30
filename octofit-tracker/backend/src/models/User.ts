import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    fitnessGoal: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = model('User', userSchema);