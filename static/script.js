const getMessages = async () =>{
        const response = await fetch("/api/messages")
        const messages = await response.json()
        console.log("messages",messages)
        const ul= document.getElementById("messages")
        ul.innerHTML=''
        for(let i =0; i<messages.length;i++){
            const message = messages[i]
            const li =document.createElement('li')
            li.innerHTML=`<strong> ${message.user}:</strong> ${message.text}`
            console.log("message",message)
            ul.append(li) 
        }
    }

    const postMessages = async (message) =>{
        await fetch("/api/messages", {
            method: 'POST', body: JSON.stringify(message) }) 
            getMessages()
    }

    let maxLength = 140
    fetch("/api/config").then(res => res.json()).then(config => {
        maxLength = config.maxMessageLength
    })

    const textarea = document.getElementById('message')
    const counter = document.getElementById('counter')
    
    textarea.addEventListener('input', () => {
        counter.textContent = `${textarea.value.length}/${maxLength}`
    })

    getMessages()

    document.getElementById('send').addEventListener('click', () => {
        const message = document.getElementById('message').value
        if(message.length > maxLength) {
            alert(`Mucho texto! El mensaje no puede superar los 140 caracteres.`)
            return
        }
        postMessages({
        user: 'Arthur Morgan',
        text: message
        })
        textarea.value = ''
        counter.textContent = '0/140'
    })