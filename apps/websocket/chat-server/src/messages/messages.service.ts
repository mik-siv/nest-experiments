import {Injectable} from '@nestjs/common';
import {CreateMessageDto} from './dto/create-message.dto';
import {UpdateMessageDto} from './dto/update-message.dto';
import {Message} from "./entities/message.entity";

@Injectable()
export class MessagesService {
    messages: Message[] = [{name: 'Mikhail', text: 'Hey!'}]
    clients: Record<string, string> = {}

    create(createMessageDto: CreateMessageDto): Message {
        const message: Message = {...createMessageDto}
        this.messages.push(message);
        return message
    }

    findAll(): Message[] {
        return this.messages;
    }

    join(name: string, clientId: string) {
        this.clients[clientId] = name;
        return Object.values(this.clients)
    }

    getClientName(clientId: string){
        return this.clients[clientId];
    }
}
