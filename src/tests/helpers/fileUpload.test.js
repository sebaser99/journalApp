import 'setimmediate';
import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from 'cloudinary'

cloudinary.config({ 
    cloud_name: 'react-journal-sebaser', 
    api_key: '859188862355669', 
    api_secret: 'sQHrG-VMYUVUWTO-u5LF4gK-hM8',
    secure: true
  });

describe('Pruebas en el fileUpload', ()=> {
    test('debe cargar un archivo y retornar una url', async ()=> {
        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png')
        const blob = await resp.blob() 
        const file = new File([blob], 'foto.png')
        const url =  await fileUpload(file)
        expect(typeof url).toBe('string')
        const segments = url.split('/')
        const urlSegment = segments[segments.length - 1].replace('.png', '')

        await cloudinary.v2.api.delete_resources(urlSegment, {}, ()=> {
             console.log(`imágen con ID ${urlSegment} eliminada`)
        });
       
    })

    test('debe retornar null', async ()=> { 
        const file = new File([], 'foto.png')
        const url =  await fileUpload(file)

        expect(url).toBe(null)
    })
})