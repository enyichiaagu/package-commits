import { MonthlyCommits } from '../components/Graphs';

export default {
  title: 'Library/Monthly Commits',
  component: MonthlyCommits,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    highestCommits: 3,
    // weeklyCommits: [],
  },
};

export const Filled = {
  args: {
    highestCommits: 20
  },
};
