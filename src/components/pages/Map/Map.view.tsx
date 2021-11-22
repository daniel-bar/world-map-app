import React from 'react';
import ReactTooltip from "react-tooltip";

import { Country } from '../../../models/country'

import Map from '../../ui/MapChart/MapChart';

import classes from './Map.module.scss';

interface Props {
  readonly location?: string;
  readonly company1?: number;
  readonly company2?: number;
  readonly company3?: number;
  readonly getCountryData: (countryName: string) => Country;
  readonly setCountryData: (countryName: string) => void;
};

const MapView: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {

  return (
    <div>
      <Map getCountryData={props.getCountryData} setTooltipContent={props.setCountryData}/>
        {props.location && (<ReactTooltip>
          {props.location ? props.location : 'No Data'}
          <br />
          <div className={classes['blue']}>
            Company1: {props.company1}
          </div>
          <div className={classes['red']}>
            Company1: {props.company2}
          </div>
          <div className={classes['green']}>
            Company1: {props.company3}
          </div>
        </ReactTooltip>)}
    </div>
  );
};

MapView.displayName = 'MapView';
MapView.defaultProps = {};

export default MapView;