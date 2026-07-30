import mongoose from 'mongoose';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await User.insertMany([
      {
        username: 'alex_runner',
        email: 'alex.runner@example.com',
        displayName: 'Alex Rivera',
        age: 29,
        fitnessGoal: 'Improve 10K pace',
      },
      {
        username: 'maya_lifts',
        email: 'maya.lifts@example.com',
        displayName: 'Maya Chen',
        age: 34,
        fitnessGoal: 'Build functional strength',
      },
      {
        username: 'sam_cycles',
        email: 'sam.cycles@example.com',
        displayName: 'Sam Patel',
        age: 41,
        fitnessGoal: 'Train for a century ride',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Downtown Dashers',
        city: 'Seattle',
        coach: 'Jordan Kim',
        memberUsernames: ['alex_runner', 'maya_lifts'],
      },
      {
        name: 'Trail Tempo',
        city: 'Portland',
        coach: 'Riley Brooks',
        memberUsernames: ['sam_cycles'],
      },
    ]);

    await Activity.insertMany([
      {
        username: 'alex_runner',
        type: 'Run',
        durationMinutes: 46,
        caloriesBurned: 520,
        activityDate: new Date('2026-07-25T07:30:00Z'),
      },
      {
        username: 'maya_lifts',
        type: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 410,
        activityDate: new Date('2026-07-26T18:15:00Z'),
      },
      {
        username: 'sam_cycles',
        type: 'Cycling',
        durationMinutes: 92,
        caloriesBurned: 980,
        activityDate: new Date('2026-07-27T06:45:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      { username: 'sam_cycles', points: 1840, rank: 1, streakDays: 18 },
      { username: 'alex_runner', points: 1565, rank: 2, streakDays: 12 },
      { username: 'maya_lifts', points: 1390, rank: 3, streakDays: 9 },
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Run Builder',
        focusArea: 'Cardio endurance',
        difficulty: 'Intermediate',
        durationMinutes: 40,
        recommendedFor: ['Improve 10K pace', 'Cardio conditioning'],
      },
      {
        title: 'Full-Body Strength Circuit',
        focusArea: 'Strength',
        difficulty: 'Intermediate',
        durationMinutes: 45,
        recommendedFor: ['Build functional strength', 'General fitness'],
      },
      {
        title: 'Climb Ready Ride',
        focusArea: 'Cycling power',
        difficulty: 'Advanced',
        durationMinutes: 75,
        recommendedFor: ['Train for a century ride', 'Leg power'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
