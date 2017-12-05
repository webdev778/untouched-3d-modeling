import React from 'react';
import styles from './SearchBox.scss';
import classNames from 'classnames/bind';
import {ComboBox} from 'components';


const cx = classNames.bind(styles);

const SearchBox = () => {
  let maxprice_options = [];
  
  let max_price = 400000;
  for (let i = 0; i < 19; i ++){
    // nax_price.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    maxprice_options.push({value: max_price, 
      label:'$' + max_price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') , count: 0});
    max_price += 50000;
  }

  const aspects = ['North', 'East', 'South', 'West', 'North/East', 'South/East', 'South/West', 'North/West'];
  let aspect_options = [];
  aspect_options = aspects.map((value) => {
    return {value: value, label: value, count: 0};
  });
  
  const bedroom_options = ['1', '2', '3', '4+'].map((value) => {
    return {value: value, label: value, count: 0};
  })

  const bathroom_options = ['1', '1.5', '2', '2.5'].map((value) => {
    return {value: value, label: value, count: 0};
  })

  const car_options = ['1', '2', '3+'].map((value) => {
    return {value: value, label: value, count: 0};
  })

  return (
    <div className = {cx('searchbox')}>
      <div className = {cx('pan')}>
        <ComboBox title="Max price" 
        options={maxprice_options} />
        <ComboBox title="Aspect"
        options={aspect_options}/>
      </div>
      <div className = {cx('pan')}>
        <ComboBox title="Beds" options={bedroom_options}/>
        <ComboBox title="Baths" options={bathroom_options}/>
        <ComboBox title="Cars" options={car_options}/>
      </div>
    </div>
  );
};

// class SearchBox extends Component {
//   state = {
//     flag: false
//   }
//   handle = () => {
//     const {flag} = this.state;

//     this.setState({flag: !flag});
//   }
//   render() {
//     const { flag } = this.state;
//     const { handle } = this;
//     return (
//       <div>
//         <button onClick={handle}>askdkd</button>
//         <h1>asdfasdf</h1>
//         { flag &&
//           <h2>a213491328491328</h2>
//         }
//       </div>
//     )
//   };
// }

export default SearchBox;
