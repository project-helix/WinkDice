export enum errorCodePrefixes {
    mainProcess_std = 10,
    RedisClient_std = 20,
    DB_std = 30,
    userDb_std = 40,
    http_std = 50,
    http_cust = 51
}

export enum Caches {
    userName = "userNameCahce",
    env = "envCache",
    posts = "postsCache",
    chatChannel = "chatChannelCache",
    chatMessages = "chatMessagesCache"
}

export const queueNames = {
    wsQueue: "WinkDice_WSQueue",
    DGB: {
        Lily: {
            msgCache: "DGB_Lily_MsgCache"
        }
    }
}