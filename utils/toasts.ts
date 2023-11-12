import toast from "react-hot-toast";

export const deleteNoteToast = () =>
  toast("Note Deleted", {
    icon: "🗑️",
    duration: 4000,
    style: {
      borderRadius: "10px",
      background: "#9F4040a7",
      color: "#e6e6e6",
    },
  });
export const archiveNoteToast = () =>
  toast("Note Archived", {
    icon: "👇",
    duration: 4000,
    style: {
      borderRadius: "10px",
      background: "#9F4040a7",
      color: "#e6e6e6",
    },
  });
export const unarchiveNoteToast = () =>
  toast("Note Unarchived", {
    icon: "👇",
    duration: 4000,
    style: {
      borderRadius: "10px",
      background: "#9F4040a7",
      color: "#e6e6e6",
    },
  });
export const discardChangesToast = () =>
  toast("Changes Discarded", {
    icon: "🏷️",
    duration: 4000,
    style: {
      borderRadius: "10px",
      background: "#9F4040a7",
      color: "#e6e6e6",
    },
  });
export const saveChangesToast = () =>
  toast("Changes Saved", {
    icon: "🏷️",
    duration: 4000,
    style: {
      borderRadius: "10px",
      background: "#9F4040a7",
      color: "#e6e6e6",
    },
  });
