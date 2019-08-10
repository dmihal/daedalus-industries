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
              <h1 className={classes.title}>Your Story Starts With Us.</h1>
              <h4>
                Every landing page needs a small description after the big
                bold title, that{"'"}s why we added this text here. Add here
                all the information that can make you or your product create
                the first impression.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Watch video
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <TeamSection />
          <WorkSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
