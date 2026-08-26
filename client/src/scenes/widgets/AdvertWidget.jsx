import { useTheme } from '@mui/material';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';

const AdvertWidget = ({img}) => {
    const { palette } = useTheme();
    const dark = palette.primary.dark;
    const light = palette.primary.light;
    const main = palette.primary.main;
    const text = palette.primary.lightest;

    return (
        <section className='mx-6 mt-8 mb-4 p-8 rounded-2xl' style={{background: dark}}>
            <div className='flex flex-col justify-center gap-2'>
                <h1 style={{color: text}} className='text-[16px]'>Sponsored</h1>
                <img className='rounded-[50px] w-2xs h-65 mx-auto' src={img} alt="" />
                <a style={{color: dark}} className='flex justify-center text-[14px] items-center bg-neutral-500 w-37.5 rounded-full p-1' target='_blank' href="https://mazinshakeel.netlify.app/">
                    <h2>Check Website</h2>
                    <OpenInNewOutlinedIcon />
                </a>
                <p style={{color: text}}>We create solutions that empowers your businesses with our innovative ideas</p>
            </div>
        </section>
    )
}

export default AdvertWidget;