
import React from 'react';
import axios from 'axios';

/**
 * Example components for integration.
 */
class Fileupload extends React.Component {
    state = {
        files: null
    }
    onHandleChange = (e) => {
        const files = e.target.files;
        this.setState({ files })
    }
    onSave = () => {
        let bodyFormData = new FormData();
        const { files } = this.state;
        Array(files.length).fill(0).map((val, index) => {
            bodyFormData.append(`documents`, files[index]);
        });
        axios({
            method: 'post',
            url: "http://localhost:7079/fileupload",
            data: bodyFormData,
        })
        .then((res) => {

        })
        .catch((err) => {

        });
    }
    render() {

        return (
            <div>
                <input type="file" onChange={(e) => this.onHandleChange(e)} id="uploadFile" multiple />
                <button onClick={this.onSave}>Save Filer</button>
            </div>
        );
    }

}

export default Fileupload;
