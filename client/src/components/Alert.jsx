import { Snackbar } from '@mui/material';

export default function SimpleSnackbar({message, open, onClose}) {

  return (
    <>
      <Snackbar
        className='cursor-not-allowed w-50'
        id='snackbar'
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        message={message}
      />
    </>

  );
}
