import PropTypes from 'prop-types';
import YAxis from './YAxis';
import Bars from './Bars';
import {
  daysWidth,
  bottomSpace,
  topSpace,
  padding,
  barLeftPadding,
  barWidth,
  defaultColors,
  MONTHS,
  GRAPH_HEIGHT,
  GRAPH_WIDTH,
} from '../utils/constants';
import { weeklyToMonthlyCommits } from '../utils/distribution';

function MonthlyCommits({ weeklyCommits }) {
  const monthObj = weeklyToMonthlyCommits(weeklyCommits, MONTHS);
  const highestCommits = Math.max(...Object.values(monthObj));
  console.log(monthObj);

  return (
    <div className='monthly-commits'>
      <svg height={GRAPH_HEIGHT} width={daysWidth} className='y-placement'>
        <YAxis
          height={GRAPH_HEIGHT - bottomSpace - topSpace}
          width={daysWidth}
          topSpace={topSpace}
          highestCommits={highestCommits}
        />
      </svg>
      <div className='contributions'>
        <svg height={GRAPH_HEIGHT} width={GRAPH_WIDTH}>
          <Bars
            xStart={daysWidth}
            yStart={topSpace}
            minY={GRAPH_HEIGHT - bottomSpace - topSpace}
            textY={GRAPH_HEIGHT - bottomSpace + padding}
            barWidth={barWidth}
            monthObj={monthObj}
            highestCommits={highestCommits}
            sidePadding={barLeftPadding}
            defaultColors={defaultColors}
          />
        </svg>
      </div>
    </div>
  );
}

MonthlyCommits.propTypes = {
  weeklyCommits: PropTypes.arrayOf(
    PropTypes.exact({
      week: PropTypes.string,
      commits: PropTypes.arrayOf(PropTypes.number),
    })
  ),
};

export default MonthlyCommits;
