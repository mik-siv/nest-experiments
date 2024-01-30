<script setup lang="ts">
import {io} from 'socket.io-client';
import {onBeforeMount, ref} from "vue";

const socket = io('http://localhost:3001');
const messages = ref<Record<string, string>[]>([]);
const messageText = ref<string>('');
const joined = ref<boolean>(false)
const name = ref<string>('')
const typingDisplay = ref<string>('')

onBeforeMount(() => {
  socket.emit('findAllMessages', {}, (response: Record<string, string>[]) => {
    messages.value = response
  })
  socket.on('message', (message) => {
    messages.value.push(message)
  })
  socket.on('typing', ({name, isTyping}) => {
    isTyping ? typingDisplay.value = `${name} is typing...` : typingDisplay.value = '';
  })
})

socket.on('join', (user) => {
  messages.value.push({name: 'System', text: `${user.name} has joined the chat`});
})

const join = () => {
  socket.emit('join', {name: name.value}, () => {
    joined.value = true
  })
}

const sendMessage = () => {
  socket.emit('createMessage', {text: messageText.value, name: name.value}, () => {
    messageText.value = ''
  })
}

let timeout;
const emitTyping = () => {
  socket.emit('typing', {isTyping: true});
  timeout = setTimeout(() => {
    socket.emit('typing', {isTyping: false})
  }, 2000)
}
</script>

<template>
  <div class="chat">
    <div v-if="!joined">
      <input v-model="name" placeholder="Enter your name">
      <button @click="join">Join</button>
    </div>
    <div class="chat-container">
      <div class="messages-container">
        <div v-for="message in messages">
          [{{ message.name }}]: {{ message.text }}
        </div>
      </div>
      <div v-if="typingDisplay">{{ typingDisplay }}</div>
      <div v-if="joined" class="message-input">
        <input v-model="messageText" @input="emitTyping" placeholder="Type your message">
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "./assets/base.css";
</style>
