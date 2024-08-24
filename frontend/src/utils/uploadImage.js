import axios from 'axios';

const cloudName = "dfo4hn2zd" || process.env.REACT_APP_CLOUD_NAME_CLOUDINARY
const url =  `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "mern_ecom_product");

    try {
        const response = await axios.post(url, formData);
        return response.data; // Return the data part of the response
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error; // Re-throw the error after logging it
    }
};

export default uploadImage;