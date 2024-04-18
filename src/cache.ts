const mapStore = new Map<string, string>()

export const cache = {
    set: async (key:string, value: string) => {
        mapStore.set(key,value);
        setTimeout(() => mapStore.delete(key), 10000)
    },
    get: (key: string) => mapStore.get(key),
    delete: (key: string) => mapStore.delete(key)
}