import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';

// core components
import Header from '/client/components/Header/Header.jsx';
import Footer from '/client/components/Footer/Footer.jsx';
import GridContainer from '/client/components/Grid/GridContainer.jsx';
import GridItem from '/client/components/Grid/GridItem.jsx';
import Button from '/client/components/CustomButtons/Button.jsx';
import HeaderLinks from '/client/components/Header/HeaderLinks.jsx';
import Parallax from '/client/components/Parallax/Parallax.jsx';

import landingPageStyle from './homeStyle';

// Sections for this page
import ProductSection from './ProductSection.jsx';
import TeamSection from './TeamSection.jsx';
import WorkSection from './WorkSection.jsx';

const useStyles = makeStyles(landingPageStyle);

const HomePage = () => {
  const classes = useStyles();
  return (
    <div>
      <Header
        color="transparent"
        routes={[]}
        brand="Daedalus Industries"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: 'white',
        }}
      />
      <Parallax filter image="assets/img/landing-bg.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Do not call up that which you cannot put down.</h1>
              <h4>
                Computation is a process, which is to say, a demon, at the root of all biological life. Consider the Minotaur.
              </h4>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <WorkSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
