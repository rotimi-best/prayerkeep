import React from 'react';
import PlanCard from './PlanCard';
// import PlansCategories from './PlansCategories';

const prayerPlans = [
  {
    id: 1,
    title: 'Pray until something happens with Apostle Suleman',
    author: 'Rotimi Best',
    prayedBy: 100,
    shortDescription: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
  },
  {
    id: 2,
    title: 'Breakthrough in finances with Apostle Suleman',
    author: 'Rotimi Best',
    prayedBy: 100,
    shortDescription: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
  },
  {
    id: 3,
    title: 'My womb must open with Apostle Suleman',
    author: 'Rotimi Best',
    prayedBy: 100,
    shortDescription: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
  },
  {
    id: 4,
    title: 'Hear the voice of God with Apostle Suleman',
    author: 'Rotimi Best',
    prayedBy: 100,
    shortDescription: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
  },
  {
    id: 5,
    title: 'Total turn around with Apostle Suleman',
    author: 'Rotimi Best',
    prayedBy: 100,
    shortDescription: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
  },
];

const MyPlans = props => {

  return (
    <React.Fragment>
      {prayerPlans.map(plan => <PlanCard key={plan.id} plan={plan} />)}
      {/* <PlansCategories /> */}
    </React.Fragment>
  )
}

MyPlans.propTypes = {
  // classes: PropTypes.object.isRequired,
  // prayers: PropTypes.object.isRequired,
  // userId: PropTypes.string.isRequired,
};

export default MyPlans;