package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

var chatapi = "https://chat.joelsiervas.online"

const maxMessageLength = 140

func getMessage(w http.ResponseWriter, r *http.Request) {

	resp, _ := http.Get(chatapi + "/messages")

	io.Copy(w, resp.Body)
}

func postMessage(w http.ResponseWriter, r *http.Request) {
	resp, _ := http.Post(chatapi+"/messages", "application/json", r.Body)
	defer resp.Body.Close()

	io.Copy(w, resp.Body)
}

func getConfig(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	config := map[string]int{"maxMessageLength": maxMessageLength}
	json.NewEncoder(w).Encode(config)
}

func main() {
	http.Handle("GET /", http.FileServer(http.Dir("static")))
	http.HandleFunc("GET /api/messages", getMessage)
	http.HandleFunc("POST /api/messages", postMessage)
	http.HandleFunc("GET /api/config", getConfig)

	fmt.Println("Hello world")
	http.ListenAndServe("0.0.0.0:8000", nil)

}
