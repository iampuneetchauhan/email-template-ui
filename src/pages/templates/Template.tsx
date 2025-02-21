import { useTemplateApi } from "./hooks/useTemplateApi.ts";
import { useEffect, useState } from "react";
import { TemplateResponse } from "./hooks/template..ts";
import moment from "moment";
import TemplateModal from "./modal/TemplateModal";
import DeleteModal from "./modal/DeleteModal";

const Template = () => {
    const [templateData, setTemplateData] = useState<TemplateResponse[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [editId, setEditId] = useState<string | undefined>(undefined);
    const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
    const [copiedId, setCopiedId] = useState<string | undefined>(undefined);

    const { getTemplates, deleteTemplate } = useTemplateApi();

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        const response = await getTemplates();
        setTemplateData(response);
    };

    const onHide = () => {
        setEditId(undefined);
        setDeleteId(undefined);
        setShowModal(false);
        setShowDeleteModal(false);
    };

    const handleDelete = async (id: string) => {
        await deleteTemplate(id);
        await fetchTemplates(); // Refresh list after deletion
        onHide();
    };

    const handleCopyToClipboard = (id: string) => {
        navigator.clipboard.writeText(id).then(() => {
            setCopiedId(id);
            setTimeout(() => setCopiedId(undefined), 2000);
        }).catch(err => console.error("Could not copy text: ", err));
    };

    return (
        <div className="p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Email Templates</h2>
                    <button
                        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                        onClick={() => setShowModal(true)}
                    >
                        + Create Template
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-400 text-white">
                                <th className="p-2 border">Id</th>
                                <th className="p-2 border">Name</th>
                                <th className="p-2 border">Created On</th>
                                <th className="p-2 border">Updated On</th>
                                <th className="p-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {templateData.map((template) => (
                                <tr key={template.id} className="bg-gray-100">
                                    <td className="p-2 border flex items-center">
                                        {template.id}
                                        <i 
                                            className="bi bi-copy ml-2 cursor-pointer text-gray-600 hover:text-black"
                                            onClick={() => handleCopyToClipboard(template.id)}
                                        />
                                        {copiedId === template.id && (
                                            <span className="ml-2 text-green-500 text-sm">Copied!</span>
                                        )}
                                    </td>
                                    <td className="p-2 border">{template.name}</td>
                                    <td className="p-2 border">{moment(template.createdOn).format("DD-MM-YYYY")}</td>
                                    <td className="p-2 border">{moment(template.updatedOn).format("DD-MM-YYYY")}</td>
                                    <td className="p-2 border flex justify-around">
                                        <i className="bi bi-pencil-fill text-blue-500 cursor-pointer"
                                           onClick={() => {
                                               setShowModal(true);
                                               setEditId(template.id);
                                           }}
                                        />
                                        <i className="bi bi-trash3 text-red-500 cursor-pointer"
                                           onClick={() => {
                                               setShowDeleteModal(true);
                                               setDeleteId(template.id);
                                           }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <TemplateModal show={showModal} onHide={onHide} editId={editId} fetchTemplates={fetchTemplates} />
            <DeleteModal 
    show={showDeleteModal} 
    onHide={onHide} 
    deleteId={deleteId} 
    onDelete={() => deleteId && handleDelete(deleteId)} 
/>

        </div>
    );
};

export default Template;
