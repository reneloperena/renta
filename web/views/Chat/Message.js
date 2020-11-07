import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import moment from 'moment'
import { Lightbox } from 'react-modal-image'
import {
  Avatar,
  Box,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core'
import useMe from '../../hooks/me/useMe'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    display: 'flex'
  },
  avatar: {
    height: 32,
    width: 32
  },
  image: {
    cursor: 'pointer',
    height: 'auto',
    maxWidth: '100%',
    width: 380
  }
}))

function Message ({
  className,
  message,
  ...rest
}) {
  const classes = useStyles()
  const [openedFile, setOpenedFile] = useState(null)
  const { sender } = message
  const { me } = useMe()
  const type = (me && me.id) === sender.id ? 'user' : 'contact'

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display='flex'
        maxWidth={500}
        ml={type === 'user' ? 'auto' : 0}
      >
        <Avatar
          className={classes.avatar}
          src={sender.avatar}
        />
        <Box ml={2}>
          <Box
            bgcolor={type === 'user' ? 'secondary.main' : 'background.default'}
            color={type === 'user' ? 'secondary.contrastText' : 'text.primary'}
            py={1}
            px={2}
            borderRadius='borderRadius'
            boxShadow={1}
          >
            <Link
              color='inherit'
              to='#'
              variant='h6'
            >
              {sender.name}
            </Link>
            <Box mt={1}>
              {message.contentType === 'image' ? (
                <Box
                  mt={2}
                  onClick={() => setOpenedFile(message.body)}
                >
                  <img
                    alt='Attachment'
                    className={classes.image}
                    src={message.body}
                  />
                </Box>
              ) : (
                <Typography
                  color='inherit'
                  variant='body1'
                >
                  {message.body}
                </Typography>
              )}
            </Box>
          </Box>
          <Box
            mt={1}
            display='flex'
            justifyContent='flex-end'
          >
            <Typography
              noWrap
              color='textSecondary'
              variant='caption'
            >
              {moment(message.sentAt).fromNow()}
            </Typography>
          </Box>
        </Box>
      </Box>
      {openedFile && (
        <Lightbox
          large={openedFile}
          onClose={() => setOpenedFile(null)}
        />
      )}
    </div>
  )
}

Message.propTypes = {
  className: PropTypes.string,
  message: PropTypes.object.isRequired
}

export default Message
