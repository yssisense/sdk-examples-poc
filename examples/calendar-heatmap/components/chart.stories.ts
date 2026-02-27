import type { Meta, StoryObj } from '@storybook/react';
import ChartComponent from './chart';
import * as DM from '@/models/sample-ecommerce';
import { filterFactory, measureFactory } from '@sisense/sdk-data';

const meta = {
  title: 'Calendar Heatmap V2',
  component: ChartComponent,
} satisfies Meta<typeof ChartComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Chart: Story = {
  args: {
    dataSource: DM.DataSource,
    dataOptions: {
      date: [{ column: DM.Commerce.Date.Days }],
      color: [{ column: measureFactory.sum(DM.Commerce.Revenue, 'Total Revenue') }],
    },
    filters: [
      filterFactory.members(DM.Commerce.Date.Months, [
        '2012-01-01T00:00:00',
        '2012-02-01T00:00:00',
        '2012-3-01T00:00:00',
      ]),
    ],
    highlights: [],
    styleOptions: {
      binCount: 5,
      barBorder: false,
      binSizePrecision: 0,
      subtype: 'stacked',
    },
  },
};
