import { FileService } from "~/services/fileService";

export async function clientLoader() {
  return await FileService.getExcelModel();
}

export default function Model() {
  return <div></div>;
}
