// import axios from 'axios';
import { bedroom_options, bathroom_options, car_options } from 'lib/base/constants';
import { units } from './data';

export const getUnitData = (searchOptions) => {
  console.log('---api requested : getUnitData ---');
  console.log(`request parameter : ${JSON.stringify(searchOptions)}`);

  // bind combobox index to real value from array
  const search_options = {
    max_price : 400000+ searchOptions.maxPrice*50000,
    aspect : searchOptions.aspect,
    bedrooms : bedroom_options[searchOptions.beds],
    bathrooms : parseFloat(bathroom_options[searchOptions.baths]),
    parking : car_options[searchOptions.cars]
  }

  // api execute with following conditions
  const filtered = units.filter((unit)=>{
    if (unit.price <= search_options.max_price || unit.aspect === search_options.aspect ||
        ((search_options.bedrooms === '4+' && unit.bedrooms >= 4)  ||
         (search_options.bedrooms !== '4+' && unit.bedrooms+'' === search_options.bedrooms)) 
        || (unit.bathrooms === search_options.bathrooms)
        || ((search_options.parking === '3+' && unit.parking >=3) 
          || search_options.parking === unit.parking+''))
      return true;

    return false;
  });

  console.log('filtered array');
  console.log(filtered);

  return new Promise((resolve, reject) => {
    resolve({ data: filtered })});
}