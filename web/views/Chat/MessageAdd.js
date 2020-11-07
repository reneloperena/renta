import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
// import { useSnackbar } from 'notistack'
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Input,
  Paper,
  SvgIcon,
  Tooltip,
  makeStyles
} from '@material-ui/core'
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import { Send as SendIcon } from 'react-feather'
import useMessageSender from '../../hooks/conversation/useMessageSender'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2)
  },
  divider: {
    width: 1,
    height: 24
  },
  fileInput: {
    display: 'none'
  }
}))

function MessageAdd ({
  className,
  disabled,
  conversation,
  onAdd,
  ...rest
}) {
  const classes = useStyles()
  // const { enqueueSnackbar } = useSnackbar()
  const fileInputRef = useRef(null)
  const [body, setBody] = useState('')
  // const attachments = []
  const user = {
    id: '1',
    avatar: null,
    name: 'Anon'
  }
  const handleChange = (event) => {
    event.persist()
    setBody(event.target.value)
  }
  const sendMessage = useMessageSender({})

  const handleSend = async () => {
    if (!body || !conversation) {
      return
    }

    await sendMessage({
      variables: {
        conversationId: conversation.id,
        body,
        contentType: 'text'
      }
    })
    setBody('')
  }

  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      handleSend()
    }
  }

  const handleAttach = () => {
    fileInputRef.current.click()
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Avatar
        alt='Person'
        src={user.avatar}
      />
      <Paper
        variant='outlined'
        component={Box}
        flexGrow={1}
        ml={2}
        p={1}
      >
        <Input
          className={classes.input}
          disableUnderline
          fullWidth
          value={body}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          placeholder='Leave a message'
        />
      </Paper>
      <Tooltip title='Send'>
        <span>
          <IconButton
            color='secondary'
            disabled={!body || disabled}
            onClick={handleSend}
          >
            <SvgIcon fontSize='small'>
              <SendIcon />
            </SvgIcon>
          </IconButton>
        </span>
      </Tooltip>
      <Divider className={classes.divider} />
      <Tooltip title='Attach photo'>
        <span>
          <IconButton
            edge='end'
            onClick={handleAttach}
            disabled={disabled}
          >
            <AddPhotoIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title='Attach file'>
        <span>
          <IconButton
            edge='end'
            onClick={handleAttach}
            disabled={disabled}
          >
            <AttachFileIcon />
          </IconButton>
        </span>
      </Tooltip>
      <input
        className={classes.fileInput}
        ref={fileInputRef}
        type='file'
      />
    </div>
  )
}

MessageAdd.propTypes = {
  className: PropTypes.string,
  thread: PropTypes.object,
  disabled: PropTypes.bool,
  onAdd: PropTypes.func
}

MessageAdd.defaultProps = {
  className: '',
  disabled: false,
  onAdd: () => {}
}

export default MessageAdd
