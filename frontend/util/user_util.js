export const fetchUser = (userId) => {
    return (
        $.ajax({
            url: `/api/users/${userId}`,
            method: 'GET'
        })
    )
}

export const fetchAuthor = (authorId) => {
    return (
        $.ajax({
            url: `/api/user/author/${authorId}`,
            method: 'GET'
        })
    )
}

export const uploadBanner = (userData) => {
    /*
        userData is an object with user id and a form for the image file
        
        to be uploaded to the server
    */
    let userId = userData.id;
    /*
        formData contains image file type, only allow image size up to 
        3,000,000 bytes of 3 megabytes

        may have to condense image size in frontend or backend if supercedes threshold, 
        make decision later
    */
    let formData  = userData.form;
    return (
        $.ajax({
            url: `/api/user/banner/upload/${userId}`,
            method: `PUT`,
            data: formData,
            contentType: false,
            processData: false,
        })
    )
}

export const fetchBanner = (userId) => {
    return (
        $.ajax({
            url: `/api/user/banner/${userId}`,
            method: 'GET'
        })
    )
}

export const fetchAuthorAbout = (authorId) => {
    return (
        $.ajax({
            url: `/api/user/author/${authorId}/about`,
            method: 'GET'
        })
    )
}