export const mockRequest = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ data: 'mock data' });
        }, 1000);
    })
}