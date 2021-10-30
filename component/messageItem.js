class MessageItem {
    $container;
    $messageContainer;
    $sender;

    $content;
    $spanReply;
    $repArea;

    $btnReply;
    setReply;
    repContent;
    apendReply;
    data;
    setId;
    getId;



    $replyContainer;
    $titleReply;
    $contentReply;

    constructor(data, setReply, apendReply, setId, getId) {
        this.getId = getId;
        this.data = data;
        this.setId = setId;
        this.apendReply = apendReply;
        this.setReply = setReply;
        this.repContent = data;
        this.$container = document.createElement('div');
        this.$container.classList.add("messages-container")

        this.$messageContainer = document.createElement('div');
        this.$messageContainer.classList.add("message-item")

        this.$replyContainer = document.createElement('div');
        this.$replyContainer.classList.add("reply-container")

        this.$spanReply = document.createElement('div');
        this.$spanReply.classList.add('spanReply');

        this.$repArea = document.createElement('div')
        this.$repArea.classList.add('repArea');

        this.$titleReply = document.createElement('span');
        this.$titleReply.classList.add("replynameTitle")

        this.$contentContainer = document.createElement('div');
        this.$contentContainer.classList.add("content")

        this.$flexMessAndReply = document.createElement('div'); // Để flex Messages và nút Reply
        this.$flexMessAndReply.classList.add("flex")

        if (data.reply !== "none") {
            this.loadContentReply(data.reply)
        }

        this.$sender = document.createElement('span');
        this.$sender.classList.add("sender");
        this.$sender.innerHTML = "Người lạ";


        if (data.type == "text") {
            this.$content = document.createElement('div');
            this.$content.classList.add("content")
            this.$content.innerHTML = data.content;
        } else if (data.type == "img") {
            this.$content = document.createElement('img');
            this.$content.style = "max-width:200px"
            this.$content.classList.add("content")
            this.$content.src = data.content;
        } else if (data.type == "youtube") {
            this.$content = document.createElement('iframe');
            this.$content.classList.add("content")
            this.$content.src = data.content;
        } else {
            this.$content = document.createElement('audio');
            this.$content.innerHTML = "Trình duyệt của bạn không hỗ trợ nghe nhạc";
            this.$content.setAttribute("controls", "controls");
            this.$sourceAudio = document.createElement('source');
            this.$sourceAudio.src = data.content;
            this.$sourceAudio.setAttribute("type", "audio/mpeg");
            this.$content.appendChild(this.$sourceAudio)
        }

        this.$btnReply = document.createElement('button');
        this.$btnReply.classList.add('fas', 'fa-reply-all')
        this.$btnReply.addEventListener("click", this.handleReply)

        if ("uid=" + data.sender == document.cookie) {
            this.$container.classList.add("justify-end");
            this.$flexMessAndReply.classList.add("flex-direction-row-reverse");
            this.$messageContainer.classList.add("my-message")
            this.$sender.innerHTML = "Bạn";
        }
    }

    setAudioMessages = () => {
        this.$messageContainer.classList.add("audio");
    }

    loadContentReply = (id) => {
        var docRef = db.collection("messages").doc(id);
        docRef.get().then((doc) => {
            if (doc.exists) {
                if (doc.data().type == "text") {
                    this.$contentReply = document.createElement('div');
                    this.$contentReply.innerHTML = doc.data().content;
                    if ("uid=" + doc.data().sender == document.cookie) {
                        this.$titleReply.innerHTML = "Bạn";
                    } else {
                        this.$titleReply.innerHTML = "Người lạ";
                    }


                } else if (doc.data().type == "img") {
                    this.$contentReply = document.createElement('img');
                    this.$contentReply.src = doc.data().content;
                } else if (doc.data().type == "youtube") {
                    this.$contentReply = document.createElement('iframe');
                    this.$contentReply.src = data.content;
                } else {
                    this.$contentReply = document.createElement('audio');
                    this.$contentReply.innerHTML = "Trình duyệt của bạn không hỗ trợ nghe nhạc";
                    this.$contentReply.setAttribute("controls", "controls");
                    this.$sourceAudio = document.createElement('source');
                    this.$sourceAudio.src = doc.data().content;
                    this.$sourceAudio.setAttribute("type", "audio/mpeg");
                    this.$contentReply.appendChild(this.$sourceAudio)
                }
                this.$repArea.appendChild(this.$contentReply);
                // this.$replyContainer.appendChild(this.$contentReply);

            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    handleReply = () => {
        this.setReply(this.repContent) // set nội dung reply
        this.setId(this.getId) // set id reply
        this.apendReply(true); // append reply   
    }

    render() {
        // Trước
        // this.$replyContainer.appendChild(this.$titleReply);
        // Sau
        this.$repArea.appendChild(this.$titleReply);
        this.$replyContainer.appendChild(this.$spanReply);
        this.$replyContainer.appendChild(this.$repArea);


        this.$messageContainer.appendChild(this.$sender);

        if (this.data.reply !== "none") {
            this.$contentContainer.appendChild(this.$replyContainer)
            this.$contentContainer.appendChild(this.$content)
            this.$messageContainer.appendChild(this.$contentContainer);
            this.$flexMessAndReply.appendChild(this.$messageContainer)
            this.$flexMessAndReply.appendChild(this.$btnReply)
            this.$container.appendChild(this.$flexMessAndReply);
        } else {
            this.$messageContainer.appendChild(this.$content);
            this.$flexMessAndReply.appendChild(this.$messageContainer)
            this.$flexMessAndReply.appendChild(this.$btnReply)
            this.$container.appendChild(this.$flexMessAndReply);
        }

        return this.$container;
    }
}

export { MessageItem }