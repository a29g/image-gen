'use client'

import React from 'react'
import fetchImages from '../utils/fetchImages'
import Image from 'next/image'
import useSWR from "swr"


type ImageType = {
    name: string;
    url: string;
};

const Images = () => {

    const {
        data: images,
        isLoading,
        mutate: refreshImages,
        isValidating,
    } = useSWR("images", fetchImages, {
        revalidateOnFocus: false,
    });

    console.log(images)
    return (
        <div>
            Image
        </div>
    )
}

export default Images
