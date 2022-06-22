export const fileUpload = async(file) => {
    const url = "https://api.cloudinary.com/v1_1/react-journal-sebaser/image/upload";
    const formData = new FormData()
    formData.append('upload_preset', 'react-journal')
    formData.append('file', file)
    

    try{
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        })
        if(response.ok){
            const cloudRes = await response.json()
            return cloudRes.secure_url
        }else {
           return null
        }
    }catch(e){
        throw e
    }
}