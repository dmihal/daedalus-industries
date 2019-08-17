/*!

=========================================================
* Material Kit React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useCurrentUser } from 'react-meteor-hooks';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/styles';

// core components
import Button from '/client/components/CustomButtons/Button.jsx';
import CustomDropdown from '/client/components/CustomDropdown/CustomDropdown.jsx';

import headerLinksStyle from './headerLinksStyle.jsx';

const HeaderLinks = ({ classes }) => {
  const user = useCurrentUser();

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          className={classes.navLink}
          component="a"
          href="https://wallet.daedalus.industries"
        >
          Wallet
        </Button>
      </ListItem>

      {!user && (
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            className={classes.navLink}
            onClick={() => Meteor.loginWithGithub()}
          >
            Sign In with GitHub
          </Button>
        </ListItem>
      )}

      {user && (
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText={user.profile.name}
            buttonProps={{
              className: classes.navLink,
              color: 'transparent',
            }}
            dropdownList={[
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  Meteor.logout();
                }}
                className={classes.dropdownLink}
              >
                Log out
              </a>
            ]}
          />
        </ListItem>
      )}
    </List>
  );
};

export default withStyles(headerLinksStyle)(HeaderLinks);
