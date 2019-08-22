import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  container: {
    margin: 10,
  },
  welcomeContainer: {
    display: 'flex',
    flex: '1 0',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
  },
});

const useMsgStyles = makeStyles({
  message: {
    background: 'lightblue',
    margin: 4,
    padding: 4,
    borderRadius: 8,
    display: 'inline-block',
  },
  sender: {
    sender: '#657a95',
    fontWeight: 700,
    fontSize: 12,
  },
});


const Message = ({ message }) => {
  const classes = useMsgStyles();
  return (
    <div className={classes.message}>
      <div className={classes.sender}>{message.from}</div>
      {message.message.split('\n').map(line => (<div>{line}</div>))}
    </div>
  );
};

const Thread = ({ chat }) => {
  const classes = useStyles();

  if (!chat) {
    return (
      <div className={classes.welcomeContainer}>
        Welcome
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {chat.messages.map((message, id) => (
        <Message message={message} key={id} />
      ))}
    </div>
  );
};

export default Thread;
