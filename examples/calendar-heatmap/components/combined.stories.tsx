import type { Meta, StoryObj } from '@storybook/react';
import Chart from './chart';
import { Chart as ChartStory } from './chart.stories';
import DesignPanels from './design-panels';
import { ComponentProps, useState } from 'react';

const meta = {
  title: 'Calendar Heatmap V2',
  component: Chart,
} satisfies Meta<typeof Chart>;
export default meta;

type Story = StoryObj<typeof Chart>;

function ChartAndPanels({ chartProps }: { chartProps: ComponentProps<typeof Chart> }) {
  const [styleOptions, setStyleOptions] = useState(chartProps.styleOptions);

  return (
    <div style={{ display: 'flex', width: '80vh', minHeight: 400 }}>
      <div style={{ flex: 3, border: '0.5px solid gray' }}>
        <Chart {...chartProps} styleOptions={styleOptions} />
      </div>
      <div style={{ flex: 1, padding: 4, border: '0.5px solid gray' }}>
        <DesignPanels
          dataOptions={chartProps.dataOptions}
          styleOptions={styleOptions}
          onChange={setStyleOptions}
        />
      </div>
    </div>
  );
}

export const Combined: Story = {
  args: ChartStory.args,
  render: (args) => <ChartAndPanels chartProps={args} />,
};
