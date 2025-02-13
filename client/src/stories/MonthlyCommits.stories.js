import { MonthlyCommits } from '../components/Graphs';

export default {
  title: 'Library/Monthly Commits',
  component: MonthlyCommits,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    // weeklyCommits: [],
  },
};

export const Filled = {
  args: {
    // weeklyCommits: genMockCommits()
  },
};
