import React, { useRef, useState } from "react";
import { Author, Button, Image } from "./Profile.styled";
import person from "../../assets/user-profile.svg";
import { useAuth } from "Utils/Context/useAuth";
import { updateManager } from "../../services/Requests/AccessService";
import { toast } from "react-toastify";

const UploadImage: React.FC = () => {
  const { userData, setUser } = useAuth();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(
    userData?.manager.photo || person
  );

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileUploaded = event.target.files[0];
      setSelectedFile(fileUploaded);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImageSrc(reader.result as string);
        }
      };
      reader.readAsDataURL(fileUploaded);

      try {
        const updatedUser = await updateManager(
          userData?.manager.id,
          fileUploaded
        );
        setUser(updatedUser);
        toast.success("Foto do perfil atualizada com sucesso!");
      } catch (error) {
        toast.error("Erro ao atualizar a foto do perfil. Tente novamente.");
      }
    }
  };

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  return (
    <Author className="author">
      <Image className="avatar border-white" src={imageSrc || person} />
      <Button className="outlined" onClick={handleClick}>
        Atualizar
      </Button>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="profile-picture"
        ref={hiddenFileInput}
        accept="image/*"
        data-testid="profile-picture"
      />
    </Author>
  );
};

export default UploadImage;
