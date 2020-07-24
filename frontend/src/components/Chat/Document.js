import React from "react";
import axios from 'axios';


class Document extends React.Component{
	constructor(props) {
        super(props);
        this.state ={
            file: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    onFormSubmit(e){
        e.preventDefault();
        console.log('this shit code is at least running');
        const formData = new FormData();
        console.log(formData);
        formData.append('myImage',this.state.file);
        console.log(formData);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        console.log('we made it this far');
        axios.post('http://54.161.12.72:8080',formData,config)
            .then((translatedResponse) => {
            	console.log('it worked ' + translatedResponse);
                alert(JSON.stringify(translatedResponse));
            }).catch((error) => {
            	alert('At leas')
        });
    }
    onChange(e) {
    	console.log('when does this')
        this.setState({file:e.target.files[0]});
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" name="myImage" onChange= {this.onChange} />
                <button type="submit">Upload</button>
            </form>
        )
    }
}


export default Document;



