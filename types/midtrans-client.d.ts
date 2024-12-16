declare module 'midtrans-client' {
    export class Snap {
      constructor(options: {
        isProduction: boolean;
        serverKey: string;
        clientKey: string;
      });
      createTransaction(parameters: object): Promise<object>;
      createTransactionToken(parameters: object): Promise<object>;
    }
  
    export class CoreApi {
      constructor(options: {
        isProduction: boolean;
        serverKey: string;
        clientKey: string;
      });
      charge(parameters: object): Promise<object>;
    }
  }
  

  interface Window {
    snap: {
      pay(
        token: string,
        options: {
          onSuccess: (result: any) => void;
          onPending: (result: any) => void;
          onError: (result: any) => void;
          onClose: () => void;
        }
      ): void;
    };
  }