import vm from 'vm';
import { MongoClient } from 'mongodb';

type IpcHandler = (event: Electron.IpcMainEvent, args: any) => void;

let client: MongoClient | undefined;

export function handleIpc(): [string, IpcHandler] {
  return [
    'vm',
    async (event, args) => {
      let result;

      if (!client) {
        client = new MongoClient('mongodb://localhost:27017');
        await client.connect();
      }

      try {
        result = await vm.runInContext(
          args.src,
          vm.createContext({
            client,
          }),
          {
            displayErrors: false,
          }
        );
      } catch (err) {
        return event.reply(`error-${args.id}`, err);
      }

      if (result === undefined) {
        return event.reply(`error-${args.id}`, 'VM returned undefined!');
      }

      return event.reply(args.id, result);
    },
  ];
}
