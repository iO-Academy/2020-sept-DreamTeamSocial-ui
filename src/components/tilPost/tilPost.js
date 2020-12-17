import React, {Component} from 'react';
import './tilPost.css';
import MetaTags from 'react-meta-tags';


export class TilPost extends Component {

    handleClick = (event) => {
        event.preventDefault()
        console.log(this.props)
        document.execCommand("http://localhost:3000/profile/" + this.props.posterName + "/" + this.props.id)
        alert('copied to clipboard')
    }

    render() {
        return (
            <>
                <div className="wrapper">
                    <MetaTags>
                        <title>TILTime</title>
                        <meta name="description" content={this.props.tilPost} />
                        <meta property="og:url" content={"http://localhost:3000/til/" + this.props.posterName + "/" + this.props.id}/>
                        <meta property="og:title" content="TILTime Learning App" />
                        <meta property="og:image" content="http://localhost:3000/icon-192X192.png" />
                        <meta name="twitter:title" content="TILTime Learning App" />
                        <meta name="twitter:image" content="http://localhost:3000/icon-192X192.png" />
                    </MetaTags>
                </div>
                <div key={this.props.i} id={this.props._id} className="til_form">
                    <div className="flex_til_titles"><p>Posted by: {this.props.posterName} </p>
                        <p onClick={this.handleClick} >Share</p>
                        <p>Posted at: {this.props.formatDate(this.props.createdAt)}</p>
                    </div>
                    <p className="til_post_content">{this.props.tilPost}</p>
                </div>
                </>
        )
    }
}

function updateClipboard(newClip) {
    navigator.clipboard.writeText(newClip).then(function() {
        /* clipboard successfully set */
    }, function() {
        /* clipboard write failed */
    });
}

navigator.permissions.query({name: "clipboard-write"}).then(result => {
    if (result.state == "granted" || result.state == "prompt") {
        /* write to the clipboard now */
    }
});