package main

import (
	"fmt"
	"golang.org/x/net/websocket"
	"io"
	"log"
)

const channelBufSize = 100

var maxId int = 0

type Pos struct {
	x int
	y int
}
type Client struct {
	id     int
	pos    Pos
	ws     *websocket.Conn
	server *Server
	ch     chan *Message
	doneCh chan bool
}

func NewClient(ws *websocket.Conn, server *Server) *Client {

	if ws == nil {
		panic("ws cannot be nil")
	}

	if server == nil {
		panic("server cannot be nil")
	}

	maxId++
	ch := make(chan *Message, channelBufSize)
	doneCh := make(chan bool)

	pos := Pos{10, 10}
	return &Client{maxId, pos, ws, server, ch, doneCh}
}

func (c *Client) Conn() *websocket.Conn {
	return c.ws
}

func (c *Client) Write(msg *Message) {
	select {
	case c.ch <- msg:
	default:
		c.server.Del(c)
		err := fmt.Errorf("client %d is disconnected.", c.id)
		c.server.Err(err)
	}
}

func (c *Client) Done() {
	c.doneCh <- true
}

func (c *Client) Listen() {
	go c.listenWrite()
	c.listenRead()
}

func (c *Client) listenWrite() {
	log.Println("Listening write to client")
	for {
		select {
		case msg := <-c.ch:
			websocket.JSON.Send(c.ws, msg)
		case <-c.doneCh:
			c.server.Del(c)
			c.doneCh <- true
			return
		}
	}
}

func (c *Client) listenRead() {
	log.Println("Listening read from client")
	for {
		select {
		case <-c.doneCh:
			c.server.Del(c)
			c.doneCh <- true
			return
		default:
			var msg Message
			err := websocket.JSON.Receive(c.ws, &msg)
			if err == io.EOF {
				c.doneCh <- true
			} else if err != nil {
				c.server.Err(err)
			} else {
				c.server.SendAll(&msg)
			}
		}
	}
}
