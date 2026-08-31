import { useMemo, useState } from 'react';
import { useTheme, IconButton, useMediaQuery } from '@mui/material'
import { DarkMode, LightMode, Close } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu'
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../../state';
import { useNavigate } from 'react-router-dom';
import AccountOptions from './MenuList';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from '../../theme';

const NavBar = () => {
    const [isMobileMenuToggled, setisMobileMenuToggled] = useState(false);
    const isNonMobileScreens = useMediaQuery("(min-width: 1024px)");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.mode)
    const theme = useMemo(() => createTheme(themeSettings((mode)), [mode]))
    const { palette } = useTheme();
    const dark = palette.primary.dark;
    const light = palette.primary.main;
    const text = palette.primary.lightest;
    const pinkHot = palette.secondary.dark;
    
    return (
        <>
            <nav style={{background: dark, color: text}} className="flex justify-between items-center p-6">
                <a onClick={() => navigate(`/home`)}>
                    <h1 style={{color: pinkHot}} className='text-5xl cursor-pointer'>Feeds</h1>
                </a>
                    {/* *********Desktop********* */}
                {
                    isNonMobileScreens ? (
                        <div className='flex justify-between items-center gap-4'>
                            <IconButton onClick={() => dispatch(setMode())}>
                                {theme.palette.mode === 'dark' ? (<DarkMode />) : (<LightMode />)}
                            </IconButton>
                            <AccountOptions />
                        </div>
                    ) : (
                        <div style={{background: light}} className="rounded-2xl">
                            <IconButton style={{background: light}} className="rounded-2xl" onClick={() => setisMobileMenuToggled(!isMobileMenuToggled)}>
                                <MenuIcon />
                            </IconButton>
                        </div>
                    )
                }


                {/* **************Mobile Menu************** */}

                {
                    !isNonMobileScreens && isMobileMenuToggled && (
                        <div id='mobile-menu' className='fixed bg-neutral-950/95 right-0 w-full bottom-0 h-full z-10 p-6'>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center mx-auto'>
                                    <div className=''>
                                        <IconButton onClick={() => dispatch(setMode())}>
                                            {theme.palette.mode === 'dark' ? (<LightMode sx={{color: text}} />) : (<DarkMode sx={{color: dark}} />)}
                                        </IconButton>
                                    </div>
                                    <div className='flex-1'>
                                        <AccountOptions />
                                    </div>
                                </div>
                                <div style={{background: light}} className="rounded-2xl">
                                    <IconButton style={{background: light}} className="rounded-2xl" onClick={() => setisMobileMenuToggled(!isMobileMenuToggled)}>
                                        <Close />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    )
                }
            </nav>

        </>
    )
}
export default NavBar;