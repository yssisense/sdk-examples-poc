import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
} from '@mui/material';
import styled from '@emotion/styled';
import { StyleOptions } from '../config';
import { GenericDataOptions } from '@internal/sisense-sdk-ui';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  padding: 10px;
`;

const Panel = styled.div``;
interface DesignPanelsProps {
  dataOptions: GenericDataOptions;
  styleOptions: StyleOptions;
  onChange: (options: StyleOptions) => void;
}

export const DesignPanels = React.memo((props: DesignPanelsProps) => {
  return (
    <Container>
      <Panel>
        <FormLabel id="histogram-bin-count">Bin Count</FormLabel>
        <Slider
          aria-labelledby="histogram-bin-count"
          size="small"
          defaultValue={props.styleOptions.binCount}
          onChangeCommitted={(_event, value) => {
            if (typeof value === 'number') {
              props.onChange({ ...props.styleOptions, binCount: value });
            }
          }}
          min={1}
          max={20}
          marks
          valueLabelDisplay="auto"
        />
      </Panel>
      <Panel>
        <FormControl>
          <FormLabel id="histogram-bar-border">Bar Border</FormLabel>
          <RadioGroup
            aria-labelledby="histogram-bar-border"
            value={props.styleOptions.barBorder}
            name="radio-buttons-group"
            onChange={(_e, value) => {
              props.onChange({
                ...props.styleOptions,
                barBorder: value === 'true',
              });
            }}
          >
            <FormControlLabel value={true} control={<Radio />} label="True" />
            <FormControlLabel value={false} control={<Radio />} label="False" />
          </RadioGroup>
        </FormControl>
      </Panel>
      <Panel>
        <FormLabel id="histogram-bin-size-precision">Bin Size Precision</FormLabel>
        <Slider
          aria-labelledby="histogram-bin-size-precision"
          size="small"
          defaultValue={props.styleOptions.binSizePrecision}
          onChangeCommitted={(_event, value) => {
            if (typeof value === 'number') {
              props.onChange({
                ...props.styleOptions,
                binSizePrecision: value,
              });
            }
          }}
          min={0}
          max={10}
          marks
          valueLabelDisplay="auto"
        />
      </Panel>
      <Panel>
        <InputLabel id="histogram-type-select">Subtype</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.styleOptions.subtype}
          label="Subtype"
          onChange={(e) => {
            props.onChange({
              ...props.styleOptions,
              subtype: e.target.value as StyleOptions['subtype'],
            });
          }}
        >
          <MenuItem value={'default'}>Default</MenuItem>
          <MenuItem value={'stacked'}>Stacked</MenuItem>
          <MenuItem value={'overlay'}>Overlay</MenuItem>
        </Select>
      </Panel>
    </Container>
  );
});

