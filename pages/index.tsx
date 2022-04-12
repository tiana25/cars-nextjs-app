import React, { useState } from "react";
import { Flex, SelectInput } from "vcc-ui";
import useFetch from "react-fetch-hook";
import CarSlider from "../src/components/CarSlider";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Car } from "../src/types";

const FILTER_ALL = "ALL"

const HomePage = () => {

  const { isLoading, error, data } = useFetch<Car[]>('/api/cars.json')
  const bodyTypeFilters = data?.map((car: Car) => car.bodyType).filter((item, i, ar) => ar.indexOf(item) === i);
  const [currentBodyTypeFilter, setCurrentBodyTypeFilter] = useState(FILTER_ALL);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const filteredCarsArray = (currentBodyTypeFilter === FILTER_ALL) ? data 
    : data?.filter((car: Car) => car.bodyType === currentBodyTypeFilter)

  return (
    <>
      <Flex extend={{ maxWidth: 400, marginBottom: '2rem' }}>
        <SelectInput label={'Body Type'} value={currentBodyTypeFilter} onChange={(e) => setCurrentBodyTypeFilter(e.target.value)}>
          <option value="ALL">All</option>
          { bodyTypeFilters?.map((bodyType, i) => (
            <option value={bodyType} key={i}>
              {bodyType}
            </option>
          )) }
        </SelectInput>
      </Flex>
      
      <CarSlider cars={filteredCarsArray}/>
    </>
  )
};

export default HomePage;
