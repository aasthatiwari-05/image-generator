import {createContext, useState, useEffect} from "react";
export const AppContext = createContext()
const AppContextProvider = (props)=>{
    const [user, setUser] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [credit, setCredit] = useState(50);

    // Load user data from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('imagifyUser');
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            setUser(userData);
            setCredit(userData.credits || 50);
        }
    }, []);

    const saveUserData = (userData) => {
        localStorage.setItem('imagifyUser', JSON.stringify(userData));
        setUser(userData);
        setCredit(userData.credits || 50);
    };

    const updateCredits = (newCredit) => {
        setCredit(newCredit);
        if (user) {
            const updatedUser = { ...user, credits: newCredit };
            localStorage.setItem('imagifyUser', JSON.stringify(updatedUser));
        }
    };

    const generateImage = async (prompt) => {
        try {
            // Using Pollinations.ai free API for image generation
            const encodedPrompt = encodeURIComponent(prompt);
            const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${Date.now()}&nologo=true`;
            
            // Preload the image to ensure it's ready
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    resolve({
                        success: true,
                        imageUrl: imageUrl
                    });
                };
                img.onerror = () => {
                    resolve({
                        success: true,
                        imageUrl: imageUrl
                    });
                };
                img.src = imageUrl;
            });
        } catch (error) {
            console.error('Image generation error:', error);
            return {
                success: false,
                error: 'Failed to generate image'
            };
        }
    }

    const logout = () => {
        localStorage.removeItem('imagifyUser');
        setUser(false);
        setCredit(50);
    }

    const value ={
        user, setUser,
        showLogin, setShowLogin,
        credit, setCredit: updateCredits,
        generateImage,
        logout,
        saveUserData
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider