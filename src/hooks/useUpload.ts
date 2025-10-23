import useApi from "./useApi";

export default function useUpload() {
  const { base } = useApi();

  const uploadAny = async (formData: FormData, consume = false, gps = false) => {
    const url = `${base}/api/upload/any?consume=${consume}&gps=${gps}`;
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };

  return { uploadAny };
}
