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
    // weeklyCommits: [],
    colors: ['#eaeaea', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  },
};

export const Filled = {
  args: {
    weeklyCommits: genMockCommits(),
  },
};
