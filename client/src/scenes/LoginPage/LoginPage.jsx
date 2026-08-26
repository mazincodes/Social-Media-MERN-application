import { useTheme } from "@mui/material";
import people from '../../../../server/public/assets/people.jpeg';
import NewForm from "./NewForm";
import SimpleSnackbar from '../../components/Alert';
import { useState } from "react";

const LoginPage = () => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const { palette } = useTheme();
    const dark = palette.primary.dark;
    const main = palette.primary.main;
    const light = palette.primary.light;
    const pinkHot = palette.secondary.dark;
    const pinkWarm = palette.secondary.main;
    const pinkCool = palette.secondary.light;
    
    return (
        <>
            <div style={{background: dark}} className="relative top-0 landscape:h-200 h-screen w-full">
                <div style={{background: dark}} className="fixed z-40 right-0 left-0 flex flex-col justify-center items-center">
                    <h1 style={{color: pinkHot}} className="text-5xl font-bold p-4">Feeds</h1>
                    <h1 className="text-2xl font-semibold p-5">welcome to <span style={{color: pinkHot}}>Feeds</span>! The social media for new generation</h1>
                </div>

                <div className="absolute top-0 lg:-left-14 -left-32 z-10">
                    <img className="lg:w-200 w-120 lg:h-200 h-120 rounded-[50%]" src={people} alt="People" /> 
                </div>

                <div className="form absolute top-65 left-0 right-0 z-30">
                    <NewForm showAlert={(message) => {
                        setAlertOpen(true)
                        setAlertMessage(message)
                    }} />
                </div>
                
                <SimpleSnackbar open={alertOpen} onClose={() => setAlertOpen(false)} message={alertMessage} />

                <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/80 z-20 h-auto w-auto"></div>
            </div>     
        </>

    )
}
export default LoginPage;