import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const toTitleCase = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

export const validateEmail = mail => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) ? true : false

export const deleteFile = (filePath, res, message = 'Something went wrong') => {
        fs.unlink(filePath, err => {
        if (err)
            console.log(err)

        return res.json({ message })
    })
}

export const deleteImages = (images, mode) => {
    const basePath = path.resolve(__dirname + '../../') + '/public/uploads/products/'

    images.forEach(img => {
        let filePath

        if (mode === 'file') { filePath = basePath + `${img.filename}` }
        else { filePath = basePath + `${img}` }

        fs.unlink(filePath, err => {
            if (err)
                return err
        })
    })
}