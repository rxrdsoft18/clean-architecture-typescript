import {Collection, MongoClient} from 'mongodb';

class DbConnection {
    private client?: MongoClient;
    private url?: string;

    async connect(url: string): Promise<void> {
        this.url = url;
        this.client = new MongoClient(url);
        await this.client.connect();
    }

    async disconnect(): Promise<void> {
        await this.client?.close();
        this.client = undefined;
    }

    async getCollection(name: string): Promise<Collection> {
        if (!this.client && this.url) {
            await this.connect(this.url);
        }

       const db = this.client?.db();
       if (!db) {
              throw new Error('MongoDB not connected');
       }
         return db.collection(name);
    }

}
export default new DbConnection();
