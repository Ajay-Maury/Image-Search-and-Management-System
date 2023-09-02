import styles from "./ImageDetailView.module.css"
import _ from 'lodash';
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getImageDataByIdAsync, selectImageDetailViewState, setState } from './ImageDetailView.slice';
import { Divider, Spin, message } from 'antd';
import Navbar from "../../components/Navbar/Navbar";
import { CaretLeftFilled } from "@ant-design/icons";

const ImageDetailView = () => {
  const params = useParams()
  const imageId: string = _.get(params, "id", "");

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { data, loader, message:viewMessage } = useAppSelector(selectImageDetailViewState)

  useEffect(()=>{
    if(!_.isEmpty(viewMessage)){
      message.warning(viewMessage)
      dispatch(setState({key:"message",value:""}))
    }
  })

  useEffect(() => {
    if (_.isEmpty(imageId)) {
      navigate(-1)
    } else {
      dispatch(getImageDataByIdAsync(imageId))
    }
  }, [imageId])


  return (
    <div>
      <Navbar/>
      <div className={styles.Header}>
        <div className={styles.BackIconContainer} onClick={() => navigate(-1)}>
          <CaretLeftFilled className={styles.BackIcon} />
        </div>
        <div>
          Image Detail View
        </div>
      </div>
      {_.isEqual(loader, "loading") ? 
      <div  className={styles.LoaderDiv}><Spin/></div> :
       <>
       {!_.isEmpty(_.get(data,"imageUrl",""))?
       <div className={styles.ImageDetailViewContainer}>
       <div className={styles.ImageDetailView}>
        <div>
        <div className={styles.ImageBox}>
         <img src={_.get(data,"imageUrl","")} alt={_.get(data,"title","")} />
         </div>
         </div>
         <Divider />
         <p><strong>Title: </strong><span>{_.get(data,"title")}</span></p>
         <p><strong>Description: </strong><span>{_.get(data,"description")}</span></p>
         <p><strong>Resolution: </strong><span>{_.get(data,"width")}*{_.get(data,"height")}</span></p>
         <p><strong>Image size: </strong><span> {_.get(data,"size",0).toFixed(2)} KB</span></p>
         <p><strong>Keywords: </strong><span>{_.get(data,"keywords",[]).join(",")}</span></p>
       </div>
      </div> 
      : <div  className={styles.LoaderDiv}>Image not found</div> 
      }
       </>
       }
    </div>
  )
}

export default ImageDetailView