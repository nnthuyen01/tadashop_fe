import { Modal, Upload, message } from 'antd';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { API_URL } from '~/config/constant';

//hieu chinh va doc thong tin file hinh
const getBase64 = (file) => {
    new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });
};

const UploadImage = (props) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const { fileList } = props;

    const handleCancel = () => {
        setPreviewOpen(false);
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);

        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = (info) => {
        const { fileList } = info;

        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file);
        }

        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (status === 'removed') {
            message.success(`${info.file.name} file is removed`);
        } else if (status !== 'uploading') {
            message.error(`${info.file.name} file upload failed`);
        }
        props.onUpdateFileList(fileList.slice());
    };

    const handleRemove = (info) => {
        if (info.fileName) {
            console.log('delete' + info.fileName);
        } else if (info.response && info.response.filename) {
            console.log('delete' + info.response.filename);
        }
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <>
            <Upload
                name="file"
                action={`${API_URL}products/images/one`}
                listType="picture-card"
                defaultFileList={fileList}
                multiple={true} //Cho phep lua chon 1 luc nhieu file
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleRemove}
            >
                {FileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img src={previewImage} alt="Preview Image" style={{ width: '100%' }} />
            </Modal>
        </>
    );
};

export default UploadImage;
