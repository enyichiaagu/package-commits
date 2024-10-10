import DailyCommits from '../components/DailyCommits';

export default {
  title: 'Library/DailyCommits',
  component: DailyCommits,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    colors: { control: 'object' },
  },
};

export const Default = {
  args: {
    colors: ['#f9f9f9', '#87deaa', '#5fd38d', '#217844', '#0b2817'],
  },
};
