import React, { useState } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const ImageCrop = ({ onCropComplete }) => {
    const [image, setImage] = useState(null)
    const [crop, setCrop] = useState({ unit: '%', width: 100, aspect: 1 })

    const onImageLoad = image => {
        setImage(image)
    }

    const onCropChange = newCrop => {
        setCrop(newCrop)
    }

    const getCroppedImage = () => {
        if (image) {
            const canvas = document.createElement('canvas')
            const scaleX = image.width / crop.width
            const scaleY = image.height / crop.height
            canvas.width = crop.width
            canvas.height = crop.height
            const ctx = canvas.getContext('2d')

            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height,
            )

            const croppedImageUrl = canvas.toDataURL('image/jpeg')
            onCropComplete(croppedImageUrl)
        }
    }

    return (
        <div>
            <ReactCrop
                src={image}
                crop={crop}
                onChange={onCropChange}
                onComplete={onCropComplete}
                onImageLoaded={onImageLoad}
            />
            <button onClick={getCroppedImage}>Crop Image</button>
        </div>
    )
}

export default ImageCrop
