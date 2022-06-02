export interface SmtpModel {
    id?: string
    type?: string
    hostName?: string
    portNumber?: string
    userName?: string
    password: string
    encryption?: string
    status?: boolean
}
export interface DeleteSmtpModel {
    id: string
}
