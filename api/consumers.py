from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print('Approached for connection')
        self.user1 = 'subhajit.cjc'
        self.user2 = 'subhajit.cjc'
        self.room_name = self.user1 + self.user2
        self.room_group_name = 'chat_%s' % self.room_name

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        sender = text_data_json['sender']
        receiver = text_data_json['receiver']
        content = text_data_json['content']
        readStatus = text_data_json['readStatus']

        await self.channel_layer.group_send(
            self.room_group_name,
                {
                    'type':'chatroom_message',
                    'sender':sender,
                    'receiver':receiver,
                    'content':content,
                    'readStatus':readStatus,
                }
        )

    async def chatroom_messgae(self, event):
        sender = event['sender']
        receiver = event['receiver']
        content = event['content']
        readStatus = event['readStatus']

        await self.send(text_data=json.dumps({
            'sender':sender,
            'receiver':receiver,
            'content':content,
            'readStatus':readStatus,
        }))
    
    pass