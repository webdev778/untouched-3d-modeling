import React, {Component} from 'react';
import styles from './Value.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);

class Value extends Component{
  
  state = {
    _selected: false
  };

  handleClick = () => {
    let { _selected } = this.state;
    this.setState({ _selected: !_selected});

    // let parent = this._reactInternalInstance._currentElement._owner._instance;
    // parent.test();
  };

  render () {
    const {label, count} = this.props;
    // console.log(label + ' selected '+this.props.selected);
    // const {handleClick} = this;
    return (
      <div className = {cx('value')} onClick={this.props.onClick}>
        <div className = { this.props.selected ? cx('label_selected') : cx('label')}>
          {label}
        </div>
        <div className = {cx('count')}>
          {count}
        </div>
      </div>
    );
  }
}

export default Value;