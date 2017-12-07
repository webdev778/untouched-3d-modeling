import React, {Component} from 'react';
import styles from './FloorSelect.scss';
import classNames from 'classnames/bind';
import Floor from './Floor';

const cx = classNames.bind(styles);

export default class FloorSelect extends Component{
  state = {
    selected : this.props.selected
  };

  handleSelect = (index) => {
    this.setState({selected: index});
    console.log(index + ' selected');
    this.props.onSelectChange(index);
  }

  renderFloor = () => {
    const floorlist = this.props.floorData;
    // const defaultSelect = this.props.selected;

    return (
      floorlist.map((value, i) => {
        return (
          <Floor onClick={() => this.handleSelect(i)} selected={this.state.selected === i} key={i} >{value}</Floor>
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