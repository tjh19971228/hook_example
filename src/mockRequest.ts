import { Detail } from "./components/BugCounter";

export const mockRequest: () => Promise<{ data: Detail[] }> = async () => {
    console.log('mock')
    return new Promise((resolve, reject): any => {
        setTimeout(() => {
            resolve({
                data: [
                    {
                        id: "wxtangjiahao",
                        bugs: 4,

                    },
                    {
                        id: 'wxArthurdon',
                        bugs: 2
                    },
                ]
            });
        }, 1000);
    })
}