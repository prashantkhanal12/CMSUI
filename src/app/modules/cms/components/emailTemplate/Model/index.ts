export interface EmailTemplateModel {
  id?: string
  templateName?: string
  adminSubject?: string
  userSubject?: string
  adminMessage?: string
  userMessage?: string
  adminEmail?: any
}

export interface DeleteEmailTemplateModel {
  id: string
}
