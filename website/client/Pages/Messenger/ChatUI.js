import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import ChatList from './ChatList';
import Thread from './Thread';
import chatData from './chatData.json';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    position: 'absolute',
    top: 70,
    bottom: 0,
    left: 0,
    right: 0,
  },
  list: {
    flex: '1 0',
    display: 'flex',
    flexDirection: 'column',
  },
  thread: {
    flex: '3 0',
    display: 'flex',
    flexDirection: 'column',
  },
});

const ChatUI = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState(null);
  const [currentChat] = selected ? chatData.chats.filter(chat => chat.id === selected) : [null];

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        <ChatList
          selected={selected}
          onChange={newChat => setSelected(newChat)}
          chats={chatData.chats}
        />
      </div>
      <div className={classes.thread}>
        <Thread chat={currentChat} />
      </div>
    </div>
  );
};

export default ChatUI;
