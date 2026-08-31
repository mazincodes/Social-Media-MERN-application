import { Button, Grow, Paper, Popper, MenuItem, MenuList, Stack, ClickAwayListener } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useTheme } from '@mui/material';
import { setLogout } from '../../state';
import SimpleSnackbar from '../../components/Alert';
import { useNavigate } from 'react-router-dom';

export default function AccountOptions () {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { _id } = useSelector((state) => state.user);
  const fullName = `${user.firstName} ${user.lastName}`;
  const { palette } = useTheme();
  const main = palette.primary.main;
  const light = palette.primary.light;
  const dark = palette.primary.dark;
  const pinkHot = palette.secondary.dark;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  
  const logOut = () => {
    if(dispatch) {
      dispatch(setLogout())
    }
    <SimpleSnackbar message={'Logout successful'} />
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          className='btn-account'
          sx={{background: pinkHot, padding: '12px 24px', borderRadius: '20px', color: dark}}
          id="button"
          ref={anchorRef}
          aria-controls={open ? 'menu' : undefined}
          aria-expanded={open}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Account {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          >
          {({ TransitionProps, placement }) => (
            <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
              placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
            >
              <Paper sx={{marginX: '10px', borderRadius: '16px', background: dark}}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu"
                    aria-labelledby="button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem className='rounded-4xl duration-500' id='menu-item-1' onClick={handleClose}>
                      <a onClick={() => {
                        navigate(`${import.meta.env.VITE_API_URL}/profile/${_id}`)
                        navigate(0)
                      }}>{fullName}</a>
                    </MenuItem>
                    <MenuItem className='rounded-4xl duration-500' id='menu-item-2' onClick={logOut}>Log Out</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
