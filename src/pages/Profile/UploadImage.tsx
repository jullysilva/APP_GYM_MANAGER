import React, { useRef, useState } from "react";
import { BoxContainer, Button, CardImage, Image } from "./Profile.styled";
import person from "../../assets/user-profile.svg";
// import { Button } from '@mui/material';

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
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  return (
    <BoxContainer>
      <CardImage>
        <Image src={imageSrc || person} />
      </CardImage>
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
      />
    </BoxContainer>
  );
};

export default UploadImage;
