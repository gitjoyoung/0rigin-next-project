'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BoardComment from '@/components/Board/BoardComment';

export default function Read(props) {
    const [readData, setReadData] = useState(null);
    const id = props.params.id;
    const router = useRouter();
    useEffect(() => {
        fetchReadData();
    }, []);

    const fetchReadData = async () => {
        const options = {
            url: `${process.env.NEXT_PUBLIC_API_URL}board/${id}`,
            method: 'GET',
        };
        try {
            const res = await axios(options);
            const data = res.data;
            console.log('게시글 데이타', data);
            setReadData(data);
        } catch (error) {
            console.log(error);
        }
    };
    const likeRead = async () => {
        const likeUp = readData.like + 1;
        const options = {
            url: `${process.env.NEXT_PUBLIC_API_URL}board/${id}`,
            method: 'PATCH',
            data: { like: likeUp }, // 좋아요일 경우 1을 전송
        };
        try {
            const res = await axios(options);
            const data = res.data;
            console.log(data);

            fetchReadData();
        } catch (error) {
            console.log(error);
        }
    };

    const dislikeRead = async () => {
        const likeDown = readData.like - 1;

        const options = {
            url: `${process.env.NEXT_PUBLIC_API_URL}board/${id}`,
            method: 'PATCH',
            data: { like: likeDown }, // 싫어요일 경우 -1을 전송
        };
        try {
            const res = await axios(options);
            const data = res.data;
            console.log(data);
            fetchReadData();
        } catch (error) {
            console.log(error);
        }
    };

    if (readData === null) {
        return <div>로딩중...</div>;
    }

    return (
        <section className='border border-black   mt-1'>
            <div className='flex flex-col gap-3 mb-2  '>
                <div className='border-b  border-black pb-2 p-1'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-2xl'>{readData.title}</h1>
                        <button>best</button>
                    </div>
                    <ul className='list-none p-0 m-0 text-xs'>
                        <li className='inline-block'>{readData.nickname}</li>
                        <li className='inline-block mx-1'>|</li>
                        <li className='inline-block'>12:59:32</li>
                        <li className='inline-block mx-1'>|</li>
                        <li className='inline-block'>
                            추천 <span className=''>{readData.like}</span>
                        </li>
                    </ul>
                </div>
                <div className='min-h-[30vh]'>
                    <p>{readData.body}</p>
                </div>
                <div className='flex justify-center gap-6 mt-5 mb-5'>
                    <button onClick={dislikeRead}>재미없어요</button>
                    <button onClick={likeRead}>추천하기</button>
                </div>
            </div>

            <BoardComment id={id} />
        </section>
    );
}
