export const mockRequest: () => Promise<any> = async () => {
    return new Promise((resolve, reject): any => {
        setTimeout(() => {
            resolve({
                data: [
                    {
                        name: "ArthurDon",
                        // 取1-5随机数
                        bugs: Math.floor(Math.random() * 5) + 1,
                    },
                    {
                        name: "Arthur",
                        bugs: Math.floor(Math.random() * 5) + 1,
                    },
                ]
            });
        }, 1000);
    })
}