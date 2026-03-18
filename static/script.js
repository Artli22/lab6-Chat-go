const getMessages = async () =>{
        const response = await fetch("/api/messages")
        const messages = await response.json()
        console.log("messages",messages)
        const ul= document.getElementById("messages")
        ul.innerHTML=''
        for(let i =0; i<messages.length;i++){
            const message = messages[i]
            const li =document.createElement('li')
            
            const image = /(https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif|webp))/i
            const match = message.text.match(image)
            let textContent = message.text
            let imageUrl = null
            if(match) {
                imageUrl = match[1]
                textContent = message.text.replace(image, '').trim()
            }
            let htmlContent = `<strong> ${message.user}:</strong> ${textContent}`
            if(imageUrl) {
                htmlContent += `<br><img src="${imageUrl}" style="max-width: 200px; max-height: 200px; border-radius: 10px; margin-top: 5px;">`
            }
            
            li.innerHTML = htmlContent
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

    textarea.addEventListener('keypress', function(event) {
        if(event.key === 'Enter') {
            event.preventDefault()
            document.getElementById('send').click()
        }
    })

    getMessages()
    setInterval(getMessages, 5000)

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

function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  document.documentElement.style.colorScheme = 
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

window.toggleTheme = toggleTheme;