import React, { Component, createRef } from 'react'
import Marzipano from 'marzipano'
import './d3.css'

// images import 
import path from './MB-front-view.jpg'

class ThreeD extends Component {
    constructor(props) {
        super(props)
        this.myRef = createRef()
        this.spot = createRef()
    }
    
    componentDidMount() {
        const element = this.myRef.current
        // const hotSpot = this.spot.current
        const viewer = new Marzipano.Viewer(element, {
            stage: {
                progressive: true
            }
        })
        const source = Marzipano.ImageUrlSource.fromString(
            this.props.source ? this.props.source : path
        )

        // create geometry
        const geometry = new Marzipano.EquirectGeometry([{ tileSize: 1024, size: 1024 }])

        // create view
        const limiter = Marzipano.RectilinearView.limit.traditional(1024, 120 * Math.PI / 180)
        const view = new Marzipano.RectilinearView(null, limiter)
        
        // create scene
        const scene = viewer.createScene({
            source,
            geometry,
            view,
            pinFirstLevel: true
        })
        scene.switchTo()

        var autorotate = Marzipano.autorotate({
            yawSpeed: 0.1,         // Yaw rotation speed
            targetPitch: 0,        // Pitch value to converge to
            targetFov: Math.PI/2   // Fov value to converge to
        })
        
        // Autorotate will start after 3s of idle time
        viewer.setIdleMovement(3000, autorotate)
        
        // Start autorotation immediately
        viewer.startMovement(autorotate)
        // Stop any ongoing automatic movement
        viewer.stopMovement()
    }

    render() {
        return (
            <div>
                <div ref={this.myRef} className='pano'>
                </div>
                <h1 style={{position: 'relative'}}> To have the best view upload a 2:1 ratio panorama. </h1>
            </div>
        )
    }
}
export default ThreeD