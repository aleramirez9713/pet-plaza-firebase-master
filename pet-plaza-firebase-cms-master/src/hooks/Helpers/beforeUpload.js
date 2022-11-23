import { message } from "../../components/atoms";

export const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Solo puede subir archivos JPG/PNG");
  }
  const isLt1M = file.size / 1024 / 1024 < 0.15;
  if (!isLt1M) {
    message.error("La imagen no puede superar 100 KB");
  }
  return isJpgOrPng && isLt1M;
};
