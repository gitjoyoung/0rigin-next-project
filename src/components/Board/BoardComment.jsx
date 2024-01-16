'use client';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

export default function BoardComment(props) {
    const id = props.id;
    const [commentList, setCommentList] = useState([]);
    const commentFormRef = useRef(null);

    useEffect(() => {
        console.log('use Effect');
        fetchCommentData();
    }, []);

    const fetchCommentData = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}comment?boradid=${id}`);
            setCommentList(res.data);
            console.log('fetch data:', res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleComment = async (e) => {
        e.preventDefault();
        const formData = {
            boradid: id,
            nickname: commentFormRef.current.nickname.value,
            password: commentFormRef.current.password.value,
            comment: commentFormRef.current.comment.value,
        };
        console.log(formData);
        try {
            await submitComment(formData);
            await fetchCommentData();
            clearFormFields();
        } catch (error) {
            console.log(error);
        }
    };

    const submitComment = async (formData) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}comment`, formData);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const clearFormFields = () => {
        commentFormRef.current.comment.value = '';
    };

    return (
        <div className=' mt-1 mb-1'>
            <div className='border-b border-t border-black flex justify-between text-xs  p-1'>
                <div className='flex text-gray-700'>
                    <h1>전체 코멘트</h1>
                    <span className='text-red-500'>{commentList.length}</span>
                    <span>개</span>
                </div>
                <h1 onClick={fetchCommentData} className='text-blue-500'>
                    새로고침
                </h1>
            </div>
            {commentList.length > 0 &&
                commentList.map(({ comment, nickname, time }, no) => (
                    <div key={no} className='flex text-sm flex-wrap p-1 border-b'>
                        <div className=' w-20 whitespace-nowrap text-left truncate'>{nickname}</div>
                        <div className='flex-1 break-all '>{comment}</div>
                        <div className=' w-12 text-xs  text-right'>시간{time}</div>
                    </div>
                ))}
            <div className='p-2 border-t border-black'>
                <form ref={commentFormRef} onSubmit={handleComment} className='flex flex-col gap-2'>
                    <div className='flex  gap-2 text-sm '>
                        <input
                            name='nickname'
                            type='text'
                            placeholder='닉네임'
                            className='border p-1 w-full'
                        />
                        <input
                            name='password'
                            type='password'
                            placeholder='비밀번호'
                            className='border p-1 w-full'
                        />
                    </div>

                    <textarea
                        name='comment'
                        className='w-full border p-1'
                        placeholder='댓글 입력'
                    />
                    <button>댓글달기</button>
                </form>
            </div>
        </div>
    );
}
