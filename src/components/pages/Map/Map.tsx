import React, { useEffect, useState } from 'react';

import MapChartView from './Map.view';

import { Country } from '../../../models/country'

interface Props { };

const countriesData: {[key: string]: Country} = { };
const countries: Country[] = [
  {
    location: 'United Kingdom',
    company1: 20,
    company2: 52,
    company3: 49,
  },
  {
    location: 'France',
    company1: 20,
    company2: 2,
    company3: 49,
  },
    {
    location: 'Israel',
    company1: 20,
    company2: 5,
    company3: 1,
  },
  {
    location: 'Russia',
    company1: 20,
    company2: 3,
    company3: 49,
  },
  {
    location: 'Australia',
    company1: 2,
    company2: 3,
    company3: 49,
  },
  {
    location: 'South Africa',
    company1: 2,
    company2: 3,
    company3: 49,
  },
];

const Map: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  const [ selectedCountryState, setSelectedCountryState ] = useState<Country | null>(null);
  
  useEffect(() => {
    // Get the total amount of countries
    const countriesWithTotal = countries.map((country) => {
      const { company1, company2, company3 } = country;
      return { ...country, total: (company1 + company2 + company3)}
    });

    // Get the highest amount of countries
    const max = countriesWithTotal.reduce((acc, country) => acc = acc > country.total ? acc : country.total, 0);

    // Initialize countriesData 
    for (const country of countriesWithTotal) {
      const countryName = country.location;
      countriesData[countryName] = {...country, opacity: 100 * country.total / max}
    }
  }, []);

  const setCountryData = (countryName: string) =>{
    setSelectedCountryState(() => countriesData[countryName])
  };

  const getCountryData = (countryName: string): Country => {
    return countriesData[countryName];
  }

  return (
    <MapChartView
        {...selectedCountryState}
        getCountryData={getCountryData}
        setCountryData={setCountryData}
    >{props.children}</MapChartView>
  );
};

Map.displayName = 'Map';
Map.defaultProps = {};

export default Map;