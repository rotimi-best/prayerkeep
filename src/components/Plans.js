import React from 'react';
import { useMediaQuery } from 'react-responsive';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from './Tabs';
import Empty from './Empty';
import MyPlans from './MyPlans';

const useStyles = makeStyles(theme => ({
  containerRoot: {
    paddingLeft: 0,
    paddingRight: 0
  },
  toolbar: theme.mixins.toolbar,
}));

const tabData = [
  {
    key: 1,
    label: 'My plans',
    props: {
      disabled: false
    }
  },
  {
    key: 2,
    label: 'Explore plans',
    props: {
      disabled: false
    }
  },
];
const tabContent = {
  '1': <MyPlans />,
  '2': <Empty type="comingSoon" text="Coming Soon..." />
}

const Plans = props => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });

  return (
    <main className={classes.content}>
      {isDesktopOrLaptop && <div className={classes.toolbar} />}
      <Container
        maxWidth="sm"
        classes={{
          root: classes.containerRoot
        }}
      >
        <CssBaseline />
        <Tabs
          tabData={tabData}
          value={currentTab}
          handleChange={handleTabChange}
        />
        {tabContent[currentTab+1]}
      </Container>
    </main>
  )
}

Plans.propTypes = {
  // classes: PropTypes.object.isRequired,
  // prayers: PropTypes.object.isRequired,
  // userId: PropTypes.string.isRequired,
};

export default Plans;