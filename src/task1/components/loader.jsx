const imageLoader = require('../images/loader.png')

export function Loader() {
    return (
        <div className="loader"><img src={imageLoader} alt="" /></div>
    )
}