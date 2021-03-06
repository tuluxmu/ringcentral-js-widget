import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import 'font-awesome/css/font-awesome.css';

import Header from '../Header';
import Panel from '../Panel';
import Line from '../Line';
import InputLine from '../InputLine';
import TextInput from '../TextInput';

import styles from './styles.scss';
import i18n from './i18n';
import countryNames from '../../lib/countryNames';


export default class RegionSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countryCodeValue: props.countryCode,
      areaCodeValue: props.areaCode,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.areaCode !== this.props.areaCode) {
      this.setState({
        areaCodeValue: nextProps.areaCode,
      });
    }
    if (nextProps.countryCode !== this.props.countryCode) {
      this.setState({
        countryCodeValue: nextProps.countryCode,
      });
    }
  }
  onAreaCodeChange = (e) => {
    const value = e.currentTarget.value.replace(/[^\d]/g, '');
    if (value !== this.state.areaCodeValue) {
      this.setState({
        areaCodeValue: value,
      });
    }
  }
  onCountryCodeChange = (e) => {
    const value = e.currentTarget.value;
    if (value !== this.state.countryCodeValue) {
      this.setState({
        countryCodeValue: value,
      });
    }
  }
  onResetClick = () => {
    this.setState({
      areaCodeValue: this.props.areaCode,
      countryCodeValue: this.props.countryCode,
    });
  }
  onSaveClick = () => {
    if (typeof this.props.onSave === 'function') {
      this.props.onSave({
        areaCode: this.state.areaCodeValue,
        countryCode: this.state.countryCodeValue,
      });
    }
  }
  onBackClick = () => {
    if (typeof this.props.onBackButtonClick === 'function') {
      this.props.onBackButtonClick();
    }
  }
  render() {
    const buttons = [];
    const hasChanges = this.state.areaCodeValue !== this.props.areaCode ||
      this.state.countryCodeValue !== this.props.countryCode;
    if (this.props.onBackButtonClick) {
      buttons.push({
        label: <i className="fa fa-chevron-left" />,
        onClick: this.onBackClick,
        placement: 'left',
      });
      buttons.push({
        label: <i className="fa fa-undo" />,
        onClick: this.onResetClick,
        placement: 'right',
        hidden: !hasChanges,
      });
      buttons.push({
        label: <i className="fa fa-floppy-o" />,
        onClick: this.onSaveClick,
        placement: 'right',
        disabled: !hasChanges,
      });
    }
    const hasNA = !!this.props.availableCountries.find(c => c.isoCode === 'US') ||
      !!this.props.availableCountries.find(c => c.isoCode === 'CA');
    let messageId;
    if (this.props.availableCountries.length > 1) {
      if (hasNA) {
        messageId = 'MultiWithNAMessage';
      } else {
        messageId = 'MultiWithoutNAMessage';
      }
    } else if (hasNA) {
      messageId = 'NAOnlyMessage';
    }
    const showAreaCode = this.state.countryCodeValue === 'US' ||
      this.state.countryCodeValue === 'CA';
    const showCountryList = this.props.availableCountries.length > 1;

    return (
      <div className={classnames(styles.root, this.props.className)}>
        <Header
          buttons={buttons}
          >
          {i18n.getString('title', this.props.currentLocale)}
        </Header>
        <Panel className={styles.content}>
          <Line>
            {i18n.getString(messageId, this.props.currentLocale)}
          </Line>
          {showCountryList && (
            <InputLine
              label={i18n.getString('country', this.props.currentLocale)}>
              <select
                className={styles.countrySelect}
                value={this.state.countryCodeValue}
                onChange={this.onCountryCodeChange} >
                {
                  this.props.availableCountries.map((c, idx) => (
                    <option key={idx} value={c.isoCode}>
                      {`(+${c.callingCode}) ${countryNames.getString(c.isoCode, this.props.currentLocale)}`}
                    </option>
                  ))
                }
              </select>
            </InputLine>
          )}
          {showAreaCode && (
            <InputLine
              label={i18n.getString('areaCode', this.props.currentLocale)}>
              <TextInput
                placeholder={i18n.getString('areaCodePlaceholder', this.props.currentLocale)}
                maxLength={3}
                value={this.state.areaCodeValue}
                onChange={this.onAreaCodeChange} />
            </InputLine>
          )}
          {this.props.children}
        </Panel>
      </div>
    );
  }
}

RegionSettings.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onBackButtonClick: PropTypes.func,
  currentLocale: PropTypes.string.isRequired,
  availableCountries: PropTypes.arrayOf(PropTypes.shape({
    isoCode: PropTypes.string,
    callingCode: PropTypes.string,
  })).isRequired,
  countryCode: PropTypes.string.isRequired,
  areaCode: PropTypes.string.isRequired,
  onSave: PropTypes.func,
};
