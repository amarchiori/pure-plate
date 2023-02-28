import { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "@/utils/firebase";
import { doc, updateDoc} from 'firebase/firestore'
import Image from "next/image";

export default function Add() {

        const [imgUrl, setImgUrl] = useState(null);
        const [progresspercent, setProgresspercent] = useState(0);

        const handleSubmit = (e) => {
            e.preventDefault()
            const file = e.target[0]?.files[0]

            if (!file) return;

            const storageRef = ref(storage, `userUploads/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImgUrl(downloadURL);
                const recipeRef = doc(db, 'Categories', category, 'recipes', slug)
                updateDoc(recipeRef, {
                    imageUrl: downloadURL
                });
                });
            }
            );
        }
    return (
        <div>
            <div>
              <form onSubmit={handleSubmit} >
                <input type='file' />
                <button type='submit'>Upload</button>
              </form>
              {
                !imgUrl &&
                <div className='outerbar'>
                  <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                </div>
              }
              {
                imgUrl &&
                <Image src={imgUrl} alt='uploaded file' height={200} />
              }
            </div>

        </div>
          );
        }
