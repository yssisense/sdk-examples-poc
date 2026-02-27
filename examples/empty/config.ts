import { Config, ExtractDataOptions } from '@sisense/sdk-plugins';

export type DataOptions = ExtractDataOptions<typeof config>;

export interface StyleOptions {}

export const config: Config<StyleOptions> = {
  name: 'PLUGIN_NAME',
  displayName: 'PLUGIN_DISPLAY_NAME',
  panels: [
    {
      title: 'Categories',
      metadataType: 'dimension',
      maxItems: 1,
    },
    {
      title: 'Value',
      metadataType: 'measure',
      colorOptions: {
        single: true,
        conditional: true,
        range: false,
      },
      maxItems: 1,
    },
    {
      title: 'Break By',
      metadataType: 'dimension',
      maxItems: 1,
    },
  ],
};
