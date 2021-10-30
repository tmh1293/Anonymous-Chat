import { ViewChat } from './viewChat.js'
import { ViewWait } from './viewWait.js'
import { setScreen,showNotification } from '../app.js'
import { Notification } from "./notification.js"

class ViewStart {
    $container;
    $form;
    $btnStart;
    $imgStart
    $txtLaw;

    $memberOnline;

    constructor(){
        this.$container = document.createElement('div');
        this.$container.classList.add("mainStart");

        this.$form = document.createElement('form');
        this.$form.classList.add("formContainer")
        this.$form.addEventListener('submit',this.handleStart)

        this.$imgStart = document.createElement('div');
        this.$imgStart.classList.add("imgStart")

        this.$btnStart = document.createElement('button');
        this.$btnStart.classList.add('btnStart');
        this.$btnStart.innerHTML = "THAM GIA NGAY!";

        this.$memberOnline = document.createElement('div');
        this.$memberOnline.addEventListener('click',this.eventListener())
        this.$memberOnline.classList.add("NumOnlineMember")
        this.$memberOnline.innerHTML = `Có .. người đang online. Tham gia ngay`;
    }

    loadQtyOnline = () => {
        db.collection("users").get().then((querySnapshot) => {
            console.log("Set user online: "+querySnapshot.docs.length)
            setTimeout(() => {
                this.$memberOnline.innerHTML = `Có ${querySnapshot.docs.length} người đang online. Tham gia ngay`;
            }, 500);
            
        });
    }

    eventListener = () => {
        db.collection("users")
        .onSnapshot((querySnapshot) => {
            //console.log("Set user online: "+querySnapshot.docs.length)
            setTimeout(() => {
                this.$memberOnline.innerHTML = `Có ${querySnapshot.docs.length} người đang online. Tham gia ngay`;
            }, 500);
        });
    }

    handleStart = (event) => {
        event.preventDefault();
        //request db nếu có người pending => add vào room chat, nếu ko có người pending => chuyển sang màn hình wait
        db.collection("users").where("status", "==", "pending")
            .get()
            .then((querySnapshot) => {
                //Kiểm tra xem có ai đang đợi chat hay không
                if(querySnapshot.docs.length > 0){
                    //nếu có => update status
                    db.collection("users").doc(querySnapshot.docs[0].id).update({
                        status:"chating",
                    })
                    db.collection("users").add({
                        status:"chating",
                      })
                      .then((docRef) => {
                            //console.log("Document written with ID: ", docRef.id);
                            document.cookie = `uid=${docRef.id}`;
                            

                            db.collection("roomChat").add({
                                users:[docRef.id,querySnapshot.docs[0].id]
                            }).then((rcRef) => {
                                const viewChat = new ViewChat(docRef.id,rcRef.id)
                                setScreen(viewChat)
                                viewChat.eventListener()
                                viewChat.messageListener()
                                viewChat.exitBrowser()
                                const noti = new Notification('Hurray!',`You found someone`,"success");
                                showNotification(noti.render())
                            })
                      })
                      .catch((error) => {
                          console.error("Error adding document: ", error);
                      });
                      
                      
                }
                else{
                    //console.log("Join wait screen");
                    db.collection("users").add({
                        status:"pending",
                      })
                      .then((docRef) => {
                            //console.log("Document written with ID: ", docRef.id);
                            document.cookie = `uid=${docRef.id}`;
                            const viewWait = new ViewWait(docRef.id)
                            setScreen(viewWait)
                            viewWait.eventListener();
                      })
                      .catch((error) => {
                          console.error("Error adding document: ", error);
                      });
                }
                
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

      
    }

    render() {
        this.$form.appendChild(this.$imgStart);
        this.$form.appendChild(this.$memberOnline)
        this.$form.appendChild(this.$btnStart);
        this.$container.appendChild(this.$form);
        return this.$container;
    }
}

export { ViewStart }