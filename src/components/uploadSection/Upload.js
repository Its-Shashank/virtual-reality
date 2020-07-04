import React, { useState } from 'react'
import './upload.css'
import ThreeD from '../d3/ThreeD'
import { CloudUpload } from '@material-ui/icons'
import { Grid } from  '@material-ui/core'

function Upload() {
    const [image, setImage] = useState('')
    const [changed, setChanged] = useState(false)

    const handlePanorama = event => {
        setChanged(false)
        if (event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]))
            setChanged(true)
        }
        console.log(event.target.files)
    }
    
    return (
        <div>
            <Grid container>
                <Grid item sm={12} md={3}>
                    <div className='navbar'>
                        VR
                    </div>
                    <div className='upload-container'>
                        <label htmlFor="panoramaImg" onClick={() => setChanged(false)}> <CloudUpload /> Add your panorama</label>
                        <input type="file" name="panorama" id="panoramaImg" onChange={handlePanorama} />
                        <img src={image} alt="" width='220' height='150' />
                    </div>
                </Grid>
                <Grid item sm={12} md={9}>
                    { !changed &&
                        <div className='instructions'>
                            <h1>Have a taste of virtual reality here.</h1>
                            <h3>
                                A platform to give you an experience of VR. 
                                Upload a panorama image of good quality to experience greatness of virtual reality.
                                All the processing by this VR tool occurs on the browser itself; the files are not uploaded to the server.
                                Enjoy!
                            </h3>
                        </div>
                    }
                    { changed && <ThreeD source={image} />}
                </Grid>

            </Grid>
        </div>
    )
}

export default Upload
