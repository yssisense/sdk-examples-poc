import {
  PluginComponent,
  useExecutePluginQuery,
  LineChart,
  HighchartsOptions,
  useThemeContext,
} from '@sisense/sdk-ui';
import { DataOptions, StyleOptions } from '../config';
import { Cell, Data } from '@sisense/sdk-data';
import Color from 'colorjs.io';
import { useMemo, useState } from 'react';

const generateChartData = (dataInput: Data | undefined, month: string) => {
  if (!dataInput) return [];

  const data = dataInput.rows
    .filter((row) => {
      const cells = row as Cell[];
      const cellMonth = new Date(cells[0].data)
        .toLocaleString('default', { month: 'long', year: 'numeric' })
        .toUpperCase();
      return cellMonth === month;
    })
    .map((row) => {
      const cells = row as Cell[];
      return { date: cells[0].data, temperature: cells[1].data };
    });

  // Calculate the starting weekday index (0-6 of the first date in the given
  // array)
  const firstWeekday = new Date(data[0].date).getDay(),
    monthLength = data.length,
    lastElement = data[monthLength - 1].date,
    lastWeekday = new Date(lastElement).getDay(),
    lengthOfWeek = 6,
    emptyTilesFirst = firstWeekday,
    chartData = [];

  // Add the empty tiles before the first day of the month with null values to
  // take up space in the chart
  for (let emptyDay = 0; emptyDay < emptyTilesFirst; emptyDay++) {
    chartData.push({
      x: emptyDay,
      y: 5,
      value: null,
      date: null,
      custom: {
        empty: true,
      },
    });
  }

  // Loop through and populate with temperature and dates from the dataset
  for (let day = 1; day <= monthLength; day++) {
    // Get date from the given data array
    const date = data[day - 1].date;
    // Offset by thenumber of empty tiles
    const xCoordinate = (emptyTilesFirst + day - 1) % 7;
    const yCoordinate = Math.floor((firstWeekday + day - 1) / 7);
    const id = day;

    // Get the corresponding temperature for the current day from the given
    // array
    const temperature = data[day - 1].temperature;

    chartData.push({
      x: xCoordinate,
      y: 5 - yCoordinate,
      value: temperature,
      date: new Date(date).getTime(),
      custom: {
        monthDay: id,
      },
    });
  }

  // Fill in the missing values when dataset is looped through.
  const emptyTilesLast = lengthOfWeek - lastWeekday;
  const yCoordinate = Math.floor((firstWeekday + monthLength - 1) / 7);
  for (let emptyDay = 1; emptyDay <= emptyTilesLast; emptyDay++) {
    chartData.push({
      x: (lastWeekday + emptyDay) % 7,
      y: 5 - yCoordinate,
      value: null,
      date: null,
      custom: {
        empty: true,
      },
    });
  }
  return chartData;
};

export const Chart: PluginComponent<DataOptions, StyleOptions> = (props) => {
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const { themeSettings } = useThemeContext();

  const { data, isLoading, isError } = useExecutePluginQuery(props);
  const [monthIndex, setMonthIndex] = useState(0);
  const months = useMemo<string[] | undefined>(() => {
    if (!data) return undefined;
    const allMonths = data.rows.map((cells) =>
      new Date(cells[0].data)
        .toLocaleString('default', { month: 'long', year: 'numeric' })
        .toUpperCase(),
    );
    return [...new Set(allMonths)];
  }, [data]);

  const monthData = useMemo<{ [key: string]: any } | undefined>(() => {
    if (!months) return undefined;
    const monthData: { [key: string]: any } = {};
    months.forEach((month) => {
      monthData[month] = generateChartData(data, month);
    });
    return monthData;
  }, [months, data]);

  const seriesData = useMemo(
    () => (months && monthData ? monthData[months[monthIndex]] : undefined),
    [monthData, months, monthIndex],
  );

  // min and max color shoud come from styled measure
  const colors = useMemo(
    () =>
      Color.steps('#0de6ff', '#00a5b8', { steps: 4 }).map((c, index) => [
        index * 0.2 + 0.2,
        c.toString(),
      ]),
    [],
  );

  const chartOptions = !months
    ? undefined
    : {
        chart: {
          type: 'heatmap',
        },

        title: undefined,
        // title: { text: months[monthIndex], align: 'center'
        // } ,

        accessibility: {
          landmarkVerbosity: 'one',
        },

        tooltip: {
          enabled: true,
          outside: true,
          zIndex: 20,
          headerFormat: '',
          pointFormat: '{#unless point.custom.empty}{point.date:%A, %b %e, ' + '%Y}{/unless}',
          nullFormat: 'No data',
        },

        xAxis: {
          categories: weekdays,
          opposite: true,
          lineWidth: 26,
          offset: 13,
          lineColor: 'rgba(255, 255, 255, 1)',
          labels: {
            rotation: 0,
            y: 20,
            style: {
              textTransform: 'uppercase',
              fontWeight: 'bold',
            },
          },
          accessibility: {
            description: 'weekdays',
            rangeDescription:
              'X Axis is showing all 7 days of the week, ' + 'starting with Sunday.',
          },
        },

        yAxis: {
          min: 0,
          max: 5,
          accessibility: {
            description: 'weeks',
          },
          visible: false,
        },

        legend: {
          enabled: false,
          align: 'right',
          layout: 'vertical',
          verticalAlign: 'middle',
        },

        colorAxis: {
          min: 0,
          stops: colors,
          labels: {
            format: '{value}',
          },
        },

        series: [
          {
            keys: ['x', 'y', 'value', 'date', 'id'],
            data: seriesData,
            nullColor: 'rgba(196, 196, 196, 0.2)',
            borderWidth: 0,
            borderColor: 'rgba(196, 196, 196, 0.2)',
            dataLabels: [
              {
                enabled: true,
                format: '{#unless ' + 'point.custom.empty}{point.custom.monthDay}{/unless}',
                style: {
                  textOutline: 'none',
                  fontWeight: 'normal',
                  fontSize: '1rem',
                },
                y: 4,
              },
            ],
          },
        ],
      };

  if (isError) return <div>{'Error'}</div>;
  if (isLoading || !data || !months) return <div />;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        alignItems: 'center',
      }}
    >
      <div style={{ maxWidth: '75%', height: '75%', aspectRatio: '1 / 1' }}>
        <div
          style={{
            fontSize: '16px',
            fontFamily: themeSettings.typography.fontFamily,
            textAlign: 'center',
            width: '100%',
          }}
        >
          <span
            onClick={() => {
              if (monthIndex - 1 >= 0) setMonthIndex(monthIndex - 1);
            }}
          >
            {'Prev'}
          </span>
          <span style={{ padding: '40px' }}>{months[monthIndex]}</span>
          <span
            onClick={() => {
              if (monthIndex + 1 < months.length) setMonthIndex(monthIndex + 1);
            }}
          >
            {'Next'}
          </span>
        </div>
        <div style={{ width: '100%', height: '100%' }}>
          <LineChart
            dataSet={{
              columns: data.columns,
              rows: [data.rows[0]],
            }}
            dataOptions={{
              category: props.dataOptions.date,
              value: props.dataOptions.color,
              breakBy: [],
            }}
            onBeforeRender={(options) => {
              const newOptions = chartOptions as unknown as HighchartsOptions;
              return newOptions;
            }}
          />
        </div>
      </div>
    </div>
  );
};

