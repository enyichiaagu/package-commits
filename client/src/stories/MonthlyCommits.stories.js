import { genMockCommits, MonthlyCommits } from '../components/Graphs';

export default {
  title: 'Library/Monthly Commits',
  component: MonthlyCommits,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    highestCommits: genMockCommits(),
    // weeklyCommits: [],
  },
};

export const Filled = {
  args: {
    weeklyCommits: genMockCommits(27),
  },
};
