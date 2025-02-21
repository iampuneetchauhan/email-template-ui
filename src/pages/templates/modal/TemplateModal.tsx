import React, { useEffect, useState } from "react";

interface TemplateModalProps {
  show: boolean;
  onHide: () => void;
  editId?: string;
  fetchTemplates: () => Promise<void>; // Ensure it returns a Promise
}

const TemplateModal: React.FC<TemplateModalProps> = ({ show, onHide, editId, fetchTemplates }) => {
  const [payload, setPayload] = useState({
    name: "",
    subject: "",
    body: "",
    html: "",
    description: "",
  });
  const [selectedButton, setSelectedButton] = useState("body");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [placeholders, setPlaceholders] = useState<string[]>([]);

  useEffect(() => {
    if (editId) handleGetSingleTemplate(editId);
  }, [editId]);

  const createTemplate = async (templateData: typeof payload) => {
    console.log("Creating template", templateData);
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const updateTemplate = async (id: string, templateData: typeof payload) => {
    console.log("Updating template", id, templateData);
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const validateName = async (name: string): Promise<boolean> => {
    console.log("Validating name", name);
    return false;
  };

  const getSingleTemplate = async (id: string) => {
    console.log("Fetching template", id);
    return { name: "Sample", subject: "Sample Subject", body: "Sample Body", html: "", description: "" };
  };

  const handleCreateTemplate = async () => {
    await createTemplate(payload);
    await fetchTemplates(); // Fetch templates after creating
    handleClose();
  };

  const handleUpdateTemplate = async (id: string) => {
    await updateTemplate(id, payload);
    await fetchTemplates(); // Fetch templates after updating
    handleClose();
  };

  const handleGetSingleTemplate = async (id: string) => {
    const response = await getSingleTemplate(id);
    setSelectedButton(response.body ? "body" : "html");
    setPayload(response);
  };

  const handleClose = () => {
    onHide();
    setPayload({ name: "", subject: "", body: "", html: "", description: "" });
    setPlaceholders([]);
    setErrorMessage(undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await handleUpdateTemplate(editId);
    } else {
      const exists = await validateName(payload.name);
      if (exists) {
        setErrorMessage("Name already exists");
      } else {
        await handleCreateTemplate();
      }
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">{editId ? "Edit Template" : "Create Template"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={payload.name}
              onChange={(e) => setPayload({ ...payload, name: e.target.value })}
              disabled={!!editId}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={payload.description}
              onChange={(e) => setPayload({ ...payload, description: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Subject</label>
            <textarea
              name="subject"
              value={payload.subject}
              onChange={(e) => setPayload({ ...payload, subject: e.target.value })}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              className={`px-4 py-2 border ${selectedButton === "body" ? "bg-orange-500 text-white" : "border-gray-300"}`}
              onClick={() => setSelectedButton("body")}
              disabled={!!editId}
            >
              Body
            </button>
            <button
              type="button"
              className={`px-4 py-2 border ${selectedButton === "html" ? "bg-orange-500 text-white" : "border-gray-300"}`}
              onClick={() => setSelectedButton("html")}
              disabled={!!editId}
            >
              HTML
            </button>
          </div>
          <textarea
            name={selectedButton}
            value={selectedButton === "body" ? payload.body : payload.html}
            onChange={(e) => setPayload({ ...payload, [selectedButton]: e.target.value })}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          <div>
            <label className="block text-sm font-medium">Placeholders</label>
            <input
              type="text"
              value={placeholders.join(", ")}
              disabled
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={handleClose} className="px-4 py-2 border border-gray-300 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded">
              {editId ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TemplateModal;
