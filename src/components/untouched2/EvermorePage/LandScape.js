import React from 'react';
import styles from './EvermorePage.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);

export default class LandScape extends React.Component{

  render() {
    return (
      <div className = {cx('viewbox')}>
        <div>
          <p> View </p>
        </div>
        <div className = {cx('image')}>
          <img src={this.props.view} alt="Untouched Pro" />
        </div>
      </div>
    );    
  }
}