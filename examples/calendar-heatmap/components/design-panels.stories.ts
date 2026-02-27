import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import DesignPanelsComponent from './design-panels';
import { Chart } from './chart.stories';

const meta = {
  title: 'Calendar Heatmap V2',
  component: DesignPanelsComponent,
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof DesignPanelsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DesignPanels: Story = {
  args: {
    dataOptions: Chart.args.dataOptions,
    styleOptions: {
      binCount: 2,
      barBorder: true,
      binSizePrecision: 3,
      subtype: 'stacked',
    },
  },
};
