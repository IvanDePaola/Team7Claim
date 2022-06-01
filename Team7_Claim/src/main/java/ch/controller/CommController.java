package ch.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import message.PrivMsg;

public class CommController {
	// Author Robin Heiz,,,, noch ergänzen???
	
	
	
	
	private SimpMessagingTemplate msgTemplate;
	
	@MessageMapping("/chat")
	public void sendingToUser(@Payload PrivMsg msg) throws Exception {
		this.msgTemplate.convertAndSend("/category/messages/" + msg.getTo(), msg);
	}
		
	
	

}
