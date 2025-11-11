import { FileManagerLayout } from "@/components/files/file-manager-layout";
import { AddFolder } from "@/components/folder/add-folder";
import { FoldersList } from "@/components/folder/folders-list";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <FileManagerLayout>
      <h1 className="my-10 text-2xl font-bold text-center">Olá usuário, seu gerenciador de arquivos </h1>
      <AddFolder />
      <Separator />
      <FoldersList />
    </FileManagerLayout>
  );
}
