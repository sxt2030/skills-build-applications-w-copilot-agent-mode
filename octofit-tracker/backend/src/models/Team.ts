import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    coach: { type: String, required: true, trim: true },
    memberUsernames: [{ type: String, required: true, trim: true }],
  },
  { timestamps: true }
);

export const Team = model('Team', teamSchema);