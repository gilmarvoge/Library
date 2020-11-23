import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import './styles.css';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function CustomizedDialogs(props: any) {
  const { open, book, close } = props;

  const handleClose = () => {
    close();
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {book.title}
        </DialogTitle>
        <DialogContent >
          <Typography gutterBottom>
            {book.author}
          </Typography>

        </DialogContent>
        <DialogContent
          classes={{
            root: 'dialog-content-root',
          }}
        >
          <img src={book.image_url} className='media' alt='' />
        </DialogContent>
        <DialogContent dividers>
          {book.description}
        </DialogContent>
      </Dialog>
    </div>
  );
}
