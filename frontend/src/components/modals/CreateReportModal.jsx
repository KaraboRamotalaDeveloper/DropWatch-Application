import React, { useState } from "react";
import { styles } from "../../styles/dashboardStyles";

export default function CreateReportModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    photoUrl: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(e.target.files[0]);
    console.log(file);
    if (file) {
      console.log("Preview URL before : ", previewUrl);
      if (previewUrl) URL.revokeObjectURL(previewUrl); // Clean up previous preview object
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      console.log("Preview URL after : ", previewUrl);
    }

    console.log("Selected file on file change:", file);
  };

  const handleResetAndClose = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl); // Clean up memory
    setFormData({ title: "", description: "", address: "" });
    setSelectedFile(null);
    setPreviewUrl("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Handle submit called ");
    console.log("Form Data:", formData);
    console.log("Selected File:", selectedFile);

    if (!selectedFile) {
      alert("Please upload or capture a photo of the incident.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("address", formData.address);
    data.append("description", formData.description);
    data.append("img", selectedFile); // Matches Multer upload.single("image")

    console.log("File attached in FormData:", data.get("img"));
    // Send a plain JS object instead of FormData
    const payload = {
      title: formData.title,
      address: formData.address,
      description: formData.description,
      photoUrl: selectedFile, // Fallback string for testing
    };

    const success = await onSubmit(data);
    if (success) {
      handleResetAndClose();
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h3>Log Report</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            placeholder="Title"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            style={styles.input}
          />
          <input
            placeholder="Location Address"
            required
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            style={styles.input}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}
            >
              Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
              style={styles.input}
            />
          </div>

          {previewUrl && (
            <div style={{ textAlign: "center", margin: "8px 0" }}>
              <img
                src={previewUrl}
                alt="Selected Preview"
                style={{
                  maxHeight: "140px",
                  borderRadius: "8px",
                  objectFit: "cover",
                  border: "1px solid #e5e7eb",
                }}
              />
            </div>
          )}

          <textarea
            placeholder="Describe the issue..."
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            style={{ ...styles.input, minHeight: "80px" }}
          />

          <div style={styles.modalActions}>
            <button
              type="button"
              onClick={handleResetAndClose}
              style={styles.secondaryBtn}
            >
              Cancel
            </button>
            <button type="submit" style={styles.primaryBtn}>
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
