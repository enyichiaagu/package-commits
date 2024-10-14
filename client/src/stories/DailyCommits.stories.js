import DailyCommits from '../components/DailyCommits';
import { genMockCommits } from '../utils/graph';

export default {
  title: 'Library/Daily Commits',
  component: DailyCommits,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    colors: ['#f9f9f9', '#87deaa', '#5fd38d', '#217844', '#0b2817'],
    weeklyCommits: [],
  },
};

export const Filled = {
  args: {
    weeklyCommits: genMockCommits(),
  },
};
