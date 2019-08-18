import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useCurrentUser } from 'react-meteor-hooks';
import Header from '/client/components/Header/Header.jsx';
import HeaderLinks from '/client/components/Header/HeaderLinks.jsx';
import ChatUI from './ChatUI';

const ALLOWED_USERS = ['dmihal', 'wgsch'];

const useStyles = makeStyles({
  denied: {
    textAlign: 'center',
    marginTop: 100,
  },
});

const Messenger = () => {
  const user = useCurrentUser();
  const classes = useStyles();

  const hasAccess = user && ALLOWED_USERS.indexOf(user.services.github.username) !== -1;
  return (
    <Fragment>
      <Header
        color="white"
        routes={[]}
        brand="Daedalus Industries"
        rightLinks={<HeaderLinks />}
        fixed
      />
      {hasAccess ? <ChatUI /> : <div className={classes.denied}>Access Denied</div>}
    </Fragment>
  );
};

export default Messenger;
