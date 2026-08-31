import { API_PATHS} from "./APIpaths";
import axiosInstance from "./axiosinstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();

    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Eroare la incarcarea imaginii:", error);
        throw error;
    }
};

export default uploadImage;