import { useAxios } from "../../../config/useAxios.ts";
import {
    createTemplate,
    deleteTemplate,
    getSingleTemplate,
    getTemplates,
    TemplateRequest,
    updateTemplate, validateName
} from "./template..ts";

export const useTemplateApi = () => {
    const {axiosInstance} = useAxios();

    return{
        getTemplates: async () =>
            getTemplates(axiosInstance),

        createTemplate: async (payload: TemplateRequest) =>
            createTemplate(payload , axiosInstance),

        updateTemplate: async (id: string , payload: TemplateRequest) =>
            updateTemplate(id , payload , axiosInstance),

        getSingleTemplate: async (id: string) =>
            getSingleTemplate(id , axiosInstance),

        deleteTemplate: async (id: string) =>
            deleteTemplate(id , axiosInstance),

        validateName: async (name: string) =>
            await validateName(name, axiosInstance)
    }
}