import { useEffect, useState } from 'react';
import app from '../firebase.js';
import { getStorage, ref, listAll, getDownloadURL, deleteObject, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInFailure } from '../redux/user/user.slice.js';

function UploadImage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [images, setImages] = useState([]);
    const [imageRef, setImageRef] = useState([]);
    const [formData, setFormData] = useState({});
    const [progressPerc, setProgressPerc] = useState(0);
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('/api/image/getimages', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'GET',
                });
                const data = await res.json();
                if (data.success === false) {
                    console.log(data.message);
                    dispatch(signInFailure());
                    navigate('/signin');
                    return;
                }
                setImages(data.map(item => item.imageUrl));
                setImageRef(data.map(item => item.imageRef));
            } catch (error) {
                console.log(error);
            }
        }
        fetchImages();
    }, []);

    const handleDelete = async (idx) => {
        try {
            const delRef = imageRef[idx];
            //delete from mongo
            const res = await fetch('/api/image/delete', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    imageRef: delRef
                })
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            const storage = await getStorage(app);
            const desertRef = ref(storage, delRef);
            await deleteObject(desertRef);
            setImages(images.filter((url, index) => index !== idx));
            setImageRef(imageRef.filter((url, index) => index !== idx));
        } catch (error) {
            console.log(error);
        }
    };
    const handleUpload = async () => {
        if (!formData.image) return;
        try {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + formData.image.name;
            const storageRef = ref(storage, `images/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, formData.image);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgressPerc(Math.round(progress));
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downURL) => {
                        uploadToMongo(downURL, uploadTask.snapshot.ref.fullPath);
                        setImages([...images, downURL]);
                        setImageRef([...imageRef, uploadTask.snapshot.ref.fullPath]);
                    })
                }
            )
        } catch (error) {
            console.log(error);
        }
    };

    const uploadToMongo = async (imageUrl, imageRef) => {
        try {
            const res = await fetch('/api/image/upload', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    imageUrl,
                    imageRef
                })
            });
            const data = await res.json();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h2>Upload Image to Firebase</h2>
            <input type="file" id='image' onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} accept='image/*' />
            <button onClick={handleUpload} className='bg-red-600 text-white w-1/5 p-2 rounded-lg'>Upload</button>
            <p>Upload Progress : {progressPerc}%</p>

            <h3>Available Images:</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {images?.map((url, index) => (
                    <div key={index} style={{ margin: '10px' }}>
                        <img src={url} alt={`image-${index}`} style={{ width: '150px', height: '150px' }} />
                        <button onClick={() => handleDelete(index)} className='bg-red-600 text-white w-full p-1'>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadImage