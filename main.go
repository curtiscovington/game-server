package main

import (
	"log"
	"net/http"
)

func main() {
	server := NewServer("/connect")
	go server.Listen()

	http.Handle("/", http.FileServer(http.Dir(".")))
	log.Fatal(http.ListenAndServe(":9000", nil))
}
