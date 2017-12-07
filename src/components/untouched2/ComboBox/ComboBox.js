import React, { Component } from 'react';
import styles from './ComboBox.scss';
import classNames from 'classnames/bind';
// import FontAwesome from 'react-fontawesome'
import { Value } from 'components';

// import arrowup from 'static/images/arrow-up.png'
// import arrowdown from 'static/images/arrow-down.png'

import ArrowDown from 'react-icons/lib/ti/arrow-down';
import ArrowUp from 'react-icons/lib/ti/arrow-up';

// import faStyles from 'font-awesome/css/font-awesome.css';

const cx = classNames.bind(styles);

class ComboBox extends Component {
  state = {
    flag: false,
    selectedKey : this.props.initValue
  }

  handle = () => {
    const {flag} = this.state;

    this.setState({flag: !flag});
  }

  handleItemClick(key) {
    if(this.state.selectedKey !== key)
      this.props.onChange(key);

    this.setState({
      selectedKey: key
    });
    console.log(key);
  }

  test = () => {
    alert('hahah');
  }

  renderValues = (options) => {
    if(options === undefined) return;
    return options.map((value, i) => {
        const {label, count} = value;
        return (
          <Value label={label} count={count} key={i} selected={this.state.selectedKey === i} onClick={() => this.handleItemClick(i)} />
        );
    });
  }

  render() {
    const { flag } = this.state;
    const { handle } = this;
    const { title } = this.props;
    const { options } = this.props;
    const { renderValues } = this;
    let selectedLabel = '';
    if (options[this.state.selectedKey] !== undefined){
      selectedLabel = options[this.state.selectedKey].label;    
      if (selectedLabel === undefined) selectedLabel = '';
    }

    return (
      <div className = {cx('combobox')}>
        <div className = {cx('combobox-input')} onClick={handle}>
          <div className = {cx('combobox-input-title')}>{title}</div>
          <div className = {cx('combobox-input-value')}> {selectedLabel}</div>
          <div className = {cx('combobox-input-icon')}>
            { !flag &&
              <ArrowDown fill='#a4a59e' className={cx('arrow_down')}/>
              // <FontAwesome
              // className={cx('super-crazy-colors')}
              // name='arrow-down'
              // size='1'
              // style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#a4a59e' }}
              // />
            }
            { flag && 
              <ArrowUp className={cx('arrow_up')}/>
              // <FontAwesome
              // className={cx('super-crazy-colors')}
              // name='arrow-up'
              // size='1'
              // style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#e0ddd6' }}
              // />
            }
          </div>
        </div>
        { flag && 
          <div className={cx('dropdown-menu')}>
            <div className={cx('vscroll')}>
              {renderValues(options)}
            </div>
            <div className={cx('close-button')} onClick={ handle }>
              {/* <FontAwesome
              className={cx('super-crazy-colors')}
              name='times'
              size='1'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#e0ddd6' }}
              /> */}
              <div className={cx('image')}></div>
            </div>
          </div>
        }
      </div>
    )
  };
}

export default ComboBox;
