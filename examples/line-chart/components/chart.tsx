import { Attribute } from '@sisense/sdk-data';
import { LineChart } from '@sisense/sdk-ui';
import { DataOptions, StyleOptions } from '../config';
import { PluginComponent } from '@sisense/sdk-plugins';

export const Chart: PluginComponent<DataOptions, StyleOptions> = (props) => {
  return (
    <LineChart
      dataSet={props.dataSource}
      dataOptions={{
        category: (props.dataOptions.categories.map((d) => d.column) ??
          []) as Attribute[],
        value: props.dataOptions.values.map((d) => d.column) ?? [],
        breakBy:
          (props.dataOptions.breakBy.map((d) => d.column) as Attribute[]) ?? [],
        seriesToColorMap: props.dataOptions.seriesToColorMap,
      }}
      filters={props.filters}
      styleOptions={{
        ...props.styleOptions,
      }}
    />
  );
};
