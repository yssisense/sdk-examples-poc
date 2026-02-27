import React from 'react';
import styled from '@emotion/styled';
import { DataOptions, StyleOptions } from '../config';
import { LineDesignPanel } from './examples/line-design-panel';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  background-color: #f9f9fb;
`;

const Panel = styled.div``;
interface DesignPanelsProps {
  dataOptions: DataOptions;
  styleOptions: StyleOptions;
  onChange: (options: StyleOptions) => void;
}

export const DesignPanels = React.memo((props: DesignPanelsProps) => {
  return (
    <Container>
      <Panel>
        <LineDesignPanel
          dataOptions={props.dataOptions}
          styleOptions={props.styleOptions}
          onChange={(name: string, value: any) => {
            const lineStyleOptions: { [key: string]: any } = {
              ...props.styleOptions,
            };
            lineStyleOptions[name] = value;
            props.onChange(lineStyleOptions);
          }}
        />
      </Panel>
    </Container>
  );
});
