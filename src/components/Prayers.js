import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import LinearProgress from '@material-ui/core/LinearProgress';
import { push } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import ScrollMenu from 'react-horizontal-scrolling-menu';

import PrayerCard from './PrayerCard';
import NewPrayerButton from './NewPrayerButton';
import Empty from './Empty';
// import GroupedPrayers from './GroupedPrayers';
import BadgeWithLabel from './BadgeWithLabel';
import PreviousArrow from './PreviousArrow';
import NextArrow from './NextArrow';

import { getPrayers, setPrayersTabValue } from '../actions/prayersAction';
import { getNewPrayerUrl } from '../helpers';

const styles = (theme) => ({
  containerRoot: {
    padding: 0,
    '& .horizontal-menu': {
      margin: '10px 5px',
      '& .MuiChip-root': {
        marginRight: 15,
        fontSize: 16,
        fontWeight: 'bold',
        cursor: 'pointer',
        '&.MuiChip-colorPrimary .badge': {
          backgroundColor: '#fff',
          color: '#000',
          fontWeight: 'bold',
        },
      },
    },
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  filters: {},
  tab: {
    boxShadow: 'none',
    [theme.breakpoints.up('lg')]: {
      top: 60,
    },
  },
});

const ArrowLeft = <PreviousArrow overideClassName="arrow-prev" />;
const ArrowRight = <NextArrow overideClassName="arrow-next" />;

const Prayers = (props) => {
  const {
    classes,
    pathname,
    prayers: {
      allPrayers: prayers,
      archivedPrayers,
      answeredPrayers,
      unAnsweredPrayers,
      interceedingPrayers,
      // prayersByCollection,
      isFetching,
      isUpdating,
      isAdding,
      prayersTabValue,
    },
    dispatch,
    userId,
  } = props;

  const handleChange = (newValue) => {
    dispatch(setPrayersTabValue(parseInt(newValue, 10)));
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1280px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  });

  useEffect(() => {
    if (!prayers.length) {
      dispatch(getPrayers(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const openNewPrayer = () => {
    return dispatch(push(getNewPrayerUrl(pathname)));
  };

  const tabData = [
    {
      label: 'All My Prayers',
      value: 0,
      textIfNoData: 'No prayer request added yet',
      showButtonToAdd: true,
      data: prayers,
      // render: function() {
      //   return prayersByCollection.map((prayerCol) => (
      //     <GroupedPrayers
      //       key={prayerCol._id}
      //       collectionId={prayerCol._id}
      //       title={prayerCol.title}
      //       prayers={prayerCol.prayers}
      //     />
      //   ))
      // }
    },
    {
      label: 'Intercessions',
      value: 1,
      textIfNoData:
        'You are not interceeding for anyone yet. Ask your friends for prayers',
      showButtonToAdd: false,
      data: interceedingPrayers,
    },
    {
      label: 'Answered',
      value: 2,
      textIfNoData: 'No answered prayer yet, God is working.',
      showButtonToAdd: false,
      data: answeredPrayers,
    },
    {
      label: 'Unanswered',
      value: 3,
      textIfNoData: 'All your prayers are answered :) Ask God for more',
      showButtonToAdd: false,
      data: unAnsweredPrayers,
    },
    {
      label: 'Archived',
      value: 4,
      textIfNoData: 'No Archived prayer added yet.',
      showButtonToAdd: false,
      data: archivedPrayers,
    },
  ];

  const currentTab = tabData[prayersTabValue];

  const Menu = (selected) =>
    tabData.map((tab) => (
      <Chip
        key={tab.value}
        label={<BadgeWithLabel label={tab.label} value={tab.data.length} />}
        color={selected === tab.value ? 'primary' : 'default'}
        variant={selected === tab.value ? 'default' : 'outlined'}
      />
    ));

  const hideArrow = !isMobile && tabData.length <= 4;

  return (
    <main className={classes.content}>
      {isDesktopOrLaptop && <div className={classes.toolbar} />}
      <Container
        maxWidth="sm"
        classes={{
          root: classes.containerRoot,
        }}
      >
        <CssBaseline />
        <NewPrayerButton />
        {/* <div className={classes.filters}> */}
        <AppBar position="sticky" color="inherit" className={classes.tab}>
          <ScrollMenu
            alignCenter={false}
            data={Menu(prayersTabValue)}
            arrowLeft={!hideArrow && ArrowLeft}
            arrowRight={!hideArrow && ArrowRight}
            selected={prayersTabValue}
            onSelect={handleChange}
          />
        </AppBar>

        <div role="tabpanel">
          {(isAdding || isUpdating || isFetching) && <LinearProgress />}
          {currentTab.data && currentTab.data.length ? (
            currentTab.render ? (
              currentTab.render()
            ) : (
              currentTab.data.map((prayer, i) => (
                <PrayerCard
                  userId={userId}
                  key={prayer._id}
                  prayer={prayer}
                  showCollectionTags={false}
                />
              ))
            )
          ) : (
            <Empty
              type="prayer"
              text={currentTab.textIfNoData}
              onClick={currentTab.showButtonToAdd ? openNewPrayer : null}
            />
          )}
        </div>
      </Container>
    </main>
  );
};

Prayers.propTypes = {
  classes: PropTypes.object.isRequired,
  prayers: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  prayers: state.prayers,
  userId: state.authentication.user.userId,
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(withStyles(styles)(Prayers));
