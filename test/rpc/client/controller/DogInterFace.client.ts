import { RpcClientController, Call, Body } from "../../../.."

@RpcClientController("/dog", { interFace: "DogInterFace", url: "http://127.0.0.1:9000" })
class dogController {

    @Call("/woff", "woff")
    async woff(@Body() body: { message: string }): Promise<{ message: string }> {
        const { message } = body
        return {
            message
        }
    }

    @Call("/eat", "eat")
    async eat(@Body() body: { message: string }): Promise<{ message: string }> {
        const { message } = body
        return {
            message
        }
    }

}

export {
    dogController
}