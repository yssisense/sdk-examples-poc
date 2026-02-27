import React from 'react';

import { PluginComponent } from '@sisense/sdk-plugins';

import { DataOptions, StyleOptions } from '../config';

export const Chart: PluginComponent<DataOptions, StyleOptions> = (props) => {
  return <div>Chart goes here</div>;
};
