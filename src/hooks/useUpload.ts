// [38] src/hooks/useUpload.ts
import useApi from "./useApi";

export default function useUpload() {
  const { base } = useApi();

  const uploadAny = async (files: File[], consume = false) => {
    const fd = new FormData();
    files.forEach((f) => fd.append("files", f));
    const res = await fetch(`${base}/api/upload/any?consume=${consume}`, {
      method: "POST",
      body: fd
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };

  return { uploadAny };
}
