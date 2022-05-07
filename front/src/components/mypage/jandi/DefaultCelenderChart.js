// yarn add @nivo/core @nivo/calendar
import { ResponsiveCalendar } from '@nivo/calendar';
// import data from './data.json';

const DefaultCelenderChart = ({ data }) => (
  <div className="" style={{ height: 300 }}>
    <ResponsiveCalendar
      theme={{
        fontFamily: 'Roboto',
        fontSize: 15,

        tooltip: {
          container: {
            fontSize: 20,
            fontFamily: 'Roboto',
            background: '#ECF8D9',
          },
        },
      }}
      data={data}
      from="2022-01-01"
      to="2022-12-31"
      emptyColor="#F7FCEF"
      colors={['#F79D9D', '#F46D6D', '#F03E3E', '#E91212']}
      minValue={0}
      margin={{
        top: 0,
        right: 30,
        bottom: 0,
        left: 40,
      }}
      yearSpacing={60}
      monthBorderWidth={2}
      monthSpacing={15}
      monthBorderColor=" #C0E883"
      monthLegendOffset={10}
      dayBorderWidth={2}
      dayBorderColor="#FBCCCC"
      daySpacing={1}
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
      tooltip={(data) => {
        return (
          <div
            style={{
              fontWeight: 'bold',
              color: '000',
              fontSize: '1.2rem',
              fontFamily: 'Roboto',
            }}
          >
            <span>{data.day}</span>
            <p style={{ color: '#3E5B11' }}>Left to eat : {data.value} kcal </p>
          </div>
        );
      }}
    />
  </div>
);
export default DefaultCelenderChart;
