import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import rcFont from '../../../src/assets/RcFont/RcFont.scss';
import TabNavigationView from '../../../src/components/TabNavigationView';
import RouterInteraction from '../../../src/modules/RouterInteraction';

const tabs = [
  {
    icon: <span className={rcFont.uni2467} />,
    _icon: <span className={rcFont.icon_setting} />,
    label: 'Settings',
    path: '/settings',
    isActive: currentPath => (
      currentPath.substr(0, 9) === '/settings'
    ),
  },
  // {
  //   icon: <span className={rcFont.uniAE} />,
  //   label: 'Calls',
  //   path: '/calls',
  // },
  // {
  //   icon: <span className={rcFont.uniC8} />,
  //   label: 'History',
  //   path: '/history',
  // },
  {
    icon: <span className={rcFont.uniA4} />,
    _icon: <span className={rcFont.RC_shapes_1_40_pressed} />,
    label: 'Dial Pad',
    path: '/',
    noticeCounts: 2,
  },
];

const MainView = connect((state, props) => ({
  tabs,
  currentPath: props.router.currentPath,
}))(TabNavigationView);

MainView.propTypes = {
  router: PropTypes.instanceOf(RouterInteraction).isRequired,
  tabs: TabNavigationView.propTypes.tabs,
};

export default MainView;
