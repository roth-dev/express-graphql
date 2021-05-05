export interface IFeeds {
    id: string;
    title: string;
    description: string;
}
declare class Feeds {
    id: string;
    title: string;
    description: string;
    constructor(id: string, title: string, description: string);
}
export default Feeds;
