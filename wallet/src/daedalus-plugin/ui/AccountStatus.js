import React, { Component } from 'react';
import classes from './AccountStatus.module.css';

export default class AccountStatus extends Component {
  constructor(props) {
    super(props);
    this.plugin = props.plugin;
    this.state = {
      user: null,
      loaded: false,
    };
  }

  async componentDidMount() {
    const user = await this.plugin.bridge.call('getUser');
    this.setState({ user, loaded: true })
  }

  render() {
    const { user, loaded } = this.state;

    let content = null
    if (!loaded) {
      content = "Loading...";
    } else if (user) {
      content = `Welcome, ${user.profile.name}`;
    } else {
      content = (
        <div>
          Visit <a href="https://daedalus.industries">daedalus.industries</a> to log in
        </div>
      );
    }

    return (
      <div className={classes.statusBar}>
        {content}
      </div>
    )
  }
}
