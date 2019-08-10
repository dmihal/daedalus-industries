import React, { Component } from 'react';
import classes from './AccountStatus.module.css';

export default class AccountStatus extends Component {
  constructor(props) {
    super(props);
    this.plugin = props.plugin;
    this.state = {
      user: null,
    };
  }

  render() {
    const { user } = this.state;
    const redirectUrl = `${window.location.origin}/register-account`;
    return this.state.user ? (
      <div className={classes.statusBar}>
        <div className={classes.avatar} style={{ backgroundImage: `url(${user.picture})` }} />
        <div className={classes.name}>{user.name}</div>
      </div>
    ) : (
      <a
        className={classes.loginBtn}
        href={`${this.plugin.identityServer}/auth?redirect=${encodeURIComponent(redirectUrl)}`}
      >
        Log In with Facebook
      </a>
    )
  }
}
