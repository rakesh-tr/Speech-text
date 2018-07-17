import React, { Component } from 'react';

class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadStatus: false
        }
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }


    handleUploadImage(ev) {
        debugger
        ev.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', this.fileName.value);
        debugger
        //axios.post('http://localhost:8000/upload', data)
        //    .then(function (response) {
        //        this.setState({ imageURL: `http://localhost:8000/${body.file}`, uploadStatus: true });
        //    })
        //    .catch(function (error) {
        //        console.log(error);
        //    });
        console.log("on")
        let url = "http://localhost:52585/api/values/4";
        //const headers = new Headers();
        //headers.append('Content-Type', 'application/json');
        //headers.append('Accept', 'application/json');
        //let data = "";
        const options = {
            method: 'POST',
            //headers,
            body: JSON.stringify(data)
        };

        fetch(url, options).then(res => res.json())
            .then(res => {
                console.log(res);

            }).catch(error => {
                console.log(error);
            });
    }
    render() {
        return (
            <div class="container">
                <form onSubmit={this.handleUploadImage}>
                    <div className="form-group">
                        <input className="form-control" ref={(ref) => { this.uploadInput = ref; }} type="file" />
                    </div>

                    <div className="form-group">
                        <input className="form-control" ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Optional name for the file" />
                    </div>

                    <button className="btn btn-success" type>Upload</button>

                </form>
            </div>
        )
    }
}

export default FileUpload;