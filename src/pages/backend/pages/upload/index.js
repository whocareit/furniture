import React, { useEffect, useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './index.less'

const { Dragger } = Upload;


export default function FileUpload () {
    
    const [url, setUrl] = useState('');

    const props = {
        name: 'file',
        multiple: false,
        action: 'http://localhost:3001/picture/upload',
        onChange(info) {
            const { status } = info.file;
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                const { response } = info.file;
                if(response.errno === 0 ) {
                    const data = response.data;
                    setUrl(data.url)
                }
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <div className="uploadWrapper">
            <Dragger 
                {...props}
            >
                <p className="ant-upload-drag-icon">
                <InboxOutlined />
                </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                </p>
            </Dragger>
            <div className={url ? "urlStyle" : ''}>{url}</div>
        </div>
    )
}

