import React, { useRef, useState } from "react";
import { Author, Button, Image } from "./Profile.styled";
import person from "../../assets/user-profile.svg";

const UploadImage: React.FC = () => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(person);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    }
  };

  const handleClick = () => {
    console.log(selectedFile);
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
