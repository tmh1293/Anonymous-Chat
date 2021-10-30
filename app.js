let currentScreen = null;
const app = document.getElementById("app");
const setScreen = (screen) => {
    if(currentScreen){
        app.removeChild(currentScreen);
    }
    currentScreen = app.appendChild(screen.render());
}

const showNotification = (notification) =>{
    app.appendChild(notification);
    setTimeout(() => {
        app.removeChild(notification);
    }, 4000);
}

const setModal = (modal,bool) => {
    if(bool){
        app.appendChild(modal);
    }
    else{
        app.removeChild(modal);
    }
    
}

export { setScreen,showNotification,setModal };