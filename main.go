package main

import (
	"fmt"
	"io"
	"net/http"
)

var chatapi = "https://chat.joelsiervas.online"

func getMessage(w http.ResponseWriter, r *http.Request) {

	resp, _ := http.Get(chatapi + "/messages")

	io.Copy(w, resp.Body)
}

func postMessage(w http.ResponseWriter, r *http.Request) {
	resp, _ := http.Post(chatapi+"/messages", "application/json", r.Body)
	defer resp.Body.Close()

	io.Copy(w, resp.Body)
}

func main() {
	http.Handle("GET /", http.FileServer(http.Dir("static")))
	http.HandleFunc("GET /api/messages", getMessage)
	http.HandleFunc("POST /api/messages", postMessage)

	fmt.Println("Hello world")
	http.ListenAndServe("0.0.0.0:8000", nil)

}
