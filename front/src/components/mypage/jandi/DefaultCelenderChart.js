// yarn add @nivo/core @nivo/calendar
import { ResponsiveCalendar } from '@nivo/calendar';
import Celenderdata from './data.json';

const DefaultCelenderChart = ({ data }) => (
  <div className="" style={{ height: 500 }}>
    <ResponsiveCalendar
      data={Celenderdata}
      from="2015-03-01"
      to="2016-07-12"
      emptyColor="#eeeeee"
      colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
      margin={{
        top: 100,
        right: 30,
        bottom: 60,
        left: 30,
      }}
      yearSpacing={60}
      monthBorderColor="#ffffff"
      monthLegendOffset={10}
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'row',
          translateY: 36,
          itemCount: 4,
          itemWidth: 34,
          itemHeight: 36,
          itemDirection: 'top-to-bottom',
        },
      ]}
    />
  </div>
);
export default DefaultCelenderChart;
