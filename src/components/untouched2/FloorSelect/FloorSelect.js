import React, {Component} from 'react';
import styles from './FloorSelect.scss';
import classNames from 'classnames/bind';
import Floor from './Floor';

const cx = classNames.bind(styles);

export default class FloorSelect extends Component{
  state = {
    selected : -1
  };

  handleSelect = (index) => {
    this.setState({selected: index});
    console.log(index + ' selected');
  }

  renderFloor = () => {
    return (
      [1,3,5,7,9].map((value, i) => {
        return (
          <Floor onClick={() => this.handleSelect(i)} selected={this.state.selected === i} >{value}</Floor>
        )
      })
    );
  }

  render() {
    return (
      <div className = {cx('floor-select')}>
        {this.renderFloor()}
      </div>
    );
  }
}