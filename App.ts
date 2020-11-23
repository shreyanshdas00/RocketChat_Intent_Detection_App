import { IAppAccessors, IHttp, ILogger, IMessageBuilder, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IMessage, IPreMessageSentModify, IPostMessageSent } from '@rocket.chat/apps-engine/definition/messages';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';

export class DirectContactApp extends App implements IPreMessageSentModify, IPostMessageSent {
    data = '';
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    public async checkPreMessageSentModify (message: IMessage, read: IRead, http: IHttp): Promise<boolean> {
             if (message.room.slugifiedName === 'admin'){
             return false;
             }
    public async executePostMessageSent(message: IMessage, read: IRead, http: IHttp, persistence: IPersistence, modify: IModify): Promise<void> {
        if (message.room.slugifiedName === 'general') {
            return;
        }

        const general = await read.getRoomReader().getByName('general');
        const messageBuilder = modify.getCreator().startMessage({
            text: `@${message.sender.username} said "${message.text}" in #${message.room.displayName}`,
        } as IMessage);

        if (!general) {
            return;
        }
        messageBuilder.setRoom(general);
        await modify.getCreator().finish(messageBuilder);
    }
}