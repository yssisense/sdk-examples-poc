import React from 'react';

import { GenericDataOptions } from '@sisense/sdk-plugins';

import { StyleOptions } from '../config';

interface DesignPanelsProps {
  dataOptions: GenericDataOptions;
  styleOptions: StyleOptions;
  onChange: (options: StyleOptions) => void;
}

export const DesignPanels = React.memo((props: DesignPanelsProps) => {
  return <div>Design panels go here</div>;
});
