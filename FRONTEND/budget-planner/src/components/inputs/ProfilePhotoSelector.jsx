import React, { use, useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash} from 'react-icons/lu';


const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);


        const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);

            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const chooseFile = () => {
        inputRef.current.click();
    };

  return <div className="flex justify-center items-center mb-6">
        <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImageChange}
            className="hidden"
        />

        { !image ? (
            <div className="w-20 h-20 flex items-center justify-center bg-orange-200 rounded-full relative">
                <LuUser size={40} className="text-4xl text-orange-500 " />
            
            <button 
                type="button"
                className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-full absolute -bottom-2 -right-2"
                onClick={chooseFile}
            >
                <LuUpload />
                </button>
            </div>
        ) : (
            <div className="relative">
                <img 
                src={previewUrl}
                alt="Profile Photo"
                className="w-20 h-20 rounded-full object-cover"
                />

                <button
                type="button"
                className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-2 -right-2"    
                onClick={handleRemoveImage}
                    >
                <LuTrash />
                </button>
            </div>

            

            )}
                
    </div>
};

export default ProfilePhotoSelector;