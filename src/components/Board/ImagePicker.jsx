'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

export default function ImagePicker({ label, name }) {
    /** 이미지 데이타 저장 */
    const [pickedImage, setPickedImage] = useState();
    /** 파일 입력 요소 input 버튼을 참조하기 위해 */
    const imageInput = useRef();
    /** 이미지 이름 저장 */
    const [imageName, setImageName] = useState('');

    /**업로드 버튼을 누르면 파일 업로드 인풋 태그를 참조하는 함수*/
    function handlePickClick() {
        imageInput.current.click();
    }
    /** 파일 업로드시 해당 이미지 첫번째를 파일리더로 data화 저장 */
    function handleImageChange(event) {
        const file = event.target.files[0];

        if (!file) {
            setPickedImage(null);
            setImageName('');
            return;
        }
        setImageName(file.name);
        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };

        fileReader.readAsDataURL(file);
    }

    return (
        <div className='flex flex-col gap-2'>
            <div className='shrink items-center'>
                {!pickedImage && <p>선택된 이미지 없음.</p>}
                {pickedImage && (
                    <div className='border p-2'>
                        <Image src={pickedImage} alt='선택한 이미지' width={200} height={100} />
                        <p>{imageName}</p>
                    </div>
                )}
            </div>
            <div className='border p-1 '>
                <label htmlFor={name}>{label}</label>
                <input
                    className='hidden'
                    type='file'
                    id={name}
                    accept='image/png, image/jpeg'
                    name={name}
                    ref={imageInput}
                    onChange={handleImageChange}
                />
                <button type='button' onClick={handlePickClick}>
                    이미지 업로드
                </button>
            </div>
        </div>
    );
}
