package main

import ()

type Message struct {
	Type string `json:"type"`
	Id   int    `json:"id"`
	Pos  Pos    `json:"pos"`
}

func (self *Message) String() string {
	return "Message"
}
