import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    focusArea: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true },
    recommendedFor: [{ type: String, required: true, trim: true }],
  },
  { timestamps: true }
);

export const Workout = model('Workout', workoutSchema);