import styles from './UploadImages.module.css'
import { CaretLeftFilled, InboxOutlined, LoadingOutlined } from '@ant-design/icons'
import Navbar from '../../components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import Dragger from 'antd/es/upload/Dragger'
import { Button, Input, UploadProps, message } from 'antd'
import { RcFile } from 'antd/es/upload'
import { config } from '../../config/config'
import { getTokenHeader } from "../../utils/utils";
import { useEffect, useState } from 'react'
import { ISavePayload } from './UploadImages.interface'
import { resetState, saveUploadImageAsync, selectImageUploadState, setState } from './UploadImages.slice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import _ from 'lodash'


const UploadImages = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [uploadLoader, setUploadLoader] = useState<boolean>(false)

  const { description, keywords, loader, title, uploadResponse, } = useAppSelector(selectImageUploadState)

  const handleSaveImage = () => {
    const payload: ISavePayload = {
      title,
      description,
      imageUrl: uploadResponse.secure_url,
      height: uploadResponse.height,
      width: uploadResponse.width,
      size: uploadResponse.bytes / 1024,
      keywords
    }
    dispatch(saveUploadImageAsync(payload))
  }

  useEffect(() => {
    if (_.isEqual(loader, "success")) {
      message.success('Image saves successfully')
      dispatch(resetState())
    }
    if (_.isEqual(loader, "failed")) {
      message.error('Something went wrong')
      dispatch(setState({ key: "loader", value: "idle" }))
    }
  }, [loader])


  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      return message.error('You can only upload JPG/PNG file!');
    }
    const isLt5M = file.size / 1024 / 1024 < 2;
    if (!isLt5M) {
      return message.error('Image must smaller than 5MB!');
    }
    return isJpgOrPng && isLt5M;
  };

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    headers: { ...getTokenHeader() },
    action: `${config.IMAGE_SEARCH_SERVICE_URL}/api/image/cloudinary-upload`,
    onChange(info) {
      const { status } = info.file;
      if (status === 'uploading') {
        setUploadLoader(true)
      }
      if (status !== 'uploading') {
        setUploadLoader(false)
      }
      if (status === 'done') {
        setUploadLoader(false)
        dispatch(setState({ key: "uploadResponse", value: _.get(info, "file.response", {}) }))
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        setUploadLoader(false)
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.Header}>
        <div className={styles.BackIconContainer} onClick={() => navigate(-1)}>
          <CaretLeftFilled className={styles.BackIcon} />
        </div>
        <div>
          Upload Images
        </div>
      </div>
      <div className={styles.Container}>
        <div className={styles.DraggerContainer}>
          <Dragger
            {...props}
            // @ts-ignore
            beforeUpload={beforeUpload}
            className={styles.Dragger}
            showUploadList={false}
          >
            <p className="ant-upload-drag-icon">
              {uploadLoader ? <LoadingOutlined /> : <InboxOutlined />}
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single images upload less than 5MB.
            </p>
          </Dragger>
        </div>
        <div className={styles.ImageDetailsContainer}>
          <div>
            <div className={styles.ImageNameBox}>
              <div className={styles.Label}>Title</div>
              <Input
                value={title}
                placeholder='Enter title'
                className={styles.Input}
                onChange={(e) => dispatch(setState({ key: "title", value: _.get(e, 'target.value', "") }))}
              />
            </div>
            <div className={styles.ImageNameBox}>
              <div className={styles.Label}>Description</div>
              <Input
                value={description}
                placeholder='Enter description'
                className={styles.Input}
                onChange={(e) => dispatch(setState({ key: "description", value: _.get(e, 'target.value', "") }))}
              />
            </div>
            <div className={styles.ImageNameBox}>
              <div className={styles.Label}>Keywords</div>
              <Input
                value={keywords}
                placeholder='Enter , separated values'
                className={styles.Input}
                onChange={(e) => dispatch(setState({ key: "keywords", value: _.get(e, 'target.value', "") }))}
              />
            </div>
          </div>
        </div>
        <div className={styles.SubmitButtonContainer}>
          <Button
            type="primary"
            className={styles.SubmitButton}
            onClick={handleSaveImage}
            loading={_.isEqual(loader, "loading")}
            disabled={_.isEmpty(title) || _.isEmpty(description) || _.isEmpty(uploadResponse.secure_url)}
          > Save</Button>
        </div>
      </div>
    </div>
  )
}

export default UploadImages