import React, { memo } from 'react';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

import { Country } from '../../../models/country';

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const Map = ({ setTooltipContent, getCountryData }: { setTooltipContent: (countryName: string) => void; getCountryData: (countryName: string) => Country; }) => {
  return (
    <React.Fragment>
      <ComposableMap
        data-tip=""
        projectionConfig={{ scale: 150 }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo: { rsmKey: React.Key | null | undefined; properties: { NAME: string; }; }) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const countryName = geo.properties.NAME;
                    setTooltipContent(countryName);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: getCountryData(geo.properties.NAME)?.opacity ? "#34047d" : "#b9b9bd",
                      outline: "none",
                      opacity: Number(getCountryData(geo.properties.NAME)?.opacity) + '%',
                    },
                    hover: {
                      fill: "#34047d",
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </React.Fragment>
  );
};

export default memo(Map);
