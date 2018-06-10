import {ATTEMPT_CONNECT, CONNECT_FAILED} from './actionDefinitions'
process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA'
export const getConnectionInformation=dispatch=>({ipAddress, walletPassword})=>()=>{
    dispatch({
        type:ATTEMPT_CONNECT,
        value:true
    })
    //connect to gRPC of light wallet here
    grpc.invoke(BookService.QueryBooks, {
        request: queryBooksRequest,
        host: "https://example.com",
        onMessage: (message: Book) => {
          console.log("got book: ", message.toObject());
        },
        onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
          if (code == grpc.Code.OK) {
            console.log("all ok")
          } else {
            console.log("hit an error", code, msg, trailers);
          }
        }
      })
}