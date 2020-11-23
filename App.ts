import { IAppAccessors, IHttp, ILogger, IMessageBuilder, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IMessage, IPreMessageSentModify, IPostMessageSent } from '@rocket.chat/apps-engine/definition/messages';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';

export class DirectContactDetectionApp extends App implements IPreMessageSentModify, IPostMessageSent {
    data = '';
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    public async checkPreMessageSentModify (message: IMessage, read: IRead, http: IHttp): Promise<boolean> {
        if (message.room.slugifiedName === 'admin'){
            return false;
        }
        const response = await http.get('http://163.172.164.82:8000?input_utterance='+message.text);
        if(response.data.predicted_intent==='intent_contact' && response.data.confidence>80){
            read.getNotifier().notifyUser(message.sender, {
                room: message.room,
                sender: message.sender,
                text: 'Intent of direct contact detected. Your message has been blocked and an alert has been sent to the admin.',
                alias: 'Content Filter',
                emoji: ':no_entry:',
            });
            return true;
        }
        else{
            return false;
        }
    }
        
    public async executePreMessageSentModify(message: IMessage, builder: IMessageBuilder, read: IRead, http: IHttp, persistence: IPersistence): Promise<IMessage> {
        this.data = builder.getText();
        builder.setText('This message has been blocked due to intent of direct contact and an alert has been sent to the admin.');
        return message;
    }

    public async executePostMessageSent(message: IMessage, read: IRead, http: IHttp, persistence: IPersistence, modify: IModify): Promise<void> {
        if (message.room.slugifiedName === 'admin') {
            return;
        }
        if (message.text === 'This message has been blocked due to intent of direct contact and an alert has been sent to the admin.'){
            let receiver = '';
            if(message.room.userIds!==undefined){
                const user = await read.getUserReader().getById(message.room.userIds[0]);
                receiver = '@'+user.username;
            }
            else{
                receiver = '#'+message.room.slugifiedName;
            }
            const admin = await read.getRoomReader().getByName('admin');
            const messageBuilder = modify.getCreator().startMessage({
                text: 'Intent of direct contact detected =>\nSender: @'+message.sender.username+'\nMessage: "'+this.data+'"\nReceiver: '+receiver+'\n\n',
            } as IMessage);
            if (!admin) {
                return;
            }
            messageBuilder.setRoom(admin);
            await modify.getCreator().finish(messageBuilder);
        }
        else{
            return;
        }
    }
}
