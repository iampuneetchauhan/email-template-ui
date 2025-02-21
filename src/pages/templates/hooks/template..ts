import {AxiosInstance} from "axios";

export interface TemplateResponse{
    id: string,
    name: string,
    subject: string,
    body: string,
    html: string,
    createdOn: string,
    updatedOn: string,
    description: string,
}

export interface TemplateRequest{
    name: string,
    subject: string,
    body?: string,
    html?: string,
    description?: string
}

export const getTemplates = async (axiosInstance: AxiosInstance): Promise<TemplateResponse[]> => {
    return (await axiosInstance.get<TemplateResponse[]>('/templates')).data;
}

export const createTemplate = async (payload: TemplateRequest , axiosInstance: AxiosInstance): Promise<TemplateResponse> => {
    return (await axiosInstance.post<TemplateResponse>('/templates' , payload)).data;
}

export const updateTemplate = async (id: string , payload: TemplateRequest , axiosInstance: AxiosInstance): Promise<TemplateResponse> => {
    return (await axiosInstance.put<TemplateResponse>(`/templates/${id}` , payload)).data;
}

export const getSingleTemplate = async (id: string , axiosInstance: AxiosInstance): Promise<TemplateResponse> => {
    return (await axiosInstance.get<TemplateResponse>(`/templates/${id}`)).data;
}

export const deleteTemplate = async (id: string , axiosInstance: AxiosInstance): Promise<void> => {
    return (await axiosInstance.delete<void>(`/templates/${id}`)).data;
}

export const validateName = async (name: string , axiosInstance: AxiosInstance): Promise<boolean> => {
    return (await axiosInstance.post<boolean>(`/templates/validate` , null , {
        params: {
            name: name
        }
    })).data;
}



