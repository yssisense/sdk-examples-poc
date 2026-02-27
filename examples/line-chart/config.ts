import { Config, ExtractDataOptions } from '@sisense/sdk-plugins';
import { LineStyleOptions, ValueToColorMap } from '@sisense/sdk-ui';

export type DataOptions = ExtractDataOptions<typeof config> & {
  seriesToColorMap?: ValueToColorMap;
};

export interface StyleOptions {
  binCount: number;
  barBorder: boolean;
  binSizePrecision: number;
  subtype: 'default' | 'stacked' | 'overlay';
}

export const config: Config<LineStyleOptions> = {
  name: 'line-chart',
  displayName: 'SDK Line Chart',
  panels: [
    {
      title: 'Categories',
      metadataType: 'dimension',
      maxItems: 2,
    },
    {
      title: 'Values',
      metadataType: 'measure',
      colorOptions: {
        single: true,
        conditional: true,
        range: false,
      },
      maxItems: 50,
    },
    {
      title: 'break by',
      type: 'series',
      metadataType: 'dimension',
      maxItems: 1,
    },
  ],
};
