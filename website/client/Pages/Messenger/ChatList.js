import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  container: {
    background: '#999999',
    flex: 1,
  },
  chat: {
    padding: 4,
    '&:hover': {
      background: '#888888',
      cursor: 'pointer',
    }
  },
  selected: {
    background: 'gray',
  },
  name: {
    fontWeight: 'bold',
  },
});

const ChatList = ({ selected, onChange, chats }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {chats.map(chat => (
        <div
          key={chat.id}
          onClick={() => onChange(chat.id)}
          className={chat.id === selected ? `${classes.chat} ${classes.selected}` : classes.chat}
        >
          <div className={classes.name}>{chat.name}</div>
          <div>
            {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].message.substr(0, 20) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
