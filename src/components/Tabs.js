import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function CustomTabs(props) {
  const {
    value,
    handleChange,
    tabData
  } = props;

  return (
    <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        variant="fullWidth"
        aria-label="app-tabs"
      >
      {tabData.map(tab => (
        <Tab key={tab.key} label={tab.label} {...tab.props} />
      ))}
      </Tabs>
    </Paper>
  );
}