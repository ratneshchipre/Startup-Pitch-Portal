import { useState } from "react";
import { categories } from "../categoryList";
import axios from "axios";

type UploadPitchFormData = {
  title: string;
  details: string;
  file: File | null;
  category: string;
  goal: number;
  tags: string;
};

const UploadPitch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<UploadPitchFormData>({
    title: "",
    details: "",
    file: null,
    category: "",
    goal: 0,
    tags: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        file: e.target.files[0],
      });
    }
  };

  const uploadFileToBackend = async (file: File) => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("file", file);
      const response = await axios.post(
        "/api/pitch/upload-pitch-file",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File upload successful:", response.data);
    } catch (error) {
      console.error("File upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadPitchForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post("/api/pitch/create-pitch", {
        title: formData.title,
        details: formData.details,
        category: formData.category,
        goal: formData.goal,
        tags: formData.tags,
      });

      console.log("Pitch creation successful:", response.data);

      if (formData.file) {
        await uploadFileToBackend(formData.file);
      }
    } catch (error) {
      console.error("Pitch creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col px-[2rem] py-[1rem] h-[20rem]">
      <div className="mt-[4.6rem] pb-[2rem] mini-desktop:ml-[20rem]">
        <h1 className="font-Bold text-txt-black text-[1.6rem]">
          Create a new Pitch Deck
        </h1>
        <form
          onSubmit={handleUploadPitchForm}
          className="mt-[1.4rem] flex flex-col bg-cream-white border-dash-border border-[2px] px-[1.5rem] py-[1.5rem] rounded-lg gap-[1.5rem]"
        >
          <div className="flex flex-col gap-[0.5rem]">
            <label className="font-Medium text-txt-black text-[1.2rem]">
              Pitch Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a pitch title"
              className="w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px]"
            />
          </div>
          <div className="flex flex-col gap-[0.5rem]">
            <label className="font-Medium text-txt-black text-[1.2rem]">
              Pitch Details
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleTextAreaChange}
              placeholder="Describe your pitch..."
              className="w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.6rem] h-[10rem] border-border border-[2px] resize-none"
            />
          </div>
          <div className="flex flex-col gap-[0.5rem]">
            <label className="font-Medium text-txt-black text-[1.2rem]">
              Upload File
            </label>
            {loading ? (
              "Uploading..."
            ) : (
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                className="w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px] cursor-pointer"
              />
            )}
          </div>
          <div className="flex flex-col gap-[0.5rem]">
            <label className="font-Medium text-txt-black text-[1.2rem]">
              Pitch Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleSelectChange}
              className="w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px]"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-[0.5rem]">
            <label className="font-Medium text-txt-black text-[1.2rem]">
              Funding Goal ($)
            </label>
            <input
              type="number"
              min="0"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px]"
            />
          </div>
          <div className="flex flex-col gap-[0.5rem]">
            <label className="font-Medium text-txt-black text-[1.2rem]">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. AI, Startup, Tech"
              className="w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px]"
            />
          </div>
          <button
            type="submit"
            className="font-Regular text-nav-white bg-btn-blue py-[0.4rem] text-[1.1rem] rounded-lg cursor-pointer hover:bg-hover-blue transition-all"
          >
            Create Pitch
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPitch;
